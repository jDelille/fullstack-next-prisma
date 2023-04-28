import prisma from '@/app/libs/prismadb';

interface IParams {
	userId?: string;
}
export default async function getCommunitiesByUserId(params: IParams) {
	try {
		const { userId } = params;

		const communities = await prisma.community.findMany({
			where: {
				memberIds: {
					has: userId,
				},
			},
		});

		return communities ?? [];
	} catch (error: any) {
		throw new Error(error);
	}
}
