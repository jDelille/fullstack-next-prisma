export type Bet = {
	id?: string;
	abbreviation: string;
	team: string;
	odds: number;
	type: string;
	status: string;
	favorite: boolean;
	value: number | null;
	location: string;
	sport: string;
	league: string;
	name: string;
	groupId: null;
};
