import { makeAutoObservable } from 'mobx';
import { Bet } from '../types/Bet';

class BetStore {
	selectedBet: Bet[] = [];
	wager: number = 0;
	payout: number = 0;
	odds: number = 0;
	parlayOdds: number = 0;

	constructor() {
		makeAutoObservable(this);
	}

	setSelectedBet(bet: Bet) {
		this.selectedBet.push(bet);
	}

	setWager(wager: number) {
		this.wager = wager;
	}

	setPayout(payout: number) {
		this.payout = payout;
	}

	setOdds(odds: number) {
		this.odds = odds;
	}

	setParlayOdds(paylayOdds: number) {
		this.parlayOdds = paylayOdds;
	}

	clearSelectedBets() {
		this.selectedBet = [];
	}

	removeSelectedBet(index: number) {
		this.selectedBet.splice(index, 1);
	}

	getSelectedBet() {
		return this.selectedBet;
	}
}

const betStore = new BetStore();

export default betStore;
