'use client';

import useEditProfileModal from '@/app/hooks/useEditProfileModal';
import { useMemo, useState } from 'react';
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
import Button from '../button/Button';
import { Sports } from '@/app/constants/@Sports';

type EditProfileModalProps = {
	name?: string;
	username?: string;
	bio?: string;
	userPhoto?: string
	location?: string;
}

enum STEPS {
	DEFAULT = 0,
	PASSWORD = 1
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ name, username, bio, userPhoto, location }) => {
	const router = useRouter();

	const editProfileModal = useEditProfileModal();
	const [isLoading, setIsLoading] = useState(false);
	const [photo, setPhoto] = useState('');
	const [step, setStep] = useState(STEPS.DEFAULT);

	let selectedSports: String[] = []

	console.log(selectedSports)

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
			bio: '',
			location: '',
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

	const headerTitle = useMemo(() => {
		if (step === STEPS.DEFAULT) {
			return 'Edit Profile'
		}
		if (step === STEPS.PASSWORD) {
			return 'Change Password'
		}
	}, [step])

	const onClose = () => {
		editProfileModal.onClose();
		setStep(STEPS.DEFAULT)
	}


	let bodyContent = (
		<div className={styles.bodyContent}>
			<div className={styles.addProfilePicture}>
				<p className={styles.imageUploadLabel}>Profile picture</p>
				<ImageUpload
					value={photo || userPhoto as string}
					onChange={(image) => setPhoto(image)}
					setCustomValue={setCustomValue}
				/>
			</div>

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
				placeholder={bio || 'Let others know more about you'}
				disabled={isLoading}
				register={register}
				errors={errors}
				onChange={(e) => setCustomValue('bio', e.target.value)}
			/>
			{/* <Input
				id='location'
				label='Location'
				disabled={isLoading}
				register={register}
				placeholder={location || 'Location'}
				errors={errors}
				type='text'
				onChange={(e) => setCustomValue('location', e.target.value)}
			/> */}
			{/* <div className={styles.favoriteSports}>
				<p>Favorite Sports</p>
				<span>Select all that apply.</span>
				<div className={styles.sports}>
					{Sports.sports.map((sport) => (
						<div key={sport} className={selectedSports.includes(sport) ? styles.selectedSport : styles.sport} onClick={() => selectedSports.push(sport)}>{sport}</div>
					))}
				</div>
			</div> */}
		</div>
	);

	if (step === STEPS.PASSWORD) {
		bodyContent = (
			<div className={styles.bodyContent}>
				<Input
					id='password'
					label='Current password'
					disabled={isLoading}
					register={register}
					placeholder={'Current password'}
					errors={errors}
					type='password'
					onChange={(e) => setCustomValue('password', e.target.value)} />

				<Input
					id='newPassword'
					label='New password'
					disabled={isLoading}
					register={register}
					placeholder={'New password'}
					errors={errors}
					type='password'
					onChange={(e) => setCustomValue('newPassword', e.target.value)} />

				<Input
					id='confirmPassword'
					label='Confirm password'
					disabled={isLoading}
					register={register}
					placeholder={'Confirm password'}
					errors={errors}
					type='password'
					onChange={(e) => setCustomValue('confirmPassword', e.target.value)} />
			</div>
		)
	}

	return (
		<Modal
			disabled={isLoading}
			isOpen={editProfileModal.isOpen}
			title={headerTitle}
			actionLabel='Save'
			onClose={onClose}
			icon={IoMdClose}
			body={bodyContent}
			onSubmit={handleSubmit(onSubmit)}
		/>
	);
};

export default EditProfileModal;
