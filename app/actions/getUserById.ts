import prisma from '@/app/libs/prismadb';

interface IParams {
	userId?: string;
}
export default async function getUserById(params: IParams) {
	try {
		const { userId } = params;

		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!user) {
			return null;
		}

		return {
			...user,
			createdAt: user.createdAt.toISOString(),
			updatedAt: user.updatedAt.toISOString(),
			emailVerified: user.emailVerified?.toISOString() || null,
		};
	} catch (error: any) {
		throw new Error(error);
	}
}
