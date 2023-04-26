import prisma from '@/app/libs/prismadb';

export default async function getUsers() {
	try {
		const users = await prisma.user.findMany({
			orderBy: {
				createdAt: 'desc',
			},
		});

		return users;
	} catch (error: any) {
		throw new Error(error);
	}
}
