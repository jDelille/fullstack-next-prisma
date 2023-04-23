import prisma from '@/app/libs/prismadb';

interface IParams {
	userId?: string;
}
export default async function getPostsByUserId(params: IParams) {
	try {
		const { userId } = params;
		const posts = await prisma.post.findMany({
			where: {
				userId: userId,
			},
			orderBy: {
				createdAt: 'desc',
			},
			include: {
				Bet: true,
				user: true,
			},
		});

		const formattedPosts = posts.map((post) => ({
			...post,
			createdAt: post.createdAt.toISOString(),
			user: {
				...post.user,
				createdAt: post.user.createdAt.toISOString(),
				updatedAt: post.user.updatedAt.toISOString(),
			},
		}));

		return formattedPosts;
	} catch (error: any) {
		throw new Error(error);
	}
}
