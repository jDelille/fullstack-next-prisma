import { makeAutoObservable } from 'mobx';
import { Bet } from '../types/Bet';

class BetStore {
	selectedBet: Bet[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	setSelectedBet(bet: Bet) {
		this.selectedBet.push(bet);
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
