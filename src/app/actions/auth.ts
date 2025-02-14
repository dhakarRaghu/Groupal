'use server';

import { currentUser } from "@clerk/nextjs/server";
import { client } from "../../lib/prisma";

export const onAuthenticatedUser = async () => {
  try {
	const clerk = await currentUser();
	if (!clerk) return { status: 404 };

	const user = await client.user.findUnique({
	  where: {
		id: clerk.id,
	  },
	  select: {
		id: true,
		firstname: true,
		lastname: true,
	  },
	});

	if (user) {
	  return {
		status: 200,
		id: user.id,
		image: clerk.imageUrl,
		username: `${user.firstname} ${user.lastname}`,
	  };
	}

	return { status: 404 };
  } catch (error) {
	console.error(error);
	return { status: 500, message: 'Internal Server Error' };
  }
};