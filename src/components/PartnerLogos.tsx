import { partners } from '@/config/partners';
import uggLogo from '@/assets/logos/ugg.png';
import drMartensLogo from '@/assets/logos/dr-martens.png';
import nikeLogo from '@/assets/logos/nike.png';
import salomonLogo from '@/assets/logos/salomon.png';
import superBockLogo from '@/assets/logos/super-bock.png';
import netflixLogo from '@/assets/logos/netflix.png';
import blockPartyLogo from '@/assets/logos/block-party.png';
import halfpipeRecordsLogo from '@/assets/logos/halfpipe-records.png';
import horsSolLogo from '@/assets/logos/hors-sol.png';
import loopholeLogo from '@/assets/logos/loophole.png';
import likeFireLogo from '@/assets/logos/like-fire.png';
import dissidenceLogo from '@/assets/logos/dissidence.png';
import provokeLabLogo from '@/assets/logos/provoke-lab.png';
import dockBLogo from '@/assets/logos/dock-b.png';
import sixBParisLogo from '@/assets/logos/6b-paris.png';

/** slug → fichier logo importé (Vite exige des imports statiques) */
const logoFiles: Record<string, string> = {
  ugg: uggLogo,
  'dr-martens': drMartensLogo,
  nike: nikeLogo,
  salomon: salomonLogo,
  'super-bock': superBockLogo,
  netflix: netflixLogo,
  'block-party': blockPartyLogo,
  'halfpipe-records': halfpipeRecordsLogo,
  'hors-sol': horsSolLogo,
  loophole: loopholeLogo,
  'like-fire': likeFireLogo,
  dissidence: dissidenceLogo,
  'provoke-lab': provokeLabLogo,
  'dock-b': dockBLogo,
  '6b-paris': sixBParisLogo,
};

/**
 * Mur de logos partenaires — style hstories.fr :
 * monochrome crème, discret au repos, s'illumine au survol.
 * Les logos sont des PNG transparents déjà recolorisés en crème.
 */
const PartnerLogos = () => (
  <div className="grid grid-cols-2 items-center gap-x-6 gap-y-12 sm:grid-cols-3 md:grid-cols-4 md:gap-y-16 lg:grid-cols-6">
    {partners.map((partner) => (
      <div
        key={partner.name}
        title={partner.name}
        className="flex h-16 items-center justify-center text-center md:h-20"
      >
        {partner.logo && logoFiles[partner.logo] ? (
          <img
            src={logoFiles[partner.logo]}
            alt={partner.name}
            className={`w-auto max-w-[150px] object-contain opacity-40 transition-opacity duration-300 hover:opacity-90 ${partner.imgClass ?? 'max-h-10 md:max-h-12'}`}
          />
        ) : (
          <span
            className={`leading-none text-foreground/40 transition-colors duration-300 hover:text-foreground/85 ${partner.className ?? ''}`}
          >
            {partner.name}
          </span>
        )}
      </div>
    ))}
  </div>
);

export default PartnerLogos;
