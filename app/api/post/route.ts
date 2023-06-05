import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const body = await request.json();
	const { photo, postBody, groupId, taggedUserIds } = body;

	console.log(taggedUserIds);

	const newPost = await prisma.post.create({
		data: {
			userId: currentUser.id,
			body: postBody,
			photo: photo,
			groupId,
			taggedUserIds,
		},
	});

	return NextResponse.json(newPost);
}
