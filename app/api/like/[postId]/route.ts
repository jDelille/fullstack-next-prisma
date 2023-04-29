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

	const post = await prisma.post.findUnique({
		where: {
			id: postId,
		},
	});

	if (!post) {
		throw new Error('Invalid Id');
	}

	let updatedLikedIds = [...(post.likedIds || [])];
	updatedLikedIds.push(currentUser?.id);

	// start notification

	try {
		if (post?.userId) {
			await prisma.notification.create({
				data: {
					body: 'Someone liked your post',
					userId: post?.userId,
				},
			});

			await prisma.user.update({
				where: {
					id: post.userId,
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

	const updatedPost = await prisma.post.update({
		where: {
			id: postId,
		},
		data: {
			likedIds: updatedLikedIds,
		},
	});

	return NextResponse.json(updatedPost);
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

	let updatedLikedIds = [...(post.likedIds || [])];

	updatedLikedIds = updatedLikedIds.filter(
		(likedId) => likedId !== currentUser?.id
	);

	const updatedPost = await prisma.post.update({
		where: {
			id: postId,
		},
		data: {
			likedIds: updatedLikedIds,
		},
	});

	return NextResponse.json(updatedPost);
}
