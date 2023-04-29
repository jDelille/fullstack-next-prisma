import prisma from '@/app/libs/prismadb';

interface IParams {
	userId?: string;
}
export default async function getNotificationByUserId(params: IParams) {
	try {
		const { userId } = params;

		if (!userId) {
			throw new Error('User is not authenticated');
		}

		const notification = await prisma.notification.findMany({
			where: {
				userId: userId,
			},
		});

		await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				hasNotification: false,
			},
		});

		return notification;
	} catch (error: any) {
		throw new Error(error);
	}
}
