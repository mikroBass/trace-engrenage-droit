# trace-engrenage-droit

## Introduction

On se propose de réaliser, à l'aide des fonctions graphiques de la bibliothèque P5.js, la conception et la visualisation de profils d'engrenages droits classiques, dits en "développante de cercle".

[L'article de Wikipédia sur ce sujet](https://fr.wikipedia.org/wiki/Développante_du_cercle) est une bonne introduction.

Pour aller un peu plus loin, voir cet article sur [Zpag](http://www.zpag.net/Machines_Simples/engrenage_droit_dent_droit.htm).

Les notions de base relatives aux engrenages sont (indispensable pour utiliser un progiciel de CAO dans ses fonctions de modélisation automatique) :

- rapport, nombre de dents
- module
- jeu
- angle de pression
- cercle de pied
- cercle de base
- cercle primitif
- cercle de tête
- pas primitif
- pas de base
- creux
- saillie
- épaisseur de dent

Pour ce tracé de profil d'engrenage droit par développante de cercle, on confond le cercle de base et le cercle de pied
(normalement un tracé de raccordement est à faire pour abaisser le creux en fonction du jeu).

## Tracé de la développante de cercle du profil de la première dent

Pour le cercle de base centré en l'origine et de rayon R_base, la développante issue du point M(0) placé sur ce cercle de base à l'angle de départ 0, peut être paramétrée pour tout point M(t) de cette développante, en calculant ses coordonnées cartésiennes à partir de l'angle t :

`x(t)=R_base.(cos (t) + t.sin (t))`

`y(t)=R_base.(sin (t) - t.cos (t))`

où l'angle t entre OM(0) et OM(t) est exprimé en radians.

![Schéma de principe du tracé de profil d'engrenage en développante de cercle](img/SchemaConstructProfilDent.png)

