import { PrismaClient } from '@prisma/client'
import { LANGUAGES } from 'src/utils/constants'

export const procedureSeed = async (prisma: PrismaClient) => {
	await prisma.procedure.createMany({
		data: [
			{
				language: LANGUAGES.RUSSIAN,
				name: 'Стрижка',
				description:
					'Полное обслуживание, включающее подстригание шерсти по стандарту породы или индивидуальному запросу. Используются безопасные инструменты, чтобы обеспечить комфорт животного.',
			},
			{
				language: LANGUAGES.RUSSIAN,
				name: 'Купание и сушка',
				description:
					'Мытье с использованием специализированных шампуней и кондиционеров, подходящих для типа шерсти и кожи животного, а затем аккуратная сушка феном.',
			},
			{
				language: LANGUAGES.RUSSIAN,
				name: 'Расчесывание и удаление колтунов',
				description:
					'Уход за шерстью включает глубокое расчесывание для удаления колтунов и лишней линяющей шерсти, что улучшает циркуляцию воздуха к коже животного.',
			},
			{
				language: LANGUAGES.RUSSIAN,
				name: 'Стрижка когтей',
				description:
					'Подрезание когтей до безопасной длины для предотвращения травм и улучшения ходьбы. Процедура проводится аккуратно и безболезненно.',
			},
			{
				language: LANGUAGES.RUSSIAN,
				name: 'Чистка ушей',
				description:
					'Удаление загрязнений и серы из ушей, чтобы предотвратить инфекции и сохранить здоровье слухового аппарата.',
			},
			{
				language: LANGUAGES.RUSSIAN,
				name: 'Гигиеническая стрижка',
				description:
					'Стрижка в чувствительных зонах (пах, лапы, морда) для поддержания чистоты и удобства животного.',
			},
			{
				language: LANGUAGES.RUSSIAN,
				name: 'Уход за зубами',
				description:
					'Чистка зубов с использованием безопасных средств для удаления зубного налета, освежения дыхания и предотвращения стоматологических заболеваний.',
			},
			{
				language: LANGUAGES.RUSSIAN,
				name: 'Выщипывание шерсти из ушей',
				description:
					'Удаление лишней шерсти внутри ушной раковины, что способствует улучшению вентиляции и предотвращению скопления влаги.',
			},
			{
				language: LANGUAGES.RUSSIAN,
				name: 'Окрашивание шерсти',
				description:
					'Использование специальных безопасных красителей для создания стильного образа или акцентов на шерсти животного.',
			},
			{
				language: LANGUAGES.RUSSIAN,
				name: 'Спа-процедуры',
				description:
					'Включают массаж, нанесение увлажняющих масок и успокаивающих средств для улучшения состояния кожи и шерсти, а также снятия стресса.',
			},
			{
				language: LANGUAGES.ENGLISH,
				name: 'Grooming',
				description:
					'Full service including grooming to breed standard or custom request. Safe tools are used to ensure the comfort of the animal.',
			},
			{
				language: LANGUAGES.ENGLISH,
				name: 'Bathing and drying',
				description:
					"Washing with specialized shampoos and conditioners suitable for the animal's coat and skin type, then gently drying with a hair dryer.",
			},
			{
				language: LANGUAGES.ENGLISH,
				name: 'Combing and detangling',
				description:
					"Grooming involves deep brushing to remove tangles and excess shedding hair, which improves air circulation to the animal's skin.",
			},
			{
				language: LANGUAGES.ENGLISH,
				name: 'Claw trimming',
				description:
					'Trimming nails to a safe length to prevent injury and improve walking. The procedure is gentle and painless.',
			},
			{
				language: LANGUAGES.ENGLISH,
				name: 'Ear cleaning',
				description:
					'Removes debris and wax from the ears to prevent infections and maintain hearing health.',
			},
			{
				language: LANGUAGES.ENGLISH,
				name: 'Hygienic haircut',
				description:
					'Trimming in sensitive areas (groin, paws, muzzle) to maintain cleanliness and comfort of the animal.',
			},
			{
				language: LANGUAGES.ENGLISH,
				name: 'Dental care',
				description:
					'Brush your teeth using safe products to remove plaque, freshen breath and prevent dental disease.',
			},
			{
				language: LANGUAGES.ENGLISH,
				name: 'Ear plucking',
				description:
					'Removal of excess hair inside the ear canal, which improves ventilation and prevents moisture accumulation.',
			},
			{
				language: LANGUAGES.ENGLISH,
				name: 'Coat coloring',
				description:
					"Using special safe dyes to create a stylish look or accents on the animal's fur.",
			},
			{
				language: LANGUAGES.ENGLISH,
				name: 'Spa treatments',
				description:
					'Includes massage, application of moisturizing masks and soothing products to improve the condition of the skin and coat, as well as relieve stress.',
			},
		],
	})
}
