import { useEffect } from 'react';

/**
 * Métadonnées par page (E4) — titre d'onglet + meta description,
 * mis à jour au changement de langue (dépendances title/description).
 * Usage : usePageMeta(t.meta.galleryTitle, t.meta.galleryDesc);
 */
const usePageMeta = (title: string, description?: string) => {
  useEffect(() => {
    document.title = title;

    if (description) {
      let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }
  }, [title, description]);
};

export default usePageMeta;
