"use server";

import { client } from "@/lib/prisma";
import { onAuthenticatedUser } from "./auth";

export const onGetChannelInfo = async (channelid: string) => {
  try {
    const user = await onAuthenticatedUser();

    if (!user || user.status !== 200) {
      console.log("❌ User not authenticated");
      return { status: 401, error: "User not authenticated" };
    }

    console.log("📌 Fetching channel info for:", channelid);

    const channel = await client.channel.findUnique({
      where: { id: channelid },
      include: {
        posts: {
          take: 3,
          orderBy: { createdAt: "desc" },
          include: {
            channel: {
              select: { name: true },
            },
            author: {
              select: {
                firstname: true,
                lastname: true,
                image: true,
              },
            },
            _count: {
              select: {
                likes: true,
                comments: true,
              },
            },
            likes: {
              where: { userId: user.id },
              select: {
                userId: true,
                id: true,
              },
            },
          },
        },
      },
    });

    if (!channel) {
      console.log("⚠️ Channel not found:", channelid);
      return { status: 404, error: "Channel not found" };
    }

    return { status: 200, channel };
  } catch (error) {
    console.error("❌ Server: Error fetching channel:", error);
    return { status: 400, error: (error as Error).message };
  }
};
