import prisma from '@/app/libs/prismadb';

export default async function getCommunities() {
	try {
		const communities = await prisma.community.findMany({});

		return communities;
	} catch (error: any) {
		throw new Error(error);
	}
}
