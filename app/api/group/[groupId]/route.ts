import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

interface IParams {
	groupId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { groupId } = params;

	if (!groupId || typeof groupId !== 'string') {
		throw new Error('Invalid Id');
	}

	const group = await prisma.group.findUnique({
		where: {
			id: groupId,
		},
	});

	if (!group) {
		throw new Error('Invalid Id');
	}

	let updatedMembersIds = [...(group.memberIds || [])];
	updatedMembersIds.push(currentUser?.id);

	const updatedGroup = await prisma.group.update({
		where: {
			id: groupId,
		},
		data: {
			memberIds: updatedMembersIds,
		},
	});

	return NextResponse.json(updatedGroup);
}

export async function DELETE(
	request: Request,
	{ params }: { params: IParams }
) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { groupId } = params;

	if (!groupId || typeof groupId !== 'string') {
		throw new Error('Invalid Id');
	}

	const group = await prisma.group.findUnique({
		where: {
			id: groupId,
		},
	});

	if (!group) {
		throw new Error('Invalid Id');
	}

	let updatedMembersIds = [...(group.memberIds || [])];

	updatedMembersIds = updatedMembersIds.filter(
		(memberId) => memberId !== currentUser?.id
	);

	const updatedGroup = await prisma.group.update({
		where: {
			id: groupId,
		},
		data: {
			memberIds: updatedMembersIds,
		},
	});

	return NextResponse.json(updatedGroup);
}
