import styles from './Page.module.scss';
import getUserById from '@/app/actions/getUserById';
import { SafeUser } from '@/app/types';
import ProfileMenu from '@/app/components/menu/ProfileMenu';
import CreatePostForm from '@/app/components/create-post/create-post-form/CreatePostForm';
import getCurrentUser from '@/app/actions/getCurrentUser';
import PostFeed from '@/app/components/post-feed/PostFeed';
import getGroupById from '@/app/actions/getGroupById';
import getPostsByGroupId from '@/app/actions/getPostsByGroupId';
import { FaUsers } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import FeedHeader from '@/app/components/feed-header/FeedHeader';
import { IoArrowBack } from 'react-icons/io5';
import getUsers from '@/app/actions/getUsers';

interface IParams {
	groupId?: string;
}

const Group = async ({ params }: { params: IParams }) => {
	const group = await getGroupById(params);
	const currentUser = await getCurrentUser();
	const users = await getUsers()

	const DynamicPostFeed = dynamic(
		() => import('../../components/post-feed/PostFeed'),
		{
			loading: () => <p>Loading...</p>,
		}
	);

	const DynamicCreatePostForm = dynamic(
		() =>
			import('../../components/create-post/create-post-form/CreatePostForm'),
		{
			loading: () => <p>Loading...</p>,
		}
	);

	// let admin: SafeUser | null = null;
	let posts: any | null = null;
	if (group) {
		// admin = await getUserById({ userId: group.adminId });
		posts = await getPostsByGroupId({ groupId: group.id });
	}

	return (
		<div className={styles.page}>
			<FeedHeader label='Back' icon={IoArrowBack} isBack />
			<div className={styles.header}>
				<div className={styles.name}>
					<h1>
						{group?.name} {group?.photo}
					</h1>
				</div>
				<p className={styles.description}>{group?.description}</p>
				<p className={styles.members}>
					{' '}
					<FaUsers /> {group?.memberIds.length}
				</p>
			</div>
			<div className={styles.body}>
				{/* <DynamicCreatePostForm
					isComment={false}
					isBordered
					userId={currentUser?.id as string}
					isGroup={true}
					userPhoto={currentUser?.photo as string}
					groupId={group?.id as string}
					placeholder={`Let ${group?.name} know what's happening`}
				/> */}
				<DynamicPostFeed currentUser={currentUser} posts={posts} users={users} />
			</div>
		</div>
	);
};

export default Group;
