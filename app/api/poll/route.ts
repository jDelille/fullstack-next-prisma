import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const body = await request.json();
	const { option1, option2, expiration, thoughts, groupId } = body;

	const newPoll = await prisma.poll.create({
		data: {
			option1,
			option2,
			expiration,
		},
	});

	const newPost = await prisma.post.create({
		data: {
			userId: currentUser.id,
			body: thoughts,
			pollId: newPoll.id,
			groupId,
		},
	});

	return NextResponse.json(newPost);
}

export async function PATCH(request: Request) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const body = await request.json();
	const { pollId, vote } = body;

	const currentPoll = await prisma.poll.findUnique({
		where: {
			id: pollId,
		},
	});

	if (!currentPoll) {
		return NextResponse.error();
	}

	let option1Votes = currentPoll.option1Votes;
	let option2Votes = currentPoll.option2Votes;

	const poll = await prisma.poll.update({
		where: {
			id: pollId,
		},
		data: {
			option1Votes: vote === 1 ? option1Votes + 1 : currentPoll.option1Votes,
			option2Votes: vote === 2 ? option2Votes + 1 : currentPoll.option2Votes,
			votersIds: {
				push: currentUser?.id,
			},
		},
	});

	return NextResponse.json(poll);
}
