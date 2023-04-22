import prisma from '@/app/libs/prismadb';

export default async function getPosts() {
	try {
		const posts = await prisma.post.findMany({
			orderBy: {
				createdAt: 'desc',
			},
			include: {
				Bet: true,
				user: true,
			},
		});

		console.log(posts);

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
