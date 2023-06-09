import { Post } from '@prisma/client';
import { makeAutoObservable } from 'mobx';

class CommentStore {
	post: any | null = null;
	isOpen: boolean = false;

	constructor() {
		makeAutoObservable(this);
	}

	setOpen(isOpen: boolean) {
		this.isOpen = isOpen;
	}

	setPost(post: Post | null) {
		this.post = post;
	}

	clearPost() {
		this.post = null;
	}
}

const commentStore = new CommentStore();

export default commentStore;
