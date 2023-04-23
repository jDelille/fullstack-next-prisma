import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

interface IParams {
	commentId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { commentId } = params;

	if (!commentId || typeof commentId !== 'string') {
		throw new Error('Invalid Id');
	}

	const comment = await prisma.comment.findUnique({
		where: {
			id: commentId,
		},
	});

	if (!comment) {
		throw new Error('Invalid Id');
	}

	let updatedLikedIds = [...(comment.likedIds || [])];
	updatedLikedIds.push(currentUser?.id);

	const updatedComment = await prisma.comment.update({
		where: {
			id: commentId,
		},
		data: {
			likedIds: updatedLikedIds,
		},
	});

	return NextResponse.json(updatedComment);
}

export async function DELETE(
	request: Request,
	{ params }: { params: IParams }
) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { commentId } = params;

	if (!commentId || typeof commentId !== 'string') {
		throw new Error('Invalid Id');
	}

	const comment = await prisma.comment.findUnique({
		where: {
			id: commentId,
		},
	});

	if (!comment) {
		throw new Error('Invalid Id');
	}

	let updatedLikedIds = [...(comment.likedIds || [])];

	updatedLikedIds = updatedLikedIds.filter(
		(likedId) => likedId !== currentUser?.id
	);

	const updatedComment = await prisma.comment.update({
		where: {
			id: commentId,
		},
		data: {
			likedIds: updatedLikedIds,
		},
	});

	return NextResponse.json(updatedComment);
}
