import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';



export async function POST(request: Request) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const body = await request.json();
	const { league, match, odds, thoughts, wager, confidence } = body;

	const newBet = await prisma.bet.create({
		data: {
			league,
			homeTeam: match.homeTeam,
			awayTeam: match.awayTeam,
			status: match.status,
			odds: odds.odds,
			type: odds.type,
			favorite: odds.favorite,
			value: odds.value,
			thoughts,
			wager: parseFloat(wager),
			confidence,
			location: odds.location,
			name: match.name,
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

