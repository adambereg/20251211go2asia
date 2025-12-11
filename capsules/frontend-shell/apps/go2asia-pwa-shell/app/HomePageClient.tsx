'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useAuthMode } from '../contexts/AuthModeContext';
import {
  MapPin,
  Calendar,
  BookOpen,
  Users,
  Target,
  Handshake,
  Building,
  Wallet,
  ArrowRight,
  Globe,
  CheckCircle2,
  Compass,
  Gift,
  TrendingUp,
  Award,
  MapPinned,
  Clock,
} from 'lucide-react';
import {
  ModuleTile,
  Button,
  FeatureCard,
  UserSummary,
  Card,
  CardContent,
} from '@go2asia/ui';

const modules = [
  {
    module: 'atlas' as const,
    icon: MapPin,
    title: 'Atlas Asia',
    description: 'Энциклопедия мест',
    href: '/atlas',
  },
  {
    module: 'pulse' as const,
    icon: Calendar,
    title: 'Pulse Asia',
    description: 'События и афиша',
    href: '/pulse',
  },
  {
    module: 'blog' as const,
    icon: BookOpen,
    title: 'Blog Asia',
    description: 'Статьи и гайды',
    href: '/blog',
  },
  {
    module: 'guru' as const,
    icon: MapPin,
    title: 'Guru Asia',
    description: 'Рядом со мной',
    href: '/guru',
  },
  {
    module: 'rielt' as const,
    icon: Building,
    title: 'Rielt.Market',
    description: 'Поиск жилья',
    href: '/rielt',
  },
  {
    module: 'quest' as const,
    icon: Target,
    title: 'Quest Asia',
    description: 'Квесты и челленджи',
    href: '/quest',
  },
  {
    module: 'rf' as const,
    icon: Handshake,
    title: 'Russian Friendly',
    description: 'Партнёры и скидки',
    href: '/rf',
  },
  {
    module: 'space' as const,
    icon: Users,
    title: 'Space Asia',
    description: 'Социальная сеть',
    href: '/space',
  },
  {
    module: 'connect' as const,
    icon: Wallet,
    title: 'Connect Asia',
    description: 'Баланс и награды',
    href: '/connect',
  },
];

const popularPlaces = [
  {
    id: '1',
    title: 'Бангкок',
    subtitle: 'Таиланд',
    type: 'Страна',
    image: '/images/bangkok.jpg',
  },
  {
    id: '2',
    title: 'Чиангмай',
    subtitle: 'Таиланд',
    type: 'Город',
    image: '/images/chiangmai.jpg',
  },
  {
    id: '3',
    title: 'Пхукет',
    subtitle: 'Таиланд',
    type: 'Город',
    image: '/images/phuket.jpg',
  },
  {
    id: '4',
    title: 'Бали',
    subtitle: 'Индонезия',
    type: 'Остров',
    image: '/images/bali.jpg',
  },
];

const eventsThisWeek = [
  {
    id: '1',
    date: '21 ноября',
    location: 'Бангкок',
    title: 'Meetup цифровых кочевников',
    image: '/images/event-nomads.jpg',
  },
  {
    id: '2',
    date: '24 ноября',
    location: 'Чиангмай',
    title: 'Йога и медитация на рассвете',
    image: '/images/event-yoga.jpg',
  },
  {
    id: '3',
    date: '23 ноября',
    location: 'Пхукет',
    title: 'Фестиваль уличной еды',
    image: '/images/event-food.jpg',
  },
];

const benefits = [
  {
    type: 'community' as const,
    icon: Users,
    title: 'Живое сообщество Go2Asia',
    description:
      'Знакомьтесь с людьми, делитесь опытом, находите ответы на любые вопросы о ЮВА.',
    cta: 'Перейти в Space Asia',
    href: '/space',
  },
  {
    type: 'teams' as const,
    icon: Users,
    title: 'Путешествуйте командой',
    description:
      'Создавайте небольшие команды, планируйте совместные поездки и квесты, делитесь впечатлениями.',
    cta: 'Создать группу в Space',
    href: '/space/teams',
  },
  {
    type: 'rf' as const,
    icon: Gift,
    title: 'Скидки у Russian Friendly-партнёров',
    description:
      'Кафе, отели, коворкинги, которые понимают и дают бонусы русскоязычным путешественникам.',
    cta: 'Смотреть партнёрские места',
    href: '/rf',
  },
  {
    type: 'referral' as const,
    icon: TrendingUp,
    title: 'Реферальная программа',
    description:
      'Приглашайте друзей и получайте награды за активность каждого нового участника экосистемы.',
    cta: 'Получить свою реферальную ссылку',
    href: '/connect/referral',
  },
  {
    type: 'rewards' as const,
    icon: Award,
    title: 'Награды за активность',
    description:
      'Публикуйте посты, проходите квесты, зарабатывайте Points и NFT-бейджи за вклад в сообщество.',
    cta: 'Открыть профиль наград',
    href: '/connect/rewards',
  },
  {
    type: 'quests' as const,
    icon: Target,
    title: 'Открывайте Азию через квесты',
    description:
      'Маршруты, челленджи и задания в любимых городах. Выполняйте миссии и получайте бонусы.',
    cta: 'Смотреть квесты',
    href: '/quest',
  },
];

