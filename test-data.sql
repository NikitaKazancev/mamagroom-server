--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: breeds; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.breeds (id, name, type, language, created_at, updated_at, is_deleted) FROM stdin;
cm8bcg0zh00006elmbyf7ndra	Чихуахуа	small_dog	ru	2025-03-16 07:58:19.901	2025-03-16 07:58:19.901	f
cm8bcg0zi00016elmsqsypg3j	Йоркширский терьер	small_dog	ru	2025-03-16 07:58:19.901	2025-03-16 07:58:19.901	f
cm8bcg0zi00026elmlxjlwmwj	Бордер-колли	medium_dog	ru	2025-03-16 07:58:19.901	2025-03-16 07:58:19.901	f
cm8bcg0zi00036elmjqduu6gv	Бигль	medium_dog	ru	2025-03-16 07:58:19.901	2025-03-16 07:58:19.901	f
cm8bcg0zi00046elmapugnbdn	Немецкий дог	big_dog	ru	2025-03-16 07:58:19.901	2025-03-16 07:58:19.901	f
cm8bcg0zi00056elm0lb0pjay	Алабай	big_dog	ru	2025-03-16 07:58:19.901	2025-03-16 07:58:19.901	f
cm8bcg0zi00066elmboo6tkng	Кошка	cat	ru	2025-03-16 07:58:19.901	2025-03-16 07:58:19.901	f
cm8bcg0zi00076elmvgt73b9p	Chihuahua	small_dog	en	2025-03-16 07:58:19.901	2025-03-16 07:58:19.901	f
cm8bcg0zi00086elm9qzk2ckh	Yorkshire terrier	small_dog	en	2025-03-16 07:58:19.901	2025-03-16 07:58:19.901	f
cm8bcg0zi00096elmm49hdjop	Border collie	medium_dog	en	2025-03-16 07:58:19.901	2025-03-16 07:58:19.901	f
cm8bcg0zi000a6elmv5h0iikr	Bichon Frisé	small_dog	en	2025-03-16 07:58:19.901	2025-03-16 07:58:19.901	f
cm8bcg0zi000b6elmghjb2069	German Shepherd	big_dog	en	2025-03-16 07:58:19.901	2025-03-16 07:58:19.901	f
cm8bcg0zi000c6elmsnc2dp6y	Alaskan Malamute	big_dog	en	2025-03-16 07:58:19.901	2025-03-16 07:58:19.901	f
cm8bcg0zi000d6elmvv1xbrar	Cat	cat	en	2025-03-16 07:58:19.901	2025-03-16 07:58:19.901	f
\.


