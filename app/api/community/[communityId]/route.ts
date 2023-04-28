import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

interface IParams {
	communityId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { communityId } = params;

	if (!communityId || typeof communityId !== 'string') {
		throw new Error('Invalid Id');
	}

	const community = await prisma.community.findUnique({
		where: {
			id: communityId,
		},
	});

	if (!community) {
		throw new Error('Invalid Id');
	}

	let updatedMembersIds = [...(community.memberIds || [])];
	updatedMembersIds.push(currentUser?.id);

	const updatedCommunity = await prisma.community.update({
		where: {
			id: communityId,
		},
		data: {
			memberIds: updatedMembersIds,
		},
	});

	return NextResponse.json(updatedCommunity);
}

export async function DELETE(
	request: Request,
	{ params }: { params: IParams }
) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { communityId } = params;

	if (!communityId || typeof communityId !== 'string') {
		throw new Error('Invalid Id');
	}

	const community = await prisma.community.findUnique({
		where: {
			id: communityId,
		},
	});

	if (!community) {
		throw new Error('Invalid Id');
	}

	let updatedMembersIds = [...(community.memberIds || [])];

	updatedMembersIds = updatedMembersIds.filter(
		(memberId) => memberId !== currentUser?.id
	);

	const updatedCommunity = await prisma.community.update({
		where: {
			id: communityId,
		},
		data: {
			memberIds: updatedMembersIds,
		},
	});

	return NextResponse.json(updatedCommunity);
}
