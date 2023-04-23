import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
	const body = await request.json();
	const { name, username, bio, photo } = body;
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const data: any = {};

	if (name) {
		data.name = name;
	}

	if (username) {
		data.username = username;
	}

	if (bio) {
		data.bio = bio;
	}

	if (photo) {
		data.photo = photo;
	}

	const user = await prisma.user.update({
		where: {
			id: currentUser?.id,
		},
		data,
	});

	return NextResponse.json(user);
}
