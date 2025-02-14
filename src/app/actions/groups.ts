import { client } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

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
