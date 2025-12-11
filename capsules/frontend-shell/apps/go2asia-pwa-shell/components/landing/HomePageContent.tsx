'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Globe,
  Calendar,
  BookOpen,
  MapPin,
  Building,
  Target,
  Users,
  Wallet,
  Handshake,
  Users2,
  Gift,
  TrendingUp,
  Award,
  Crosshair,
  ArrowRight,
} from 'lucide-react';
import {
  HeroSection,
  ModuleTile,
  CarouselItem,
  FeatureCard,
  CTABanner,
  UserSummary,
  Button,
} from '@go2asia/ui';
import { RewardsList } from './RewardsList';
import { LocationPrompt } from './LocationPrompt';

// TODO: Заменить на реальную проверку авторизации через Clerk
const isAuthenticated = false; // Временно false для демонстрации неавторизованного состояния

const modules = [
  {
    href: '/atlas',
    module: 'atlas' as const,
    icon: Globe,
    title: 'Atlas Asia',
    description: 'Энциклопедия мест',
    requiresAuth: false,
    isPro: false,
  },
  {
    href: '/pulse',
    module: 'pulse' as const,
    icon: Calendar,
    title: 'Pulse Asia',
    description: 'События и афиша',
    requiresAuth: false,
    isPro: false,
  },
  {
    href: '/blog',
    module: 'blog' as const,
    icon: BookOpen,
    title: 'Blog Asia',
    description: 'Статьи и гайды',
    requiresAuth: false,
    isPro: false,
  },
  {
    href: '/guru',
    module: 'guru' as const,
    icon: MapPin,
    title: 'Guru Asia',
    description: 'Рядом со мной',
    requiresAuth: true,
    isPro: false,
  },
  {
    href: '/rielt',
    module: 'rielt' as const,
    icon: Building,
    title: 'Rielt.Market',
    description: 'Поиск жилья',
    requiresAuth: true,
    isPro: false,
  },
  {
    href: '/quest',
    module: 'quest' as const,
    icon: Target,
    title: 'Quest Asia',
    description: 'Квесты и челленджи',
    requiresAuth: true,
    isPro: false,
  },
  {
    href: '/rf',
    module: 'rf' as const,
    icon: Handshake,
    title: 'Russian Friendly',
    description: 'Партнеры и скидки',
    requiresAuth: true,
    isPro: true,
  },
  {
    href: '/space',
    module: 'space' as const,
    icon: Users,
    title: 'Space Asia',
    description: 'Социальная сеть',
    requiresAuth: true,
    isPro: false,
  },
  {
    href: '/connect',
    module: 'connect' as const,
    icon: Wallet,
    title: 'Connect Asia',
    description: 'Баланс и награды',
    requiresAuth: true,
    isPro: false,
  },
];

const popularPlaces = [
  {
    type: 'Страна',
    name: 'Бангкок',
    country: 'Таиланд',
    image: '/images/bangkok.jpg',
  },
  {
    type: 'Город',
    name: 'Чиангмай',
    country: 'Таиланд',
    image: '/images/chiangmai.jpg',
  },
  {
    type: 'Город',
    name: 'Пхукет',
    country: 'Таиланд',
    image: '/images/phuket.jpg',
  },
  {
    type: 'Остров',
    name: 'Бали',
    country: 'Индонезия',
    image: '/images/bali.jpg',
  },
];

const events = [
  {
    date: '23 ноября',
    location: 'Бангкок',
    title: 'Meetup цифровых кочевников',
    image: '/images/event-nomads.jpg',
  },
  {
    date: '24 ноября',
    location: 'Чиангмай',
    title: 'Йога и медитация на рассвете',
    image: '/images/event-yoga.jpg',
  },
  {
    date: '25 ноября',
    location: 'Пхукет',
    title: 'Фестиваль уличной еды',
    image: '/images/event-food.jpg',
  },
];

const benefits = [
  {
    type: 'community' as const,
    icon: Users2,
    title: 'Живое сообщество Go2Asia',
    description:
      'Знакомьтесь с людьми, делитесь опытом, находите ответы на любые вопросы о ЮВА.',
    cta: 'Перейти в Space Asia',
  },
  {
    type: 'teams' as const,
    icon: Users2,
    title: 'Путешествуйте командой',
    description:
      'Создавайте небольшие команды друзей и единомышленников, планируйте поездки и квесты вместе.',
    cta: 'Создать группу в Space',
  },
  {
    type: 'rf' as const,
    icon: Gift,
    title: 'Скидки у Russian Friendly-партнёров',
    description:
      'Кафе, отели, коворкинги и сервисы, где вас понимают и дают бонусы по Go2Asia.',
    cta: 'Смотреть партнёрские места',
  },
  {
    type: 'referral' as const,
    icon: TrendingUp,
    title: 'Реферальная программа',
    description:
      'Приглашайте друзей в Go2Asia и получайте вознаграждения за их активность.',
    cta: 'Получить свою реферальную ссылку',
  },
  {
    type: 'rewards' as const,
    icon: Award,
    title: 'Награды за активность',
    description:
      'Публикуйте посты, проходите квесты, помогайте новичкам и копите Points и NFT-бейджи.',
    cta: 'Открыть профиль наград',
  },
  {
    type: 'quests' as const,
    icon: Crosshair,
    title: 'Открывайте Азию через квесты',
    description:
      'Маршруты, челленджи и задания в любимых городах. Выполняйте миссии и получайте бонусы.',
    cta: 'Смотреть квесты',
  },
];

