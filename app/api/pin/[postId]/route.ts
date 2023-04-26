import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

interface IParams {
	postId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { postId } = params;

	if (!postId || typeof postId !== 'string') {
		throw new Error('Invalid Id');
	}

	const pinnedPost = await prisma.post.findFirst({
		where: {
			isPinned: true,
		},
	});

	if (pinnedPost && pinnedPost.id !== postId) {
		await prisma.post.update({
			where: {
				id: pinnedPost.id,
			},
			data: {
				isPinned: false,
			},
		});
	}

	const post = await prisma.post.findUnique({
		where: {
			id: postId,
		},
	});

	if (!post) {
		throw new Error('Invalid Id');
	}

	const updatedPost = await prisma.post.update({
		where: {
			id: postId,
		},
		data: {
			isPinned: true,
		},
	});

	return NextResponse.json({ updatedPost });
}

export async function DELETE(
	request: Request,
	{ params }: { params: IParams }
) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { postId } = params;

	if (!postId || typeof postId !== 'string') {
		throw new Error('Invalid Id');
	}

	const post = await prisma.post.findUnique({
		where: {
			id: postId,
		},
	});

	if (!post) {
		throw new Error('Invalid Id');
	}

	const updatedPost = await prisma.post.update({
		where: {
			id: postId,
		},
		data: {
			isPinned: false,
		},
	});
	return NextResponse.json(updatedPost);
}
