import prisma from '@/app/libs/prismadb';

interface IParams {
	userId?: string;
}
export default async function getFollowersCount(params: IParams) {
	try {
		const { userId } = params;

		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!user) {
			return null;
		}

		const followersCount = await prisma.user.count({
			where: {
				followingIds: {
					has: userId,
				},
			},
		});

		return followersCount;
	} catch (error: any) {
		throw new Error(error);
	}
}
