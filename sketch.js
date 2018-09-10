/**
 * Tracé de profil d'engrenage droit par développante de cercle
 * Dans cet exercice, on confond le cercle de base et le cercle de pied
 * (normalement un tracé de raccordement est à faire pour abaisser le creux en fonction du jeu)
 *
 * François Jarriges
 * Pôle Technologique - Lycée Jules Renard - Nevers
 *
 */

const LARG = 640, HAUT = 480; // Dimensions du cadre de tracé

/* Paramètres fondamentaux */
const Z = 20;     // Nombre de dents
const MODULE = 40;// Module de l'engrenage droit (1/10 mm)
const JEU = 3;    // Jeu (1/10 mm)
const ALPHA = 20; // Angle de pression (degrés)

/* Paramètres déduits */
let d_prim;       // Diamètre primitif (cercle rouge)
let pas_prim;     // Pas primitif
let saillie;      // Saillie (entre le cercle primitif et le cercle de tête)
let creux;        // Creux (entre le cercle de base et le cercle primitif)
let h_dent;       // Hauteur de dent
let e_dent;       // Epaisseur de dent (au cercle primitif)
let d_base;       // Diamètre de base
let d_tete;       // Diamètre de tête

/* Angle au point du profil de denture situé sur le cercle primitif par rapport au cercle de base */
let teta = 0; 

/* Fonction d'initialisation de la vue dans l'environnement P5.js */
function setup() {
  
  /* Calcul des paramètres déduits */
  d_prim = Z*MODULE;
  pas_prim = PI*MODULE;
  saillie = MODULE;
  creux = 1.25*MODULE;
  h_dent = creux + saillie;
  e_dent = (pas_prim - JEU)/2;
  d_base = d_prim - 2*creux;
  d_tete = d_prim + 2*saillie;
  
  /* Création du cadre de tracé */
  createCanvas(LARG, HAUT);

  /* Fond blanc - Figures non remplies (contour seul) */
  background ("white");
  noFill();
  
  /* Tracé en bleu des cercles de base et de tête */
  stroke ("blue");
  arc (0, 0, d_tete, d_tete, 0, HALF_PI, PIE);
  arc (0, 0, d_base, d_base, 0, HALF_PI, PIE);
  
  /* Tracé en vert du cercle primitif */
  stroke ("green");
  arc (0, 0, d_prim, d_prim, 0, HALF_PI, PIE);
  
  /* Tracé en rouge des profils de denture sur le quadrant */
  stroke ("red");
  
  /* Tracé des profils pour chaque dent sur le quart de cercle */
  for (n = 0; n <= Z/4; n++) {
    traceProfil (2*n*PI/Z, false);
    traceProfil (2*teta + (pas_prim - JEU)/d_prim + 2*n*PI/Z, true);
  }
}

/* Fonction de tracé */
function traceProfil(angleDepart, inverse) {
  let x , y;       // Coordonnées du point à tracer sur la développante de cercle
  let t = 0;       // Variable angulaire à partir de laquelle on calcul les coordonnées du point

  do { 
    /* l'incrément angulaire sur "t" est de 1/10 de degré */
    /* on le convertit en radians */
    let t_rad = t*PI/1800;

    /* Equation de la développante du cercle de base */
    if (inverse) t_rad *= -1;
      
    x = (d_base/2)*(cos(t_rad + angleDepart) + t_rad*sin(t_rad + angleDepart));
    y = (d_base/2)*(sin(t_rad + angleDepart) - t_rad*cos(t_rad + angleDepart));

    
    /* Tracé du point correspondant à cet angle */
    point(x, y);
    
    /* Mémorisation de l'angle au point du profil situé sur le cercle primitif */
    if ((angleDepart == 0) && (teta == 0) && (sq(x) + sq(y) >= sq(d_prim/2))) {
      teta = atan2(y, x);
      
      /* Tracé d'un rayon rouge matérialisant cet angle */
      line (0, 0, x, y);
    }
    
    /* Itération suivante par incrément angulaire de 1/10 degré */
    t++;

    /* Le tracé du profil s'arrête lorsque le cercle de tête est atteint */
  } while ( sq(x) + sq(y) <= sq (d_tete/2));
}