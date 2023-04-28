import prisma from '@/app/libs/prismadb';

interface IParams {
	communityId?: string;
}
export default async function getCommunityById(params: IParams) {
	try {
		const { communityId } = params;

		if (!communityId) {
			throw new Error('Invalid ID');
		}

		const community = await prisma.community.findUnique({
			where: {
				id: communityId,
			},
		});

		return community;
	} catch (error: any) {
		throw new Error(error);
	}
}