--
-- Data for Name: procedures; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.procedures (id, name, description, language, created_at, updated_at, is_deleted) FROM stdin;
cm8bcg10c00126elmo9cytcqf	Стрижка	Полное обслуживание, включающее подстригание шерсти по стандарту породы или индивидуальному запросу. Используются безопасные инструменты, чтобы обеспечить комфорт животного.	ru	2025-03-16 07:58:19.933	2025-03-16 07:58:19.933	f
cm8bcg10c00136elm6408vxgv	Купание и сушка	Мытье с использованием специализированных шампуней и кондиционеров, подходящих для типа шерсти и кожи животного, а затем аккуратная сушка феном.	ru	2025-03-16 07:58:19.933	2025-03-16 07:58:19.933	f
cm8bcg10c00146elmwka2s2v2	Расчесывание и удаление колтунов	Уход за шерстью включает глубокое расчесывание для удаления колтунов и лишней линяющей шерсти, что улучшает циркуляцию воздуха к коже животного.	ru	2025-03-16 07:58:19.933	2025-03-16 07:58:19.933	f
cm8bcg10c00156elm5wbf2em8	Стрижка когтей	Подрезание когтей до безопасной длины для предотвращения травм и улучшения ходьбы. Процедура проводится аккуратно и безболезненно.	ru	2025-03-16 07:58:19.933	2025-03-16 07:58:19.933	f
cm8bcg10c00166elmr9vw2f5i	Чистка ушей	Удаление загрязнений и серы из ушей, чтобы предотвратить инфекции и сохранить здоровье слухового аппарата.	ru	2025-03-16 07:58:19.933	2025-03-16 07:58:19.933	f
cm8bcg10d00176elmm9fj1j4k	Гигиеническая стрижка	Стрижка в чувствительных зонах (пах, лапы, морда) для поддержания чистоты и удобства животного.	ru	2025-03-16 07:58:19.933	2025-03-16 07:58:19.933	f
cm8bcg10d00186elmvn8xw8o8	Уход за зубами	Чистка зубов с использованием безопасных средств для удаления зубного налета, освежения дыхания и предотвращения стоматологических заболеваний.	ru	2025-03-16 07:58:19.933	2025-03-16 07:58:19.933	f
cm8bcg10d00196elmqftxeuna	Выщипывание шерсти из ушей	Удаление лишней шерсти внутри ушной раковины, что способствует улучшению вентиляции и предотвращению скопления влаги.	ru	2025-03-16 07:58:19.933	2025-03-16 07:58:19.933	f
cm8bcg10d001a6elmlg6q764l	Окрашивание шерсти	Использование специальных безопасных красителей для создания стильного образа или акцентов на шерсти животного.	ru	2025-03-16 07:58:19.933	2025-03-16 07:58:19.933	f
cm8bcg10d001b6elmp4ieecbd	Спа-процедуры	Включают массаж, нанесение увлажняющих масок и успокаивающих средств для улучшения состояния кожи и шерсти, а также снятия стресса.	ru	2025-03-16 07:58:19.933	2025-03-16 07:58:19.933	f
cm8bcg10d001c6elmly1lfkm9	Grooming	Full service including grooming to breed standard or custom request. Safe tools are used to ensure the comfort of the animal.	en	2025-03-16 07:58:19.933	2025-03-16 07:58:19.933	f
cm8bcg10d001d6elm9cbzhyy1	Bathing and drying	Washing with specialized shampoos and conditioners suitable for the animal's coat and skin type, then gently drying with a hair dryer.	en	2025-03-16 07:58:19.933	2025-03-16 07:58:19.933	f
cm8bcg10d001e6elmnkuj9e9r	Combing and detangling	Grooming involves deep brushing to remove tangles and excess shedding hair, which improves air circulation to the animal's skin.	en	2025-03-16 07:58:19.933	2025-03-16 07:58:19.933	f
cm8bcg10d001f6elmzffhwgzw	Claw trimming	Trimming nails to a safe length to prevent injury and improve walking. The procedure is gentle and painless.	en	2025-03-16 07:58:19.933	2025-03-16 07:58:19.933	f
cm8bcg10d001g6elm2ie62d1g	Ear cleaning	Removes debris and wax from the ears to prevent infections and maintain hearing health.	en	2025-03-16 07:58:19.933	2025-03-16 07:58:19.933	f
cm8bcg10d001h6elmgd0x1tdm	Hygienic haircut	Trimming in sensitive areas (groin, paws, muzzle) to maintain cleanliness and comfort of the animal.	en	2025-03-16 07:58:19.933	2025-03-16 07:58:19.933	f
cm8bcg10d001i6elmjgf2itf5	Dental care	Brush your teeth using safe products to remove plaque, freshen breath and prevent dental disease.	en	2025-03-16 07:58:19.933	2025-03-16 07:58:19.933	f
cm8bcg10d001j6elmf3w37a8h	Ear plucking	Removal of excess hair inside the ear canal, which improves ventilation and prevents moisture accumulation.	en	2025-03-16 07:58:19.933	2025-03-16 07:58:19.933	f
cm8bcg10d001k6elmftx7pzoo	Coat coloring	Using special safe dyes to create a stylish look or accents on the animal's fur.	en	2025-03-16 07:58:19.933	2025-03-16 07:58:19.933	f
cm8bcg10d001l6elmd8e9ayrc	Spa treatments	Includes massage, application of moisturizing masks and soothing products to improve the condition of the skin and coat, as well as relieve stress.	en	2025-03-16 07:58:19.933	2025-03-16 07:58:19.933	f
\.


