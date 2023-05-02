import prisma from '@/app/libs/prismadb';

interface IParams {
	userId?: string;
}
export default async function getBetRecord(params: IParams) {
	try {
		const { userId } = params;

		const winCount = await prisma.post.count({
			where: {
				AND: [{ userId }, { Bet: { status: 'win' } }],
			},
		});

		const lossCount = await prisma.post.count({
			where: {
				AND: [{ userId }, { Bet: { status: 'loss' } }],
			},
		});

		return { winCount, lossCount };
	} catch (error: any) {
		throw new Error(error);
	}
}
