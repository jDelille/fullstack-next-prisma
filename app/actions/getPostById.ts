import prisma from '@/app/libs/prismadb';

interface IParams {
	postId?: string;
}
export default async function getPostById(params: IParams) {
	try {
		const { postId } = params;

		const post = await prisma.post.findUnique({
			where: {
				id: postId,
			},
			include: {
				Bet: true,
				user: true,
				comments: true,
				Poll: true,
			},
		});

		if (!post) {
			return null;
		}

		return {
			...post,
			createdAt: post.createdAt.toISOString(),
			updatedAt: post.updatedAt.toISOString(),
			user: {
				...post.user,
				createdAt: post.user.createdAt.toISOString(),
				updatedAt: post.user.updatedAt.toISOString(),
				emailVerified: post.user.emailVerified?.toISOString() || null,
			},
			comments: post.comments.map((comment) => ({
				...comment,
				createdAt: comment.createdAt.toISOString(),
				updatedAt: comment.updatedAt.toISOString(),
			})),
		};
	} catch (error: any) {
		throw new Error(error);
	}
}
