import prisma from '@/app/libs/prismadb';

interface IParams {
	userId?: string;
}

export default async function getBetsByUserId(params: IParams) {
	try {
		const { userId } = params;
		const bets = await prisma.post.findMany({
			where: {
				userId: userId,
				betId: { not: null },
			},
			orderBy: {
				createdAt: 'desc',
			},
			include: {
				Bet: true,
			},
		});

		const formattedPosts = bets.map((bet) => ({
			...bet,
			createdAt: bet.createdAt.toISOString(),
			updatedAt: bet.updatedAt.toISOString(),
		}));

		return formattedPosts;
	} catch (error: any) {
		throw new Error(error);
	}
}
