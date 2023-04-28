import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const body = await request.json();
	const { photo, communityName, communityBio, visibility } = body;

	const newCommunity = await prisma.community.create({
		data: {
			adminId: currentUser.id,
			name: communityName,
			description: communityBio,
			photo: photo,
			isPrivate: visibility,
		},
	});

	return NextResponse.json(newCommunity);
}
