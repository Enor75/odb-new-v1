// ─────────────────────────────────────────────────────────────────
// MARQUES PARTENAIRES / PARTNER BRANDS — section "They trust us"
//
// 15 marques avec logo (PNG transparent, recolorisé crème — voir
// src/assets/logos/) :
//   UGG, Dr. Martens, Nike, Salomon, Super Bock, Netflix,
//   Block Party, Halfpipe Records, Hors Sol, Loophole, Like Fire,
//   Dissidence Production, Provoke Lab, Dock B, 6B Paris
//
// 2 structures en wordmark typographique (logos officiels pas encore
// récupérables en ligne) :
//   Urban Outfighter, Vibrason
// ─────────────────────────────────────────────────────────────────

export interface Partner {
  name: string;
  /** Slug du fichier logo dans src/assets/logos/ (optionnel) */
  logo?: string;
  /** Style du wordmark (uniquement sans logo) */
  className?: string;
  /** Classes de taille de l'image (remplace le défaut max-h-10 md:max-h-12) */
  imgClass?: string;
}

export const partners: Partner[] = [
  { name: 'UGG', logo: 'ugg' },
  { name: 'Dr. Martens', logo: 'dr-martens' },
  { name: 'Nike', logo: 'nike', imgClass: 'max-h-7 md:max-h-8' },
  { name: 'Salomon', logo: 'salomon' },
  { name: 'Super Bock', logo: 'super-bock', imgClass: 'max-h-14 md:max-h-16' },
  { name: 'Urban Outfighter', className: 'font-semibold tracking-tight text-lg' },
  { name: 'Netflix', logo: 'netflix', imgClass: 'max-h-7 md:max-h-8' },
  { name: 'Block Party', logo: 'block-party', imgClass: 'max-h-16 md:max-h-[4.5rem]' },
  { name: 'Halfpipe Records', logo: 'halfpipe-records' },
  { name: 'Hors Sol', logo: 'hors-sol' },
  { name: 'Vibrason', className: 'font-serif text-2xl md:text-3xl font-light' },
  { name: 'Loophole', logo: 'loophole', imgClass: 'max-h-14 md:max-h-16' },
  { name: 'Like Fire', logo: 'like-fire', imgClass: 'max-h-8 md:max-h-9' },
  { name: 'Dissidence Production', logo: 'dissidence' },
  { name: 'Provoke Lab', logo: 'provoke-lab', imgClass: 'max-h-8 md:max-h-9' },
  { name: 'Dock B', logo: 'dock-b', imgClass: 'max-h-14 md:max-h-16' },
  { name: '6B Paris', logo: '6b-paris' },
];
