import prisma from '@/app/libs/prismadb';

interface IParams {
	groupId?: string;
}
export default async function getPostsByGroupId(params: IParams) {
	try {
		const { groupId } = params;
		const posts = await prisma.post.findMany({
			where: {
				groupId: groupId,
			},
			orderBy: { createdAt: 'desc' },
			include: {
				Bet: true,
				user: true,
				comments: true,
				Poll: true,
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
