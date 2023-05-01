import prisma from '@/app/libs/prismadb';

interface IParams {
	groupId?: string;
}
export default async function getGroupById(params: IParams) {
	try {
		const { groupId } = params;

		if (!groupId) {
			throw new Error('Invalid ID');
		}

		const group = await prisma.group.findUnique({
			where: {
				id: groupId,
			},
		});

		return group;
	} catch (error: any) {
		throw new Error(error);
	}
}
