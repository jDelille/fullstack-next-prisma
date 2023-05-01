import prisma from '@/app/libs/prismadb';

export default async function getGroups() {
	try {
		const groups = await prisma.group.findMany({});

		return groups;
	} catch (error: any) {
		throw new Error(error);
	}
}
