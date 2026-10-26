# La Fournée Martégale — site vitrine

Site vitrine statique (HTML / CSS / JS pur) pour une boulangerie artisanale à Martigues.
Aucune dépendance, aucun build, aucun cookie, aucune donnée collectée.

## Contenu

| Fichier | Rôle |
|---|---|
| `index.html` | Accueil : hero, arguments, incontournables, histoire, horaires, avis, CTA |
| `nos-pains.html` | Carte complète : pains, viennoiseries, pâtisseries, formules du midi |
| `savoir-faire.html` | Récit, les 6 étapes de fabrication, engagements, frise chronologique |
| `contact.html` | Adresse, horaires, itinéraire, formulaire de commande |
| `assets/css/style.css` | Charte graphique complète (variables CSS, responsive, thème clair/sombre par sections) |
| `assets/js/main.js` | Menu mobile, lien actif, animations au scroll, jour courant, formulaire |
| `assets/img/*.jpg` | Visuels générés (hero, pains, viennoiseries, boulanger) |

## Voir le site

```bash
cd /home/user/boulangerie
python3 -m http.server 8000 --bind 0.0.0.0
```

Puis ouvrez `http://localhost:8000`.

## Personnaliser

**Le nom de la boulangerie** — chercher / remplacer `La Fournée Martégale` dans les 4 fichiers HTML
(apparaît dans le logo, les titres `<title>`, les pieds de page et l'objet des mails).

**L'adresse, le téléphone et l'e-mail** — remplacer :
- `24, avenue Camille Pelletan` / `13500 Martigues`
- `04 42 80 12 34` (liens `tel:+33442801234`)
- `bonjour@lafourneemartegale.fr` et `commande@lafourneemartegale.fr` (la seconde est dans `assets/js/main.js`)

**Les horaires** — deux endroits : le tableau de `index.html` / `contact.html` (avec `data-day="..."` en minuscules,
ce qui permet au script de surligner le jour courant) et la liste du pied de page (identique sur les 4 pages).

**Les couleurs** — tout est dans `:root` au début de `assets/css/style.css` :
`--cream`, `--sand`, `--crust`, `--cocoa`, `--olive`.

**Les prix et produits** — blocs `.menu-item` dans `nos-pains.html`, faciles à dupliquer.

## Pour aller plus loin

- Remplacer la carte de `contact.html` par une vraie carte (iframe OpenStreetMap ou Google Maps).
- Brancher le formulaire sur un service type Formspree / Netlify Forms plutôt que sur un lien `mailto:`.
- Hébergement : dépôt statique sur GitHub Pages, Netlify, Vercel ou OVH (glisser-déposer du dossier).
