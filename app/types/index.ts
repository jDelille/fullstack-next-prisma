import { User } from '@prisma/client';

export type SafeUser = Omit<
	User,
	'createdAt' | 'updatedAt' | 'emailVerified' | 'affilated'
> & {
	createdAt: string;
	updatedAt: string;
	emailVerified: string | null;
	affiliated?: boolean | null;
	points: string | number | null;
};
