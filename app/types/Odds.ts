export type Odds = {
	details: string;
	awayTeamOdds: {
		favorite: boolean;
		moneyLine: number;
		spreadOdds: number;
	};
	homeTeamOdds: {
		favorite: boolean;
		moneyLine: number;
		spreadOdds: number;
	};
	moneylineWinner: boolean;
	overOdds: number;
	underOdds: number;
	overUnder: number;
	spread: number;
	spreadWinner: number;
};
