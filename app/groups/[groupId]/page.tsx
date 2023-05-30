import getUserById from '@/app/actions/getUserById';
import { SafeUser } from '@/app/types';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getGroupById from '@/app/actions/getGroupById';
import getPostsByGroupId from '@/app/actions/getPostsByGroupId';
import dynamic from 'next/dynamic';
import FeedHeader from '@/app/components/feed-header/FeedHeader';
import { IoArrowBack } from 'react-icons/io5';
import getUsers from '@/app/actions/getUsers';
import CreatePostFormSkeleton from '@/app/components/skeletons/create-post-form-skeleton/CreatePostFormSkeleton';
import PostCardSkeleton from '@/app/components/skeletons/post-card-skeleton/PostCardSkeleton';
import { GroupsScreenString } from '@/app/utils/app-string/GroupsScreenString';
import styles from './Page.module.scss';
interface IParams {
	groupId?: string;
}

const Group = async ({ params }: { params: IParams }) => {

	const [group, currentUser, users] = await Promise.all([
		getGroupById(params),
		getCurrentUser(),
		getUsers()
	])

	const DynamicPostFeed = dynamic(
		() => import('../../components/post-feed/PostFeed'),
		{
			loading: () => <div>
				<PostCardSkeleton />
				<PostCardSkeleton />
				<PostCardSkeleton />
			</div>,
		}
	);

	const DynamicCreatePostForm = dynamic(
		() =>
			import('../../components/create-post/create-post-form/CreatePostForm'),
		{
			loading: () => <div>
				<CreatePostFormSkeleton />
			</div>,
		}
	);

	let admin: SafeUser | null = null;
	let posts: any | null = null;
	if (group) {
		[admin, posts] = await Promise.all([
			getUserById({ userId: group.adminId }),
			getPostsByGroupId({ groupId: group.id })
		])
	}

	return (
		<div className={styles.page}>
			<FeedHeader label={GroupsScreenString.back} icon={IoArrowBack} isBack />
			<div className={styles.header}>
				<div className={styles.name}>
					<div className={styles.photo}>
						{group?.photo}
					</div>
					<h1>
						{group?.name}
					</h1>
				</div>
				<p className={styles.description}>{group?.description}</p>
				<div className={styles.admin}>
					<p>{GroupsScreenString.admin}</p>
					<span>{admin?.name}</span>
				</div>
				<p className={styles.members}>
					{group?.memberIds.length} {' '}
					<span>{GroupsScreenString.members}</span>
				</p>
			</div>
			<div className={styles.body}>
				<DynamicCreatePostForm
					isComment={false}
					isBordered
					userId={currentUser?.id as string}
					isGroup={true}
					userPhoto={currentUser?.photo as string}
					groupId={group?.id as string}
					placeholder={`Let ${group?.name} know what's happening`}
				/>
				<DynamicPostFeed currentUser={currentUser} posts={posts} users={users} />
			</div>
		</div>
	);
};

export default Group;
