import prisma from '@/app/libs/prismadb';

export default async function getUsers() {
	try {
		const users = await prisma.user.findMany({
			select: {
				username: true,
			},
		});

		const usernames = users.map((user) => user.username);

		return usernames;
	} catch (error: any) {
		throw new Error(error);
	}
}
