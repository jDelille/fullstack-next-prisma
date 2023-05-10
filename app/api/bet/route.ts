import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const body = await request.json();
	const {
		league,
		match,
		odds,
		thoughts,
		wager,
		confidence,
		payout,
		groupId,
		isPrivate,
		shouldNotify,
	} = body;

	const newBet = await prisma.bet.create({
		data: {
			league,
			homeTeam: match.homeTeam,
			awayTeam: match.awayTeam,
			status: 'open',
			odds: odds.odds,
			type: odds.type,
			favorite: odds.favorite,
			value: odds.value,
			thoughts,
			wager: parseFloat(wager),
			confidence,
			location: odds.location,
			name: match.name,
			payout: payout,
			homeId: parseInt(odds.homeId),
			awayId: parseInt(odds.awayId),
			gameId: parseInt(odds.gameId),
			sport: odds.sport,
			isPrivate,
			shouldNotify,
		},
	});

	const newPost = await prisma.post.create({
		data: {
			userId: currentUser.id,
			betId: newBet.id,
			groupId,
		},
	});

	// Update the user's bet count and totalBets field
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
