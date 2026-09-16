import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import usePageMeta from '@/hooks/usePageMeta';

const NotFound = () => {
  const { t } = useLanguage();
  usePageMeta(t.meta.notFoundTitle);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
        {t.notFound.code}
      </p>
      <h1 className="font-serif text-4xl font-light tracking-tight md:text-6xl">
        {t.notFound.text}
      </h1>
      <Link
        to="/"
        className="mt-10 text-[11px] uppercase tracking-[0.25em] text-foreground/70 transition-colors duration-300 hover:text-primary"
      >
        {t.notFound.back}
      </Link>
    </main>
  );
};

export default NotFound;
