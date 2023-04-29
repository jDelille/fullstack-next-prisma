import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

interface IParams {
	userId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { userId } = params;

	if (!userId || typeof userId !== 'string') {
		throw new Error('Invalid Id');
	}

	const user = await prisma.user.findUnique({
		where: {
			id: currentUser.id,
		},
	});

	if (!user) {
		throw new Error('Invalid Id');
	}

	const followedUser = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});

	if (!followedUser) {
		throw new Error('Invalid ID');
	}

	// start notification

	try {
		if (followedUser?.id) {
			await prisma.notification.create({
				data: {
					body: 'Someone followed you',
					userId: followedUser.id,
				},
			});

			await prisma.user.update({
				where: {
					id: followedUser.id,
				},
				data: {
					hasNotification: true,
				},
			});
		}
	} catch (error) {
		console.log(error);
	}

	// end notification

	let updatedFollowingIds = [...(currentUser.followingIds || [])];
	updatedFollowingIds.push(userId);

	const updatedUser = await prisma.user.update({
		where: {
			id: currentUser.id,
		},
		data: {
			followingIds: updatedFollowingIds,
		},
	});

	return NextResponse.json(updatedUser);
}

export async function DELETE(
	request: Request,
	{ params }: { params: IParams }
) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { userId } = params;

	if (!userId || typeof userId !== 'string') {
		throw new Error('Invalid Id');
	}

	const user = await prisma.user.findUnique({
		where: {
			id: currentUser?.id,
		},
	});

	if (!user) {
		throw new Error('Invalid Id');
	}

	let updatedFollowingIds = [...(currentUser.followingIds || [])];

	const index = updatedFollowingIds.indexOf(userId);

	if (index > -1) {
		updatedFollowingIds.splice(index, 1);
	}

	const updatedUser = await prisma.user.update({
		where: {
			id: currentUser?.id,
		},
		data: {
			followingIds: updatedFollowingIds,
		},
	});

	return NextResponse.json(updatedUser);
}
