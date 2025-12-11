import type { Metadata } from 'next';
import { BlogClientWrapper } from './BlogClientWrapper';

export const metadata: Metadata = {
  title: 'Blog Asia - Статьи и истории | Go2Asia',
  description: 'Медиа-площадка Go2Asia: редакционные материалы, UGC-статьи, тематические подборки и спецпроекты о жизни в Юго-Восточной Азии',
};

export default function BlogPage() {
  return <BlogClientWrapper />;
}
