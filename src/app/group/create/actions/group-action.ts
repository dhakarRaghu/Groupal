"use server";

import { client } from "@/lib/prisma";
import { CreateGroupSchema } from "@/lib/schema";
import { z } from "zod";


import { v4 as uuidv4 } from "uuid";

export const onCreateNewGroup = async (userId: string, data: z.infer<typeof CreateGroupSchema>) => {
  try {
    console.log("📌 Server: Checking if user exists:", userId);

    // ✅ Ensure the user exists before creating a group
    const existingUser = await client.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      console.log("⚠️ Server: User not found. Creating a new user entry...");

      await client.user.create({
        data: {
          id: userId,
          firstname: "Unknown",
          lastname: "User",
          createdAt: new Date(),
          clerkid: userId,
        },
      });

      console.log("✅ Server: User created successfully.");
    }

    console.log("📌 Server: Creating a new group for user:", userId);

    const validatedData = CreateGroupSchema.parse(data);

    // ✅ Create a new group (NO restriction on multiple groups)
    const createdGroup = await client.group.create({
      data: {
        id: uuidv4(),
        ...validatedData,
        userId, // ✅ Allow multiple groups for this user
        affiliate: { create: {} },
        members: { create: [{ userId }] },
        channel: {
          create: [
            { id: uuidv4(), name: "general", icon: "general" },
            { id: uuidv4(), name: "announcements", icon: "announcements" },
          ],
        },
      },
      include: {
        channel: true, // ✅ Include channels in response
      },
    });

    console.log("✅ Server: Group created successfully:", createdGroup);
    return createdGroup;
  } catch (error: any) {
    console.error("❌ Server: Error creating group:", error.message);
    return { status: 400, error: error.message };
  }
};
