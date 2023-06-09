import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { Bet } from '@prisma/client';

type Parlay = {
	bets: Bet[];
};

export async function POST(request: Request) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const body = await request.json();

	const { bets, thoughts, odds, wager, payout } = body;

	const createdBets = await Promise.all(
		bets.map((bet: Bet) => prisma.bet.create({ data: { ...bet, thoughts } }))
	);

	const createdParlay = await prisma.parlay.create({
		data: {
			bets: {
				connect: createdBets.map((bet) => ({ id: bet.id })),
			},
			odds: odds,
			wager: wager,
			payout: payout,
		},
	});

	const newPost = await prisma.post.create({
		data: {
			userId: currentUser.id,
			parlayId: createdParlay.id,
			groupId: null,
		},
	});

	let totalBets = currentUser.totalBets;

	const updatedUser = await prisma.user.update({
		where: {
			id: currentUser.id,
		},
		data: {
			totalBets: (totalBets += 1),
		},
	});

	return NextResponse.json({ newPost, updatedUser });
}
