import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

interface IParams {
	postId?: string;
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
		throw new Error('Invalid ID');
	}

	const post = await prisma.post.findUnique({
		where: {
			id: postId,
		},
		include: {
			user: true,
			Bet: true,
		},
	});

	if (!post) {
		return NextResponse.error();
	}

	await prisma.post.delete({
		where: {
			id: postId,
		},
	});

	return NextResponse.json(post);
}