const rewards = [
  {
    id: '1',
    icon: 'star' as const,
    text: '+50 Points за публикацию поста',
    timeAgo: '2 часа назад',
  },
  {
    id: '2',
    icon: 'gem' as const,
    text: 'Получен NFT "Исследователь Чиангмая"',
    timeAgo: '1 день назад',
  },
  {
    id: '3',
    icon: 'target' as const,
    text: 'Достигнут уровень 12',
    timeAgo: '3 дня назад',
  },
];

export function HomePageContent() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white pb-20 pt-16">
      {/* Hero Section или Personal Welcome */}
      {isAuthenticated ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <UserSummary
            name="Анна Петрова"
            initials="АП"
            location="Паттайя, Таиланд"
            level={12}
            progress={75}
            pointsToNextLevel={335}
            stats={{
              points: 3450,
              nfts: 5,
              teamMembers: 7,
              vouchers: 2,
            }}
          />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <HeroSection
            primaryAction={
              <button
                onClick={() => router.push('/signup')}
                className="inline-flex items-center justify-center gap-2 bg-white text-sky-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Зарегистрироваться
                <ArrowRight size={18} />
              </button>
            }
            secondaryAction={
              <Button
                variant="ghost"
                size="lg"
                onClick={() => router.push('/atlas')}
              >
                Посмотреть контент
              </Button>
            }
          />
        </div>
      )}

      {/* Location Prompt - только для авторизованных */}
      {isAuthenticated && (
        <LocationPrompt
          onAllowLocation={() => console.log('Разрешить геолокацию')}
          onManualCity={() => console.log('Указать город вручную')}
        />
      )}

      {/* Rewards List - только для авторизованных */}
      {isAuthenticated && <RewardsList rewards={rewards} />}

      {/* Modules Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 md:mb-12">
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Модули экосистемы
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            Выберите модуль, чтобы начать исследование
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {modules.map((module) => (
            <ModuleTile
              key={module.href}
              module={module.module}
              icon={module.icon}
              title={module.title}
              description={module.description}
              locked={module.requiresAuth && !isAuthenticated}
              isPro={module.isPro}
              onClick={() => router.push(module.href)}
            />
          ))}
        </div>
      </section>

      {/* Popular Places Section */}
      <section className="bg-slate-50 py-8 md:py-12 mb-8 md:mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-4 md:mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Популярно сейчас
            </h2>
            <p className="text-sm md:text-base text-slate-600">
              Самые посещаемые места и контент
            </p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
            {popularPlaces.map((place, index) => (
              <CarouselItem
                key={index}
                image={place.image || '/images/placeholder.jpg'}
                title={place.name}
                subtitle={place.country}
                type={place.type}
                onClick={() => router.push(`/atlas?place=${place.name}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 md:mb-12">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              События этой недели
            </h2>
            <p className="text-sm md:text-base text-slate-600">
              Предстоящие мероприятия
            </p>
          </div>
          <Link
            href="/pulse"
            className="text-sm font-medium text-sky-600 hover:text-sky-700 hidden md:inline"
          >
            Смотреть все →
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
          {events.map((event, index) => (
            <CarouselItem
              key={index}
              image={event.image || '/images/placeholder.jpg'}
              title={event.title}
              subtitle={`${event.date}${event.location ? ` • ${event.location}` : ''}`}
              onClick={() => router.push(`/pulse?event=${event.title}`)}
            />
          ))}
        </div>
        <div className="text-center md:hidden mt-4">
          <Link
            href="/pulse"
            className="text-sm font-medium text-sky-600 hover:text-sky-700"
          >
            Смотреть все →
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-slate-50 py-8 md:py-12 mb-8 md:mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-4 md:mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Зачем вступать в экосистему Go2Asia?
            </h2>
            <p className="text-sm md:text-base text-slate-600">
              Больше чем просто информация о путешествиях — целая экосистема
              возможностей
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {benefits.map((benefit, index) => (
              <FeatureCard
                key={index}
                type={benefit.type}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                cta={benefit.cta}
                onClick={() => {
                  // TODO: Implement navigation based on benefit type
                  console.log(`Navigate to ${benefit.type}`);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner - только для неавторизованных */}
      {!isAuthenticated && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 md:mb-12">
          <CTABanner
            title="Присоединяйтесь к сообществу"
            description="Получите доступ ко всем возможностям экосистемы, зарабатывайте награды и находите единомышленников"
            primaryAction={
              <Button
                variant="primary"
                size="xl"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => router.push('/signup')}
              >
                Зарегистрироваться
              </Button>
            }
            secondaryAction={
              <Button
                variant="ghost"
                size="xl"
                onClick={() => router.push('/about')}
              >
                Узнать больше
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
}