--
-- Data for Name: responses_from_ai; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.responses_from_ai (id, model, breed_id, user_description, "imageName", created_at) FROM stdin;
\.


--
-- Data for Name: _ProcedureToResponseFromAI; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_ProcedureToResponseFromAI" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
1bbfea7a-7cde-4ef8-886a-391d8d9333e9	2c8229269cf27b0141e95488ce09bc8b535cb533e7597881612b02b244c6963a	2025-03-16 10:46:33.53883+03	0_init	\N	\N	2025-03-16 10:46:33.421883+03	1
6058dbdd-7175-43d8-8c4a-d1ec8762b63a	30d7575c76e094b28157240cbd1c84363d1b8c4dfb121d072b3990ef86722db4	2025-03-16 10:48:41.816989+03	20250316074711_added_position	\N	\N	2025-03-16 10:48:41.809551+03	1
\.


--
-- Data for Name: constants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.constants (language, type, name, value, created_at, updated_at) FROM stdin;
ru	home-page	main-title	заголовок	2025-03-16 07:58:19.886	2025-03-16 07:58:19.886
ru	home-page	main-description	описание	2025-03-16 07:58:19.886	2025-03-16 07:58:19.886
ru	home-page	about-us-title	о нас	2025-03-16 07:58:19.886	2025-03-16 07:58:19.886
ru	home-page	about-us-description	В рамках спецификации современных стандартов, интерактивные прототипы освещают чрезвычайно интересные особенности картины в целом, однако конкретные выводы, разумеется, объективно рассмотрены соответствующими инстанциями. Не следует, однако, забывать, что	2025-03-16 07:58:19.886	2025-03-16 07:58:19.886
ru	home-page	procedures-for-dogs-title	Процедуры для собак	2025-03-16 07:58:19.886	2025-03-16 07:58:19.886
ru	home-page	procedures-for-dogs-description	Груминг собак включает стрижку, уход за шерстью, купание и обработку когтей, что помогает поддерживать здоровье и внешний вид животного. Он выделяется тем, что улучшает не только внешний вид, но и самочувствие собаки, предотвращая кожные заболевания и снижая линьку.	2025-03-16 07:58:19.886	2025-03-16 07:58:19.886
ru	home-page	procedures-for-cats-title	Процедуры для кошек	2025-03-16 07:58:19.886	2025-03-16 07:58:19.886
ru	home-page	procedures-for-cats-description	Груминг кошек включает регулярное расчесывание, купание и уход за когтями, что помогает предотвратить образование колтунов и уменьшить выпадение шерсти. Особенность груминга кошек в том, что он минимизирует стресс для животного и способствует его гигиене, особенно у длинношерстных пород.	2025-03-16 07:58:19.886	2025-03-16 07:58:19.886
ru	home-page	values-title	наши ценности	2025-03-16 07:58:19.886	2025-03-16 07:58:19.886
en	home-page	main-title	title	2025-03-16 07:58:19.886	2025-03-16 07:58:19.886
en	home-page	main-description	description	2025-03-16 07:58:19.886	2025-03-16 07:58:19.886
en	home-page	about-us-title	about us	2025-03-16 07:58:19.886	2025-03-16 07:58:19.886
en	home-page	about-us-description	Within the framework of the specification of modern standards, interactive prototypes highlight extremely interesting features of the picture as a whole, but the specific conclusions are, of course, objectively considered by the relevant authorities. It should not be forgotten, however, that	2025-03-16 07:58:19.886	2025-03-16 07:58:19.886
en	home-page	procedures-for-dogs-title	Procedures for dogs	2025-03-16 07:58:19.886	2025-03-16 07:58:19.886
en	home-page	procedures-for-dogs-description	Dog grooming includes haircuts, hair care, bathing and nail treatment, which helps maintain the health and appearance of the animal. It stands out because it improves not only the appearance but also the well-being of the dog, preventing skin diseases and reducing shedding.	2025-03-16 07:58:19.886	2025-03-16 07:58:19.886
en	home-page	procedures-for-cats-title	Procedures for cats	2025-03-16 07:58:19.886	2025-03-16 07:58:19.886
en	home-page	procedures-for-cats-description	Cat grooming involves regular brushing, bathing, and nail care, which helps prevent matting and reduce hair loss. The beauty of cat grooming is that it minimizes stress for the animal and promotes hygiene, especially for long-haired breeds.	2025-03-16 07:58:19.886	2025-03-16 07:58:19.886
en	home-page	values-title	our values	2025-03-16 07:58:19.886	2025-03-16 07:58:19.886
\.


