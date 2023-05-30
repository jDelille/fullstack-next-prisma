export function calculateParlayOdds(oddsArray: number[]): number {
	const moneylineOdds = oddsArray.map((odds) => {
		if (odds > 0) {
			return odds / 100 + 1;
		} else {
			return 100 / Math.abs(odds) + 1;
		}
	});

	const parlayOdds = moneylineOdds.reduce(
		(accumulator, odds) => accumulator * odds,
		1
	);
	const decimalOdds = parlayOdds - 1;

	if (decimalOdds >= 2) {
		return Math.round(decimalOdds * 100 - 100);
	} else {
		return Math.round(100 / decimalOdds - 100);
	}
}

export const calculatePayout = (wager: number, oddsArray: number[]): number => {
	const decimalOdds = oddsArray.reduce((accumulator, odds) => {
		const decimalOdds = odds > 0 ? odds / 100 + 1 : 100 / Math.abs(odds) + 1;
		return accumulator * decimalOdds;
	}, 1);

	const payoutAmount = wager * decimalOdds;
	const formattedPayout = Number(payoutAmount.toFixed(2));
	return formattedPayout;
};

export const customStyles = {
	control: (provided: any) => ({
		...provided,
		borderRadius: '4px',
		borderColor: '#2a333f',
		boxShadow: 'none',
		backgroundColor: '#2a333f',
		color: '#fcfeff',
		cursor: 'pointer',
	}),
	option: (provided: any, state: any) => ({
		...provided,
		backgroundColor: state.isSelected ? '#20b46a' : '#2a333f',
		color: state.isSelected ? '#fcfeff' : '#fcfeff',
		cursor: 'pointer',
		':hover': {
			backgroundColor: state.isSelected ? '#20b46a' : '#1c2631',
			color: state.isSelected ? '#fcfeff' : '#fcfeff',
		},
	}),
	menu: (provided: any) => ({
		...provided,
		backgroundColor: '#2a333f',
	}),
	menuList: (provided: any) => ({
		...provided,
		backgroundColor: '#2a333f',
		color: '#fcfeff',
	}),
	singleValue: (provided: any) => ({
		...provided,
		color: '#fcfeff',
	}),
	indicatorSeparator: (provided: any) => ({
		...provided,
		backgroundColor: '#fcfeff',
	}),
};
