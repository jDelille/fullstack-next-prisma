import { Post } from '@prisma/client';
import { makeAutoObservable } from 'mobx';

class PostStore {
	posts: Post[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	setLocalPosts(posts: Post[]) {
		this.posts = posts;
	}
}

const postStore = new PostStore();

export default postStore;
