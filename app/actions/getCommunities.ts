import prisma from '@/app/libs/prismadb';

export default async function getCommunities() {
	try {
		const communities = await prisma.community.findMany({});

		// const formattedPosts = posts.map((post) => ({
		// 	...post,
		// 	createdAt: post.createdAt.toISOString(),
		// 	updatedAt: post.updatedAt.toISOString(),
		// 	user: {
		// 		...post.user,
		// 		createdAt: post.user.createdAt.toISOString(),
		// 		updatedAt: post.user.updatedAt.toISOString(),
		// 	},
		// 	comments: post.comments.map((comment) => ({
		// 		...comment,
		// 		createdAt: comment.createdAt.toISOString(),
		// 		updatedAt: comment.updatedAt.toISOString(),
		// 	})),
		// }));

		return communities;
	} catch (error: any) {
		throw new Error(error);
	}
}