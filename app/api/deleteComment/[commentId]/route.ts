import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

interface IParams {
	commentId?: string;
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
		select: {
			postId: true,
		},
	});

	if (!comment) {
		return NextResponse.error();
	}

	const post = await prisma.post.findUnique({
		where: {
			id: comment.postId,
		},
		select: {
			id: true,
			commentedIds: true,
			comments: true,
		},
	});

	await prisma.comment.delete({
		where: {
			id: commentId,
		},
	});

	if (post) {
		const currentUserCommentCount = await prisma.comment.count({
			where: {
				postId: post.id,
				userId: currentUser.id,
			},
		});
		const updatedCommentedIds = post.commentedIds.filter(
			(id) => id !== currentUser.id
		);

		if (currentUserCommentCount === 0 && updatedCommentedIds.length > 0) {
			// the user has no more comments on the post, remove their id from commentedIds
			const updatedPost = await prisma.post.update({
				where: {
					id: comment.postId,
				},
				data: {
					commentedIds: updatedCommentedIds,
				},
				select: {
					id: true,
					commentedIds: true,
					comments: true,
				},
			});

			console.log(updatedPost)

			return NextResponse.json({ post: updatedPost, comment });
		}
	}

	return NextResponse.json({ comment });
}
