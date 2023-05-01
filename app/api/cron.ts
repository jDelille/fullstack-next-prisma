import cron from 'node-cron';
import prisma from '@/app/libs/prismadb';
import axios from 'axios';

export async function checkCompletedBets() {
	const bets = await prisma.bet.findMany({ where: { status: 'open' } });

	bets.forEach(async (bet) => {
		// check if the game for this bet has ended
		const gameHasEnded = await checkIfGameHasEnded(bet);

		if (gameHasEnded) {
			// update the status of the bet
			const isBetWon = await determineIfBetIsWon(bet);
			// const newBetStatus = isBetWon ? 'won' : 'lost';
			await prisma.bet.update({
				where: { id: bet.id },
				data: { status: 'test' },
			});
		}
	});
}

async function checkIfGameHasEnded(bet) {
	const { league, gameId } = bet;

	switch (league) {
		case 'NBA':
			try {
				const { data } = await axios.get(
					`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary?event=${gameId}`
				);
				return data.status.type.completed;
			} catch (error) {
				console.error(`Error checking NBA game: ${error}`);
				return false;
			}
		case 'NFL':
			try {
				const { data } = await axios.get(
					`https://site.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=${gameId}`
				);
				return data.status.type.completed;
			} catch (error) {
				console.error(`Error checking NFL game: ${error}`);
				return false;
			}
		case 'MLB':
			try {
				const { data } = await axios.get(
					`https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/summary?event=${gameId}`
				);
				return data.status.type.completed;
			} catch (error) {
				console.error(`Error checking MLB game: ${error}`);
				return false;
			}
		default:
			console.error(`Unknown league: ${league}`);
			return false;
	}
}

async function determineIfBetIsWon(bet) {
	// add logic to determine if the bet is won
	// return true if the bet is won, false otherwise
}

cron.schedule('* * * * *', async () => {
	console.log('Running cron job...');
	await checkCompletedBets();
});

export default cron;
