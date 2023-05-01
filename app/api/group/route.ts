import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const body = await request.json();
	const { photo, groupName, groupBio, visibility } = body;

	const newGroup = await prisma.group.create({
		data: {
			adminId: currentUser.id,
			name: groupName,
			description: groupBio,
			photo: photo,
			isPrivate: visibility,
			memberIds: [currentUser.id],
		},
	});

	return NextResponse.json(newGroup);
}
