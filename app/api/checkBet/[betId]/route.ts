import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import axios from 'axios';
import { NextResponse } from 'next/server';

interface IParams {
	betId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
	const { betId } = params;
	const currentUser = await getCurrentUser();
	const bet = await prisma.bet.findUnique({
		where: {
			id: betId,
		},
	});

	if (!betId || typeof betId !== 'string') {
		throw new Error('Invalid Id');
	}

	if (bet?.status !== 'open') {
		return new Response('Bet is not open', { status: 400 });
	}

	let gameStatus = false;
	const gameId = bet.gameId;
	const sport = bet.sport;
	const league = bet.league.toLowerCase();
	try {
		const { data } = await axios.get(
			`http://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/events/${gameId}/competitions/${gameId}/status?lang=en&region=us`
		);
		gameStatus = data.type.completed;
	} catch (error) {
		console.error(`Error checking NBA game: ${error}`);
	}

	if (gameStatus === false) {
		return;
	}

	if (gameStatus) {
		const gameId = bet.gameId;
		const homeId = bet.homeId;
		const awayId = bet.awayId;
		let homeScore = 0;
		let awayScore = 0;
		try {
			const { data } = await axios.get(
				`http://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/events/${gameId}/competitions/${gameId}/competitors/${homeId}/score?lang=en&region=us`
			);
			homeScore = data.value;
		} catch (error) {
			console.log(error);
		}
		try {
			const { data } = await axios.get(
				`http://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/events/${gameId}/competitions/${gameId}/competitors/${awayId}/score?lang=en&region=us`
			);
			awayScore = data.value;
		} catch (error) {
			console.log(error);
		}

		let result = 'loss';
		if (bet.type === 'Over') {
			if (bet.value && homeScore + awayScore > bet.value) {
				result = 'win';
			}
		}

		if (bet.type === 'Under') {
			if (bet.value && homeScore + awayScore < bet.value) {
				result = 'win';
			}
		}

		if (bet.type === 'Moneyline' && bet.location === 'home') {
			if (homeScore > awayScore) {
				result = 'win';
			} else {
				result = 'loss';
			}
		}

		if (bet.type === 'Moneyline' && bet.location === 'away') {
			if (homeScore > awayScore) {
				result = 'loss';
			} else {
				result = 'win';
			}
		}

		if (bet.type === 'Spread' && bet.location === 'away') {
			let awayScoreWithSpread = awayScore + (bet.value as number);

			if (homeScore > awayScoreWithSpread) {
				result = 'loss';
			} else {
				result = 'win';
			}
		}

		if (bet.type === 'Spread' && bet.location === 'home') {
			let homeScoreWithSpread = homeScore + (bet.value as number);

			if (homeScoreWithSpread > awayScore) {
				result = 'win';
			} else {
				result = 'loss';
			}
		}

		const updatedBet = await prisma.bet.update({
			where: {
				id: bet.id,
			},
			data: {
				status: result,
			},
		});

		if (result !== 'loss') {
			const positiveOdds = (bet.odds + 100) / 100;
			const negativeOdds = (100 - bet.odds) / 100;
			const currentPoints = currentUser?.points || 0;

			let decimalOdds = 0;
			if (bet.odds > 0) {
				decimalOdds = parseFloat(
					((currentPoints as number) + positiveOdds).toFixed(2)
				);
			} else {
				decimalOdds = parseFloat(
					((currentPoints as number) + negativeOdds).toFixed(2)
				);
			}

			const updatedUser = await prisma.user.update({
				where: {
					id: currentUser?.id,
				},
				data: {
					points: decimalOdds,
				},
			});
			return NextResponse.json({ updatedBet, updatedUser });
		}
	}
}