--
-- Data for Name: header_navbar_links; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.header_navbar_links (id, name, link, "order", language, created_at, updated_at, is_deleted, parent_link_id) FROM stdin;
cm8bcg0zn000e6elmr00kswkr	home	/	1	en	2025-03-16 07:58:19.907	2025-03-16 07:58:19.907	f	\N
cm8bcg0zn000f6elmfkg7x5fc	procedure and prices	\N	2	en	2025-03-16 07:58:19.907	2025-03-16 07:58:19.907	f	\N
cm8bcg0zn000g6elmpvwja89i	masters	/masters	3	en	2025-03-16 07:58:19.907	2025-03-16 07:58:19.907	f	\N
cm8bcg0zn000h6elmrxd5kvhe	vacancies	/vacancies	4	en	2025-03-16 07:58:19.907	2025-03-16 07:58:19.907	f	\N
cm8bcg0zn000i6elmvbic0p16	contacts	/contacts	5	en	2025-03-16 07:58:19.907	2025-03-16 07:58:19.907	f	\N
cm8bcg0zu000j6elmj1cqgvbo	for dogs	/dogs	1	en	2025-03-16 07:58:19.915	2025-03-16 07:58:19.915	f	cm8bcg0zn000f6elmfkg7x5fc
cm8bcg0zu000k6elm5s1p5naj	for cats	/cats	2	en	2025-03-16 07:58:19.915	2025-03-16 07:58:19.915	f	cm8bcg0zn000f6elmfkg7x5fc
cm8bcg0zx000l6elmt0sbnl7b	главная	/	1	ru	2025-03-16 07:58:19.917	2025-03-16 07:58:19.917	f	\N
cm8bcg0zx000m6elm2o3bjv8k	процедуры и цены	\N	2	ru	2025-03-16 07:58:19.917	2025-03-16 07:58:19.917	f	\N
cm8bcg0zx000n6elmcdxna809	мастера	/masters	3	ru	2025-03-16 07:58:19.917	2025-03-16 07:58:19.917	f	\N
cm8bcg0zx000o6elmsyp36sdz	вакансии	/vacancies	4	ru	2025-03-16 07:58:19.917	2025-03-16 07:58:19.917	f	\N
cm8bcg0zx000p6elmehhwlle9	контакты	/contacts	5	ru	2025-03-16 07:58:19.917	2025-03-16 07:58:19.917	f	\N
cm8bcg0zz000q6elmbtu4as6w	для собак	/dogs	1	ru	2025-03-16 07:58:19.919	2025-03-16 07:58:19.919	f	cm8bcg0zx000m6elm2o3bjv8k
cm8bcg0zz000r6elm1gzhaaev	для кошек	/cats	2	ru	2025-03-16 07:58:19.919	2025-03-16 07:58:19.919	f	cm8bcg0zx000m6elm2o3bjv8k
\.


--
-- Data for Name: main_slider; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.main_slider (id, image_name, "order", created_at, updated_at, is_deleted) FROM stdin;
cm8bcg104000s6elmcg4c1473	1.png	1	2025-03-16 07:58:19.925	2025-03-16 07:58:19.925	f
cm8bcg104000t6elmwi5uge6q	2.png	2	2025-03-16 07:58:19.925	2025-03-16 07:58:19.925	f
cm8bcg104000u6elmgiwjl1i7	3.png	3	2025-03-16 07:58:19.925	2025-03-16 07:58:19.925	f
cm8bcg104000v6elmg9hybimu	4.png	4	2025-03-16 07:58:19.925	2025-03-16 07:58:19.925	f
cm8bcg104000w6elmdfv6dnoc	5.png	5	2025-03-16 07:58:19.925	2025-03-16 07:58:19.925	f
cm8bcg104000x6elmjidgq7r9	6.png	6	2025-03-16 07:58:19.925	2025-03-16 07:58:19.925	f
\.


