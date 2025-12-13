import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Добро пожаловать в Go2Asia
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Цифровая экосистема для жизни, путешествий и бизнеса в Юго-Восточной Азии
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-in"
              className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition-colors"
            >
              Войти
            </Link>
            <Link
              href="/sign-up"
              className="px-6 py-3 bg-white text-sky-600 border-2 border-sky-600 rounded-lg font-medium hover:bg-sky-50 transition-colors"
            >
              Регистрация
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ModuleCard title="Atlas Asia" description="Энциклопедия мест" href="/atlas" />
          <ModuleCard title="Pulse Asia" description="События и афиша" href="/pulse" />
          <ModuleCard title="Blog Asia" description="Статьи и гайды" href="/blog" />
          <ModuleCard title="Guru Nearby" description="Объекты на карте" href="/guru" />
          <ModuleCard title="Quest Asia" description="Квесты и миссии" href="/quest" />
          <ModuleCard title="Russian Friendly" description="Каталог партнёров" href="/rf" />
        </div>
      </div>
    </div>
  );
}

function ModuleCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}


