import prisma from '@/app/libs/prismadb';

interface IParams {
	communityId?: string;
}
export default async function getPostsByCommunityId(params: IParams) {
	try {
		const { communityId } = params;
		const posts = await prisma.post.findMany({
			where: {
				communityId: communityId,
			},
			orderBy: { createdAt: 'desc' },
			include: {
				Bet: true,
				user: true,
				comments: true,
			},
		});

		const formattedPosts = posts.map((post) => ({
			...post,
			createdAt: post.createdAt.toISOString(),
			updatedAt: post.updatedAt.toISOString(),
			user: {
				...post.user,
				createdAt: post.user.createdAt.toISOString(),
				updatedAt: post.user.updatedAt.toISOString(),
			},
			comments: post.comments.map((comment) => ({
				...comment,
				createdAt: comment.createdAt.toISOString(),
				updatedAt: comment.updatedAt.toISOString(),
			})),
		}));

		return formattedPosts;
	} catch (error: any) {
		throw new Error(error);
	}
}