const userRewards = [
  {
    id: '1',
    title: '+50 Points за публикацию поста',
    time: '2 часа назад',
  },
  {
    id: '2',
    title: 'Получен NFT "Исследователь Чиангмая"',
    time: '1 день назад',
  },
  {
    id: '3',
    title: 'Достигнут уровень 12',
    time: '3 дня назад',
  },
];

// Компонент для неавторизованных пользователей
function UnauthenticatedHomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section - Синий градиент */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl p-6 md:p-12 text-white overflow-hidden relative">
          <div className="max-w-3xl">
            <p className="text-sm md:text-base mb-2 opacity-90 text-white">
              Добро пожаловать в экосистему
            </p>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-8 h-8 md:w-10 md:h-10 text-white" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-white">
                Go2Asia
            </h1>
            </div>
            <p className="text-base md:text-lg mb-6 opacity-95 text-white">
              Всё для жизни, путешествий и работы в Юго-Восточной Азии
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle2 size={20} className="flex-shrink-0 text-white" />
                <span className="text-white">Гайды и события по всей ЮВА</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 size={20} className="flex-shrink-0 text-white" />
                <span className="text-white">Сообщество и квесты для путешественников</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 size={20} className="flex-shrink-0 text-white" />
                <span className="text-white">Points, токены и NFT за активность</span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => router.push('/register')}
                className="bg-white text-sky-600 hover:bg-slate-50"
              >
                Зарегистрироваться
                <ArrowRight />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => router.push('/atlas')}
                className="border-2 border-white/30 text-white hover:bg-white/10"
              >
                Посмотреть контент
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Модули экосистемы */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          Модули экосистемы
        </h2>
        <p className="text-sm md:text-base text-slate-600 mb-8">
          Выберите модуль, чтобы начать исследование
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {modules.map((module) => (
            <ModuleTile
              key={module.href}
              module={module.module}
              icon={module.icon}
              title={module.title}
              description={module.description}
              locked={true}
              onClick={() => router.push(module.href)}
            />
          ))}
        </div>
      </section>

      {/* Популярно сейчас */}
      <section className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Популярно сейчас
          </h2>
          <p className="text-sm md:text-base text-slate-600 mb-6">
            Самые посещаемые места и контент
          </p>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
            {popularPlaces.map((place) => (
              <Card
                key={place.id}
                hover
                className="min-w-[280px] md:min-w-[320px] flex-shrink-0 overflow-hidden border-2 border-slate-200"
              >
                <div className="aspect-video bg-slate-200 relative mb-3">
                  {/* Placeholder для изображения */}
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    <MapPin size={48} />
                  </div>
                </div>
                <CardContent className="p-0">
                  <p className="text-xs text-slate-500 mb-1">{place.type}</p>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
                    {place.title}
                  </h3>
                  <p className="text-sm text-slate-600">{place.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* События этой недели */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            События этой недели
          </h2>
          <button
            onClick={() => router.push('/pulse')}
            className="text-sky-600 hover:text-sky-700 font-medium text-sm md:text-base flex items-center gap-1"
          >
            Смотреть все
            <ArrowRight size={16} />
          </button>
        </div>
        <p className="text-sm md:text-base text-slate-600 mb-6">Предстоящие мероприятия</p>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
          {eventsThisWeek.map((event) => (
            <Card
              key={event.id}
              hover
              className="min-w-[280px] md:min-w-[320px] flex-shrink-0 overflow-hidden"
            >
              <div className="aspect-video bg-slate-200 relative mb-3">
                {/* Placeholder для изображения */}
                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                  <Calendar size={48} />
                </div>
              </div>
              <CardContent className="p-0">
                <p className="text-xs text-slate-500 mb-1">
                  {event.date} • {event.location}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                  {event.title}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Зачем вступать в экосистему Go2Asia? */}
      <section className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Зачем вступать в экосистему Go2Asia?
          </h2>
          <p className="text-sm md:text-base text-slate-600 mb-8">
            Больше чем просто информация о путешествиях — целая экосистема
            возможностей
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {benefits.map((benefit, index) => (
              <FeatureCard
                key={index}
                type={benefit.type}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                cta={benefit.cta}
                onClick={() => router.push(benefit.href)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Присоединяйтесь к сообществу */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="bg-gradient-to-br from-sky-600 to-sky-700 rounded-2xl p-6 md:p-12 text-white overflow-hidden relative">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Присоединяйтесь к сообществу
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-95 text-white">
              Получите доступ ко всем возможностям экосистемы, зарабатывайте
              награды и находите единомышленников
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => router.push('/register')}
                className="bg-white text-sky-600 hover:bg-slate-50"
              >
                Зарегистрироваться
                <ArrowRight />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => router.push('/about')}
                className="border-2 border-white/30 text-white hover:bg-white/10"
              >
                Узнать больше
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Компонент для авторизованных пользователей
function AuthenticatedHomePage() {
  const router = useRouter();

  // Mock данные согласно скриншотам
  const userStats = {
    name: 'Анна Петрова',
    initials: 'АП',
    location: 'Пхукет, Таиланд',
    level: 12,
    progress: 75,
    pointsToNextLevel: 120,
    stats: {
      points: 3450,
      nfts: 5,
      teamMembers: 7,
      vouchers: 2,
    },
    recentActivity: {
      quests: 9,
      posts: 12,
      reviews: 3,
    },
    isPro: false,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* User Dashboard Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <UserSummary
          name={userStats.name}
          initials={userStats.initials}
          location={userStats.location}
          level={userStats.level}
          progress={userStats.progress}
          pointsToNextLevel={userStats.pointsToNextLevel}
          stats={userStats.stats}
          recentActivity={userStats.recentActivity}
          isPro={userStats.isPro}
          onContinueQuest={() => router.push('/quest')}
          onNewVouchers={() => router.push('/connect/vouchers')}
          onReferralLink={() => router.push('/connect/referral')}
        />
      </section>

      {/* Модули экосистемы */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          Модули экосистемы
        </h2>
        <p className="text-sm md:text-base text-slate-600 mb-6 md:mb-8">
          Выберите модуль, чтобы начать исследование
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {modules.map((module) => (
            <ModuleTile
              key={module.href}
              module={module.module}
              icon={module.icon}
              title={module.title}
              description={module.description}
              onClick={() => router.push(module.href)}
            />
          ))}
        </div>
      </section>

      {/* Рядом с вами */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          Рядом с вами
        </h2>
        <p className="text-sm md:text-base text-slate-600 mb-6">
          Места, события и жильё в вашем районе
        </p>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <MapPinned className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                  Включите определение местоположения
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Мы покажем интересные места и события рядом с вами
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => {
                      // TODO: запрос геолокации
                    }}
                  >
                    Разрешить доступ к геолокации
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => {
                      // TODO: выбор города вручную
                    }}
                  >
                    Указать город вручную
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Ваши награды */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Ваши награды
          </h2>
          <button
            onClick={() => router.push('/connect/rewards')}
            className="text-sky-600 hover:text-sky-700 font-medium text-sm md:text-base flex items-center gap-1"
          >
            Смотреть всё
            <ArrowRight size={16} />
          </button>
        </div>
        <p className="text-sm md:text-base text-slate-600 mb-6">Последние начисления</p>
        <div className="space-y-3">
          {userRewards.map((reward) => (
            <Card key={reward.id} hover>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{reward.title}</p>
                    <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                      <Clock size={14} />
                      {reward.time}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Популярно сейчас */}
      <section className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Популярно сейчас
          </h2>
            <button
              onClick={() => router.push('/atlas')}
              className="text-sky-600 hover:text-sky-700 font-medium text-sm md:text-base flex items-center gap-1"
            >
              Смотреть всё
              <ArrowRight size={16} />
            </button>
          </div>
          <p className="text-sm md:text-base text-slate-600 mb-6">
            Самые посещаемые места и контент
          </p>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
            {popularPlaces.map((place) => (
              <Card
                key={place.id}
                hover
                className="min-w-[280px] md:min-w-[320px] flex-shrink-0 overflow-hidden border-2 border-slate-200"
              >
                <div className="aspect-video bg-slate-200 relative mb-3">
                  {/* Placeholder для изображения */}
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    <MapPin size={48} />
                  </div>
                </div>
                <CardContent className="p-0">
                  <p className="text-xs text-slate-500 mb-1">{place.type}</p>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
                    {place.title}
                  </h3>
                  <p className="text-sm text-slate-600">{place.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* События этой недели */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            События этой недели
          </h2>
          <button
            onClick={() => router.push('/pulse')}
            className="text-sky-600 hover:text-sky-700 font-medium text-sm md:text-base flex items-center gap-1"
          >
            Смотреть все
            <ArrowRight size={16} />
          </button>
        </div>
        <p className="text-sm md:text-base text-slate-600 mb-6">Предстоящие мероприятия</p>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
          {eventsThisWeek.map((event) => (
            <Card
              key={event.id}
              hover
              className="min-w-[280px] md:min-w-[320px] flex-shrink-0 overflow-hidden"
            >
              <div className="aspect-video bg-slate-200 relative mb-3">
                {/* Placeholder для изображения */}
                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                  <Calendar size={48} />
                </div>
              </div>
              <CardContent className="p-0">
                <p className="text-xs text-slate-500 mb-1">
                  {event.date} • {event.location}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                  {event.title}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Зачем вступать в экосистему Go2Asia? */}
      <section className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Зачем вступать в экосистему Go2Asia?
          </h2>
          <p className="text-sm md:text-base text-slate-600 mb-8">
            Больше чем просто информация о путешествиях — целая экосистема
            возможностей
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {benefits.map((benefit, index) => (
              <FeatureCard
                key={index}
                type={benefit.type}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                cta={benefit.cta}
                onClick={() => router.push(benefit.href)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Присоединяйтесь к сообществу */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="bg-gradient-to-br from-sky-600 to-sky-700 rounded-2xl p-6 md:p-12 text-white overflow-hidden relative">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Присоединяйтесь к сообществу
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-95 text-white">
              Получите доступ ко всем возможностям экосистемы, зарабатывайте
              награды и находите единомышленников
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => router.push('/register')}
                className="bg-white text-sky-600 hover:bg-slate-50"
              >
                Зарегистрироваться
                <ArrowRight />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => router.push('/about')}
                className="border-2 border-white/30 text-white hover:bg-white/10"
              >
                Узнать больше
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// В Next.js NEXT_PUBLIC_* переменные доступны и на сервере, и на клиенте
const isClerkConfigured = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Компонент-обертка для условного использования Clerk
function ClerkAuthWrapper({
  children,
}: {
  children: (auth: { isLoaded: boolean; isSignedIn: boolean }) => React.ReactNode;
}) {
  if (!isClerkConfigured) {
    return <>{children({ isLoaded: true, isSignedIn: false })}</>;
  }
  
  // Внутренний компонент для безопасного вызова useUser
  function ClerkAuthInner() {
    const auth = useUser();
    return (
      <>{children({ isLoaded: auth.isLoaded ?? true, isSignedIn: auth.isSignedIn ?? false })}</>
    );
  }
  
  return <ClerkAuthInner />;
}

export function HomePageClient() {
  const { isAuthenticated: devModeAuthenticated } = useAuthMode();

  return (
    <ClerkAuthWrapper>
      {({ isLoaded, isSignedIn }) => {
        // Если Clerk настроен и в production - используем его, иначе используем dev mode toggle
        const isAuthenticated =
          isClerkConfigured && process.env.NODE_ENV === 'production'
          ? isSignedIn
          : devModeAuthenticated;

        // Показываем загрузку только если Clerk настроен и еще загружается
        if (isClerkConfigured && !isLoaded) {
          return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
              <div className="text-slate-600">Загрузка...</div>
            </div>
          );
        }

        // Условный рендеринг в зависимости от статуса авторизации
        return isAuthenticated ? <AuthenticatedHomePage /> : <UnauthenticatedHomePage />;
      }}
    </ClerkAuthWrapper>
  );
}

