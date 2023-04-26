interface IParams {
	sport: string;
	league: string;
}

export default async function getGames(params: IParams) {
	try {
		const res = await fetch(
			`http://site.api.espn.com/apis/site/v2/sports/${params.sport}/${params.league}/scoreboard`
		);

		if (!res.ok) {
			throw new Error('Failed to fetch games.');
		}

		const games = await res.json();
		return games.events;
	} catch (error) {
		console.log(error);
	}
}
