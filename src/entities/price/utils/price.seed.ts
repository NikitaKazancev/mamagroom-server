import { PrismaClient } from '@prisma/client'

export const priceSeed = async (prisma: PrismaClient) => {
	const breedIds = (
		await prisma.breed.findMany({
			select: {
				id: true,
			},
		})
	).map(breed => breed.id)

	const procedureIds = (
		await prisma.procedure.findMany({
			select: {
				id: true,
			},
		})
	).map(procedure => procedure.id)

	return await prisma.price.createMany({
		data: [
			{
				breedId: breedIds[0],
				procedureId: procedureIds[0],
				price: 3000,
			},
			{
				breedId: breedIds[0],
				procedureId: procedureIds[1],
				price: 600,
			},
			{
				breedId: breedIds[0],
				procedureId: procedureIds[2],
				price: 1000,
			},
			{
				breedId: breedIds[1],
				procedureId: procedureIds[0],
				price: 3100,
			},
			{
				breedId: breedIds[1],
				procedureId: procedureIds[1],
				price: 700,
			},
			{
				breedId: breedIds[1],
				procedureId: procedureIds[2],
				price: 1100,
			},
			{
				breedId: breedIds[7],
				procedureId: procedureIds[10],
				price: 3000,
			},
			{
				breedId: breedIds[7],
				procedureId: procedureIds[11],
				price: 600,
			},
			{
				breedId: breedIds[7],
				procedureId: procedureIds[12],
				price: 1000,
			},
			{
				breedId: breedIds[8],
				procedureId: procedureIds[10],
				price: 3100,
			},
			{
				breedId: breedIds[8],
				procedureId: procedureIds[11],
				price: 700,
			},
			{
				breedId: breedIds[8],
				procedureId: procedureIds[12],
				price: 1100,
			},
		],
	})
}
