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

	const body = await request.json();
	const { postBody } = body;

	const comment = await prisma.comment.create({
		data: {
			body: postBody,
			userId: currentUser?.id,
			postId: postId,
			photo: currentUser?.photo,
			userName: currentUser?.name,
			isVerified: currentUser?.isVerified,
		},
	});

	const post = await prisma.post.findUnique({
		where: {
			id: postId,
		},
	});

	if (!post) {
		throw new Error('Invalid Id');
	}

	let updatedCommentedIds = new Set(post.commentedIds || []);
	updatedCommentedIds.add(currentUser?.id);

	// start notification

	try {
		if (post?.userId) {
			await prisma.notification.create({
				data: {
					body: 'Someone commented on your post',
					userId: post?.userId,
				},
			});

			await prisma.user.update({
				where: {
					id: post?.userId,
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
			commentedIds: Array.from(updatedCommentedIds),
		},
	});

	return NextResponse.json({ updatedPost, comment });
}
