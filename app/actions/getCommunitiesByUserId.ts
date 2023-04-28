import prisma from '@/app/libs/prismadb';

interface IParams {
	userId?: string;
}
export default async function getCommunitiesByUserId(params: IParams) {
	try {
		const { userId } = params;

		if (!userId) {
			throw new Error('User is not authenticated');
		}

		const communities = await prisma.community.findMany({
			where: { memberIds: { has: userId } },
		});

		return communities;
	} catch (error: any) {
		throw new Error(error);
	}
}
