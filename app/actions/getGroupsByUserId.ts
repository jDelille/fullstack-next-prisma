import prisma from '@/app/libs/prismadb';

interface IParams {
	userId?: string;
}
export default async function getGroupsByUserId(params: IParams) {
	try {
		const { userId } = params;

		if (!userId) {
			throw new Error('User is not authenticated');
		}

		const groups = await prisma.group.findMany({
			where: { memberIds: { has: userId } },
		});

		return groups;
	} catch (error: any) {
		throw new Error(error);
	}
}
