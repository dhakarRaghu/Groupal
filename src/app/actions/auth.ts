'use server';

import { currentUser } from "@clerk/nextjs/server";
import { client } from "../../lib/prisma";

export const onAuthenticatedUser = async () => {
  try {
    const clerk = await currentUser();
    if (!clerk) {
      console.log("❌ No authenticated user found");
      return { status: 404, message: "User not authenticated" };
    }

    console.log("📌 Clerk user ID:", clerk.id); // ✅ Debug Clerk user ID

    // ✅ Check if user exists in the database
    const user = await client.user.findUnique({
      where: { id: clerk.id },
      select: { id: true, firstname: true, lastname: true },
    });

    if (user) {
      console.log("✅ User found in database:", user);
      return {
        status: 200,
        id: user.id,
        image: clerk.imageUrl,
        username: `${user.firstname} ${user.lastname}`,
      };
    } else {
      console.log("⚠️ User not found in the database for ID:", clerk.id);
      return { status: 404, message: "User not found in database" };
    }
  } catch (error) {
    console.error("❌ Database error:", error);
    return { status: 500, message: "Internal Server Error" };
  }
};
