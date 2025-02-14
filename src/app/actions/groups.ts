import { client } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { onAuthenticatedUser } from "./auth";


// Define the Zod schema for creating a group
export const CreateGroupSchema = z.object({
  name: z.string().min(3, "Group name must be at least 3 characters long"),
  category: z.string(),
  description: z.string().optional(),
  privacy: z.enum(["PUBLIC", "PRIVATE"]).default("PRIVATE"),
  thumbnail: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  domain: z.string().optional(),
});

// Get affiliate information
export const onGetAffiliateInfo = async (id: string) => {
  try {
    const affiliateInfo = await client.affiliate.findUnique({
      where: { id },
      select: {
        Group: {
          select: {
            user: {
              select: {
                firstname: true,
                lastname: true,
                image: true,
                id: true,
                stripeId: true,
              },
            },
          },
        },
      },
    });

    if (affiliateInfo?.Group?.user) {
      return { status: 200, user: affiliateInfo.Group.user };
    } else {
      return { status: 404 };
    }
  } catch (error) {
    return { status: 400, error: (error as Error).message };
  }
};

// Create a new group
export const onCreateNewGroup = async (
  userId: string,
  data: z.infer<typeof CreateGroupSchema>
) => {
  try {
    // Validate data before proceeding
    const validatedData = CreateGroupSchema.parse(data);

    const created = await client.user.update({
      where: { id: userId },
      data: {
        groupsCreated: {
          create: {
            ...validatedData,
            affiliate: { create: {} },
            members: { create: [{ userId }] }, // Fixed members array format
            channel: {
              create: [
                { id: uuidv4(), name: "general", icon: "general" },
                { id: uuidv4(), name: "announcements", icon: "announcements" },
              ],
            },
          },
        },
      },
      select: {
        id: true,
        groupsCreated: {
          select: {
            id: true,
            channel: {
              select: { id: true },
              take: 1,
              orderBy: { createdAt: "asc" },
            },
          },
        },
      },
    });

    return created;
  } catch (error: any) {
    return { status: 400, error: error.message };
  }
};


export const onGetGroupInfo = async (groupId: string) => {
  try {
    const user = await onAuthenticatedUser();
    const group = await client.group.findUnique({
      where: {
        id: groupId,
      },
    });

    if (group) {
      return {
        status: 200,
        group,
        groupOwner: user.id === group.userId ? true : false,
      };
    }
    return { status: 404 };
  } catch (error) {
    return { status: 400, error: (error as Error).message };
  }
};
export const onGetUserGroups = async (id: string) => {
  try {
    const userGroups = await client.user.findUnique({
      where: { id },
      select: {
        // ✅ Fetch groups created by the user
        groupsCreated: {
          select: {
            id: true,
            name: true,
            icon: true,
            channel: {
              select: { id: true, name: true },
            },
          },
        },

        // ✅ Fetch groups where the user is a member
        members: {
          select: {
            group: {
              select: {
                id: true,
                name: true,
                icon: true,
                channel: {
                  select: { id: true, name: true },
                },
              },
            },
          },
        },
      },
    });

    if (!userGroups) {
      return { status: 404, message: "User not found" };
    }

    // ✅ Extract channels where `name = "general"`
    const formattedGroups = userGroups.groupsCreated.map((group) => ({
      id: group.id,
      name: group.name,
      icon: group.icon,
      generalChannel: group.channel.find((ch) => ch.name === "general") || null,
    }));

    const formattedMemberships = userGroups.members.map((member) => {
      if (!member.group) {
        return null;
      }
      return {
        id: member.group.id,
        name: member.group.name,
        icon: member.group.icon,
        generalChannel: member.group.channel.find((ch) => ch.name === "general") || null,
      };
    }).filter(Boolean);

    return {
      status: 200,
      groups: formattedGroups,
      memberships: formattedMemberships,
    };
  } catch (error) {
    console.error("❌ Error fetching user groups:", error);
    return { status: 400, error: (error as Error).message };
  }
};


export const onGetGroupChannels = async (groupId: string) => {
  try {
    const channels = await client.channel.findMany({
      where: { groupId: groupId },
      orderBy: { createdAt: "asc" },
    });

    if (!channels) {
      return { status: 404, message: "Channels not found" };
    }

    return { status: 200, channels: channels };
  } catch (error) {
    console.error("❌ Error fetching group channels:", error);
    return { status: 400, error: (error as Error).message };
  }
};


export const onGetGroupSubscriptions = async (groupId: string) => {
  try {
    const subscriptions = await client.subscription.findMany({
      where: { groupId: groupId },
      orderBy: { createdAt: "asc" },
    });

    if (!subscriptions) {
      return { status: 404, message: "Subscriptions not found" };
    }

    
    const count = await client.members.count({
      where: {
        groupId: groupId,
      },
    })

    return { status: 200, subscriptions: subscriptions, count };
  } catch (error) {
    console.error("❌ Error fetching group subscriptions:", error);
    return { status: 400, error: (error as Error).message };
  }
};
export const onGetAllGroupMembers = async (groupId: string) => {
  try {
    const user = await onAuthenticatedUser();
    const members = await client.members.findMany({
      where: {
        groupId: groupId,
        NOT: {
          userId: user.id,
        },
      },
      include: {
        user: true,
      },
    });
    // Always return a value; if no members, return an empty array
    return { status: 200, members: members && members.length > 0 ? members : [] };
  } catch (error) {
    console.error("❌ Error fetching group members:", error);
    return { status: 400, error: (error as Error).message, members: [] };
  }
};
