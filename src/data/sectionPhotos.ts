import photo15 from '@/assets/photo-15.jpg';
import photo38 from '@/assets/photo-38.jpg';
import photo34 from '@/assets/photo-34.jpg';
import photo37 from '@/assets/photo-37.jpg';
import photo52 from '@/assets/photo-52.jpg';
import photo53 from '@/assets/photo-53.jpg';
import photo54 from '@/assets/photo-54.jpg';
import photo1 from '@/assets/photo-1.jpg';
import photo12 from '@/assets/photo-12.jpg';
import photo16 from '@/assets/photo-16.jpg';
import photo33 from '@/assets/photo-33.jpg';
import photo31 from '@/assets/photo-31.jpg';
import photo26 from '@/assets/photo-26.jpg';
import photo29 from '@/assets/photo-29.jpg';
import photo19 from '@/assets/photo-19.jpg';
import photo21 from '@/assets/photo-21.jpg';
import gallery6 from '@/assets/gallery-6.jpg';
import gallery7 from '@/assets/gallery-7.jpg';
import photo40 from '@/assets/photo-40.jpg';

/**
 * Photos par section d'activité — partagé entre Activity (carrousels
 * desktop + module mobile) et Activity 2 (module des 4 activités).
 *
 * Clés = ids des sections i18n ('nights' = Tournage, renommé 30/09 —
 * l'id code reste 'nights', voir LanguageContext).
 * null = emplacement vide en attente de photos client.
 */
export const sectionPhotos: Record<string, (string | null)[]> = {
  brands: [photo15, photo38, photo34, photo37, photo52, photo53, photo54],
  festivals: [photo1, photo12, photo16],
  nights: [null, null, null],
  listening: [photo33, photo31, photo26, photo29, photo19, photo21, gallery6, gallery7, photo40],
};
