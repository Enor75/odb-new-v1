import noiseTexture from '@/assets/noise.webp';

/**
 * GRAIN ANIMÉ (21/09) — technique extraite de newformcap.com (la partie
 * texturée qui apparaît à l'ouverture du menu) :
 *
 *  · un calque de texture de bruit (noise.webp, 256px tuilée) PLUS GRAND
 *    que son conteneur (top/left −10rem, +20rem) pour que le déplacement
 *    ne montre jamais les bords ;
 *  · le calque est déplacé par PALIERS — @keyframes odb-grain en
 *    steps(6), 0.3s, boucle infinie (le steps() donne la vibration
 *    « pellicule », pas d'interpolation douce) ;
 *  · opacité 0.6 par défaut, pointer-events:none.
 *
 * Utilisation (une ligne, s'installe dans n'importe quel conteneur
 * positionné — panel, overlay, menu, hero…) :
 *
 *   <div className="relative …">
 *     …contenu…
 *     <GrainOverlay />
 *   </div>
 *
 * Props : opacity (0.6 défaut) · tileSize ('15%' défaut) · className.
 * Compat Lovable : CSS pur + composant, zéro dépendance.
 * prefers-reduced-motion : animation coupée (voir index.css).
 */
const GrainOverlay = ({
  opacity = 0.6,
  tileSize = '15%',
  className = '',
}: {
  opacity?: number;
  tileSize?: string;
  className?: string;
}) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none absolute inset-0 z-10 overflow-hidden ${className}`}
    style={{ opacity }}
  >
    <div
      className="odb-grain absolute"
      style={{ backgroundImage: `url(${noiseTexture})`, backgroundSize: tileSize }}
    />
  </div>
);

export default GrainOverlay;