--
-- Data for Name: masters; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.masters (id, name, description, image_name, language, created_at, updated_at, is_deleted, "position") FROM stdin;
cm8bcg106000y6elm69uci3jt	Мария Казанцева	Самая лучшая	1.png	ru	2025-03-16 07:58:19.927	2025-03-16 07:58:19.927	f	\N
cm8bcg106000z6elmh940b6bb	Катя	Лучшая	2.png	ru	2025-03-16 07:58:19.927	2025-03-16 07:58:19.927	f	\N
cm8bcg10600106elmqhwf52li	Maria Kazantseva	The bestest	1.png	en	2025-03-16 07:58:19.927	2025-03-16 07:58:19.927	f	\N
cm8bcg10600116elml35hkka5	Katerina	The best	2.png	en	2025-03-16 07:58:19.927	2025-03-16 07:58:19.927	f	\N
\.


--
-- Data for Name: prices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.prices (breed_id, procedure_id, weight, "time", price, created_at, updated_at, is_deleted) FROM stdin;
cm8bcg0zh00006elmbyf7ndra	cm8bcg10c00126elmo9cytcqf	30	120	3000	2025-03-16 07:58:19.94	2025-03-16 07:58:19.94	f
cm8bcg0zh00006elmbyf7ndra	cm8bcg10c00136elm6408vxgv	20	60	600	2025-03-16 07:58:19.94	2025-03-16 07:58:19.94	f
cm8bcg0zh00006elmbyf7ndra	cm8bcg10c00146elmwka2s2v2	20	60	1000	2025-03-16 07:58:19.94	2025-03-16 07:58:19.94	f
cm8bcg0zi00016elmsqsypg3j	cm8bcg10c00126elmo9cytcqf	30	120	3100	2025-03-16 07:58:19.94	2025-03-16 07:58:19.94	f
cm8bcg0zi00016elmsqsypg3j	cm8bcg10c00136elm6408vxgv	0	0	700	2025-03-16 07:58:19.94	2025-03-16 07:58:19.94	f
cm8bcg0zi00016elmsqsypg3j	cm8bcg10c00146elmwka2s2v2	0	0	1100	2025-03-16 07:58:19.94	2025-03-16 07:58:19.94	f
cm8bcg0zi00076elmvgt73b9p	cm8bcg10d001c6elmly1lfkm9	30	120	3000	2025-03-16 07:58:19.94	2025-03-16 07:58:19.94	f
cm8bcg0zi00076elmvgt73b9p	cm8bcg10d001d6elm9cbzhyy1	20	60	600	2025-03-16 07:58:19.94	2025-03-16 07:58:19.94	f
cm8bcg0zi00076elmvgt73b9p	cm8bcg10d001e6elmnkuj9e9r	20	60	1000	2025-03-16 07:58:19.94	2025-03-16 07:58:19.94	f
cm8bcg0zi00086elm9qzk2ckh	cm8bcg10d001c6elmly1lfkm9	30	120	3100	2025-03-16 07:58:19.94	2025-03-16 07:58:19.94	f
cm8bcg0zi00086elm9qzk2ckh	cm8bcg10d001d6elm9cbzhyy1	0	0	700	2025-03-16 07:58:19.94	2025-03-16 07:58:19.94	f
cm8bcg0zi00086elm9qzk2ckh	cm8bcg10d001e6elmnkuj9e9r	0	0	1100	2025-03-16 07:58:19.94	2025-03-16 07:58:19.94	f
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, name, password, created_at, updated_at, is_deleted, roles) FROM stdin;
\.


