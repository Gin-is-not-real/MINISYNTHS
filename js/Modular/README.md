## Modular    *need to be updated*
Nodes:  
- 1 osc
- 1 gain master

Controles:
- gain osc
- frequence osc
- master

Affichage:
- affichage de la frequence

### Direction
- Des modules connectables
    - Entrées Sorties ?

- Un css flexible
    - pouvoir changer facilement l'apparence sans casser la structure

### VerticalRangeControl 
**constructor()**
- attach shadowDOM
- Create element div container
- Create HTMLstring template
- Create HTMLstring style
- container insert template
- container inert style
- shadowDOM append container

**Avantages et Inconvenients**
(+) template html clair

(-) HTMLString du style trés longue
(-) Edition du style compliquée

### RangeControl 
*Le style n'est plus écrit dans le constructor, les components stockent une liste d'url de fichier à importer*

cssImportList {Array string}

**constructor()**
- cssImportList = [css urls];
- Create element div container
- Create HTMLstring template
- shadowDOM append container

**main**
*le shadow DOM est attaché a root*
*Un element style d'id 'shadow-css-imports' est crée et append dans le shadow*
*Une fonction insertCssImports(componentList) boucle sur les url de cssImportList de chaque component et écrit l'import dans le innerHTML de shadow-css-imports*  

**Avantages et Inconvenients**
(+) template html clair
(+) Importe seulement le css necessaire

