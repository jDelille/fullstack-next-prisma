import { User } from '@prisma/client';

export type SafeUser = Omit<
	User,
	'createdAt' | 'updatedAt' | 'emailVerified' | 'affilated' | 'points'
> & {
	createdAt: string;
	updatedAt: string;
	emailVerified: string | null;
	affiliated?: boolean | null;
	points: number | null;
};
