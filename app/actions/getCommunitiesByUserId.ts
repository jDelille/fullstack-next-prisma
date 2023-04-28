import prisma from '@/app/libs/prismadb';

interface IParams {
	userId?: string;
}
export default async function getCommunitiesByUserId(params: IParams) {
	try {
		const { userId } = params;
		let where = {};
		if (userId) {
			where = { memberIds: { has: userId } };
		}
		const communities = await prisma.community.findMany({
			where,
		});
		return communities;
	} catch (error: any) {
		throw new Error(error);
	}
}
