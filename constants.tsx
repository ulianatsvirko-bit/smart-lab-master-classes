import { Workshop, WorkshopStatus } from './types';

export const WORKSHOPS: Workshop[] = [
  {
    id: 'laba-collaba-2024',
    slug: 'smart-love-lab',
    title: 'LABA COLLABA',
    date: '14 февраля 2024',
    status: WorkshopStatus.UPCOMING,
    shortDescription: 'В честь Дня святого Валентина педагоги Smart Dance впервые объединятся! Объединяем стили — умножаем любовь!',
    fullDescription: 'В честь Дня святого Валентина педагоги Smart Dance впервые объединятся, чтобы дать вам максимум любви и крутого материала ❤️\n\nВас ждут 4 уникальных мастер-класса за один день от 8 топовых преподавателей, которые объединятся в дуэты, чтобы создать уникальный формат и дать вам максимум вдохновения и техники! Будут и уже полюбившиеся педагоги, и новые знакомства, и неожиданные коллаборации 🫣😍',
    imageUrl: 'https://i.ibb.co/CpmwyfCJ/IMG-5032.jpg',
    categories: [
      { name: 'стрит', color: 'bg-yellow-400', glow: 'text-glow-yellow' },
      { name: 'современная хореография', color: 'bg-pink-400', glow: 'text-glow-pink' },
      { name: 'классический танец', color: 'bg-blue-400', glow: 'text-glow-blue' },
    ],
    location: 'ул. Саперов, 5',
    pricing: [
      { label: 'Один-два мастер-класса', amount: '80 руб', onDayAmount: '90 руб' },
      { label: 'Три-четыре мастер-класса', amount: '140 руб', onDayAmount: '150 руб' }
    ],
    features: [
      '1.5 часа класс',
      'Перерывы',
      'Ящик для валентинок ❤️',
      'Вода включена 💧'
    ],
    schedules: [
      {
        ageLabel: 'Младшие до 11 включительно',
        items: [
          { time: '14:00 - 15:30', activity: 'Классический танец (Артамонов / Шеметовец)' },
          { time: '15:30 - 17:00', activity: 'Трюки (Артамонов / Новиков)' },
          { time: '17:20 - 18:50', activity: 'Хип-хоп импро (Огоновская / Новиков)' },
          { time: '18:50 - 20:20', activity: 'Хип-хоп хорео (Данила / Полина)' }
        ]
      },
      {
        ageLabel: '12 и старше',
        items: [
          { time: '14:00 - 15:30', activity: 'Хип-хоп хорео (Огоновская / Жихарева)' },
          { time: '15:30 - 17:00', activity: 'Джаз-фанк (Агафонова / Огоновская)' },
          { time: '17:20 - 18:50', activity: 'Контемпорари (Агафонова / Хаменко)' },
          { time: '18:50 - 20:20', activity: 'Контемпорри импро (Гичева / Хаменко)' }
        ]
      }
    ],
    registrationLink: 'https://forms.gle/TmCeFLdji4VPLt7D9'
  },
  {
    id: 'street-lab-march-2024',
    slug: 'street-lab-march',
    title: 'СТРИТ ЛАБ',
    date: '14 марта',
    status: WorkshopStatus.UPCOMING,
    shortDescription: 'Танцевальная лаборатория по уличным направлениям!',
    fullDescription: 'Мартовская серия лабораторий открывается мощным стрит-интенсивом. В программе: база, авторские хореографии и работа над фристайлом в самых актуальных стилях.',
    imageUrl: '',
    categories: [],
    location: 'ул. Саперов, 5',
    pricing: [],
    features: [],
    schedules: [],
    registrationLink: ''
  },
  {
    id: 'contemp-lab-march-2024',
    slug: 'contemp-lab-march',
    title: 'КОНТЕМПОРАРИ ЛАБ',
    date: '15 марта',
    status: WorkshopStatus.UPCOMING,
    shortDescription: 'Танцевальная лаборатория по современной хореографии!',
    fullDescription: 'Второй день мартовской лаборатории посвящен глубокому исследованию контемпа.',
    imageUrl: '',
    categories: [],
    location: 'ул. Саперов, 5',
    pricing: [],
    features: [],
    schedules: [],
    registrationLink: ''
  },
  {
    id: 'winter-lab-2023',
    slug: 'winter-lab',
    title: 'WINTER LAB 2023',
    date: 'Декабрь 2023',
    status: WorkshopStatus.PAST,
    shortDescription: 'Зимняя лаборатория танца: итоги года и новогодний вайб.',
    fullDescription: 'Наш последний лаб в 2023 году прошел максимально уютно и продуктивно.',
    imageUrl: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80&w=1200',
    categories: [
      { name: 'jazz-funk', color: 'bg-red-400', glow: '' },
      { name: 'hip-hop', color: 'bg-blue-400', glow: '' }
    ],
    location: 'ул. Саперов, 5',
    pricing: [],
    features: ['Прошедшее мероприятие'],
    schedules: [],
    registrationLink: '#'
  }
];