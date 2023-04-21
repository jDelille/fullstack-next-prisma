import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { Prisma } from '@prisma/client';

export async function POST(request: Request) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const body = await request.json();
	const { league, match, odds, thoughts, wager } = body;

	const newBet = await prisma.bet.create({
		data: {
			league,
			match,
			odds: odds.odds,
			type: odds.type,
			favorite: odds.favorite,
			value: odds.value,
			thoughts,
			wager: parseFloat(wager),
		},
	});

	const newPost = await prisma.post.create({
		data: {
			userId: currentUser.id,
			betId: newBet.id,
		},
	});

	return NextResponse.json(newPost);
}