--
-- Data for Name: vacancies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vacancies (id, name, description, language, created_at, updated_at, is_deleted) FROM stdin;
cm8bcg10q001m6elmn44jv8sc	Администратор	Делать всякие крутые штуки	ru	2025-03-16 07:58:19.947	2025-03-16 07:58:19.947	f
cm8bcg10q001n6elmgipzn4cn	Грумер	Стричь собак и любить их (но кошек любить не обязательно)	ru	2025-03-16 07:58:19.947	2025-03-16 07:58:19.947	f
cm8bcg10q001o6elm97doqm12	Стажер	Просто быть моим другом, чтобы мне было с кем пообщаться	ru	2025-03-16 07:58:19.947	2025-03-16 07:58:19.947	f
cm8bcg10q001p6elmxjls2mqd	Administrator	Do some cool things	en	2025-03-16 07:58:19.947	2025-03-16 07:58:19.947	f
cm8bcg10q001q6elm0qs56e9x	Groomer	Stretching dogs and loving them (but not loving cats is not mandatory)	en	2025-03-16 07:58:19.947	2025-03-16 07:58:19.947	f
cm8bcg10q001r6elmxu76bax0	Intern	Just be my friend, so I can talk to someone	en	2025-03-16 07:58:19.947	2025-03-16 07:58:19.947	f
\.


--
-- Data for Name: values; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."values" (id, title, description, image_name, "order", language, created_at, updated_at, is_deleted) FROM stdin;
cm8bcg10v001s6elmlfuzuvli	Забота о здоровье	Мы ставим здоровье и благополучие каждого питомца на первое место	1.png	1	ru	2025-03-16 07:58:19.951	2025-03-16 07:58:19.951	f
cm8bcg10v001t6elmhga2vm65	Качество услуг	Мы гарантируем высокие стандарты в каждой процедуре груминга	2.png	2	ru	2025-03-16 07:58:19.951	2025-03-16 07:58:19.951	f
cm8bcg10v001u6elm3dfg6fua	Комфорт животных	Мы создаем безопасную и комфортную среду для всех питомцев	3.png	3	ru	2025-03-16 07:58:19.951	2025-03-16 07:58:19.951	f
cm8bcg10v001v6elmxv9luh1v	Профессионализм	Наша команда постоянно совершенствует свои навыки и знания	4.png	4	ru	2025-03-16 07:58:19.951	2025-03-16 07:58:19.951	f
cm8bcg10v001w6elmqxj8qdet	Индивидуальный подход	Мы учитываем уникальные потребности каждого клиента и его питомца	5.png	5	ru	2025-03-16 07:58:19.951	2025-03-16 07:58:19.951	f
cm8bcg10v001x6elmp02uv6ow	Этика и уважение	Мы относимся к животным с любовью, терпением и уважением	6.png	6	ru	2025-03-16 07:58:19.951	2025-03-16 07:58:19.951	f
cm8bcg10v001y6elmn9qbjpnh	Health Care	We put the health and well-being of each pet first	1.png	1	en	2025-03-16 07:58:19.951	2025-03-16 07:58:19.951	f
cm8bcg10v001z6elmif4gq8at	Quality of Service	We guarantee high standards in every grooming procedure	2.png	2	en	2025-03-16 07:58:19.951	2025-03-16 07:58:19.951	f
cm8bcg10v00206elmtaq7rj7x	Pet Comfort	We create a safe and comfortable environment for all pets	3.png	3	en	2025-03-16 07:58:19.951	2025-03-16 07:58:19.951	f
cm8bcg10v00216elmlbn3fr7f	Professionalism	Our team is constantly improving their skills and knowledge	4.png	4	en	2025-03-16 07:58:19.951	2025-03-16 07:58:19.951	f
cm8bcg10v00226elmpuoywlns	Individual approach	We take into account the unique needs of each client and their pet	5.png	5	en	2025-03-16 07:58:19.951	2025-03-16 07:58:19.951	f
cm8bcg10v00236elmp8bqotcn	Ethics and Respect	We treat animals with love, patience and respect	6.png	6	en	2025-03-16 07:58:19.951	2025-03-16 07:58:19.951	f
\.


--
-- PostgreSQL database dump complete
--

