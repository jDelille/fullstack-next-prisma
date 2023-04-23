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
			id: userId,
		},
	});

	if (!user) {
		throw new Error('Invalid Id');
	}

	let updatedFollowingIds = [...(currentUser.followingIds || [])];
	updatedFollowingIds.push(currentUser?.id);

	const updatedUser = await prisma.user.update({
		where: {
			id: userId,
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
			id: userId,
		},
	});

	if (!user) {
		throw new Error('Invalid Id');
	}

	let updatedFollowingIds = [...(currentUser.followingIds || [])];
	updatedFollowingIds.filter((followId) => followId !== currentUser?.id);

	const updatedUser = await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			followingIds: updatedFollowingIds,
		},
	});

	return NextResponse.json(updatedUser);
}
