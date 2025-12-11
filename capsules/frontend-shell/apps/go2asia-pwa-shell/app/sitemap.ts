import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://go2asia.space';
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.go2asia.space';
  
  // Получить данные из API
  const countries = await fetch(`${apiUrl}/v1/api/content/countries`)
    .then((res) => res.json())
    .then((data) => data.items || [])
    .catch(() => []);
  
  const articles = await fetch(`${apiUrl}/v1/api/content/articles`)
    .then((res) => res.json())
    .then((data) => data.items || [])
    .catch(() => []);
  
  // Статические страницы
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/atlas`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pulse`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.8,
    },
  ];
  
  // Страны
  const countryPages: MetadataRoute.Sitemap = countries.map((country: any) => ({
    url: `${baseUrl}/atlas/countries/${country.id}`,
    lastModified: country.updatedAt ? new Date(country.updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
  
  // Статьи
  const articlePages: MetadataRoute.Sitemap = articles.map((article: any) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: article.publishedAt ? new Date(article.publishedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  
  return [...staticPages, ...countryPages, ...articlePages];
}

