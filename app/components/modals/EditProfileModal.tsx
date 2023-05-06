'use client';

import useEditProfileModal from '@/app/hooks/useEditProfileModal';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styles from './Modal.module.scss';
import Modal from './Modal';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Input from '../input/Input';
import { useRouter } from 'next/navigation';
import Textarea from '../textarea/Textarea';
import ImageUpload from '../image-upload/ImageUpload';

type EditProfileModalProps = {
	name?: string;
	username?: string;
	bio?: string;
	userPhoto?: string
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ name, username, bio, userPhoto }) => {
	const router = useRouter();

	const editProfileModal = useEditProfileModal();
	const [isLoading, setIsLoading] = useState(false);
	const [photo, setPhoto] = useState('');

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			username: '',
		},
	});

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldValidate: true,
			shouldTouch: true,
		});
	};

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		axios
			.post('/api/profile', data)
			.then(() => {
				toast.success('Profile updated');
				editProfileModal.onClose();
				router.refresh();
				reset();
			})
			.catch((error) => {
				toast.error('Error');
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const bodyContent = (
		<div className={styles.bodyContent}>
			<p className={styles.imageUploadLabel}>Profile picture</p>
			<ImageUpload
				value={photo || userPhoto as string}
				onChange={(image) => setPhoto(image)}
				setCustomValue={setCustomValue}
				label='Edit your profile picture'
				placeholder={userPhoto}
			/>
			<Input
				id='name'
				label='Name'
				disabled={isLoading}
				register={register}
				placeholder={name}
				errors={errors}
				type='text'
				onChange={(e) => setCustomValue('name', e.target.value)}
			/>
			<Input
				id='username'
				label='Username'
				disabled={isLoading}
				register={register}
				placeholder={username}
				errors={errors}
				type='text'
				onChange={(e) => setCustomValue('username', e.target.value)}
			/>
			<Textarea
				id='bio'
				label='Bio'
				placeholder={bio}
				disabled={isLoading}
				register={register}
				errors={errors}
				onChange={(e) => setCustomValue('bio', e.target.value)}
			/>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={editProfileModal.isOpen}
			title='Edit Profile'
			actionLabel='Save'
			onClose={editProfileModal.onClose}
			icon={IoMdClose}
			body={bodyContent}
			onSubmit={handleSubmit(onSubmit)}
		/>
	);
};

export default EditProfileModal;
