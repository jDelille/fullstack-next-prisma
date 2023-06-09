import { Post } from '@prisma/client';
import { makeAutoObservable } from 'mobx';

class PostPreviewStore {
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

const postPreviewStore = new PostPreviewStore();

export default postPreviewStore;
