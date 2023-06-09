'use client';

import useLoginModal from '@/app/hooks/useLoginModal';
import Button from '../button/Button';
import styles from './Footer.module.scss';
import useRegisterModal from '@/app/hooks/useRegitserModal';

type FooterProps = {
	currentUserId?: string;
};

const Footer: React.FC<FooterProps> = ({ currentUserId }) => {
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();

	return (
		<>
			{!currentUserId && (
				<div className={styles.loginFooter}>
					<div className={styles.footerWrapper}>
						<div className={styles.text}>
							<p>{"Don't miss what's happening"}</p>
							<p>People on Wagerly are the first to know.</p>
						</div>
						<div className={styles.buttons}>
							<Button
								label='Log in'
								onClick={loginModal.onOpen}
								ariaLabel='Log in to your account'
								tabIndex={1}
							/>
							<Button
								label='Sign up'
								onClick={registerModal.onOpen}
								tabIndex={2}
								ariaLabel='Sign up for an account'
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Footer;
