# svg-based-bigheads
Jedná se o alternativní přepracovanou verzi projektu/knihovny https://bigheads.io/. Jednotlivé části jsou vlastně samostatné soubory [`svg`](src/svgs/bigheads-parts/), které se zpracují pomocí `gulp`u.
Tak se vytvoří výsledný soubor [`bigheads.svg`](./dist/client/bigheads.svg) s pojmenovanými oblastmi – výsledný avatar lze tedy vytvořit čistě v *HTML* (například):
```html
<svg viewBox="0 0 1000 990">
  <use xlink:href="dist/client/bigheads.svg#hair-mohawk-top"></use>
  <use xlink:href="dist/client/bigheads.svg#base-base"></use>
  …
  <use xlink:href="dist/client/bigheads.svg#glasses-pincenez"></use>
</svg>
```
Pro lepší použitelnost tato knihovna mimojiné nabízí také dvě webové komponenty [SVGBigHeadsElement](docs/bigheads-module.md#SVGBigHeadsElement) a [SVGBigHeadsPartElement](docs/bigheads-module.md#SVGBigHeadsPartElement).

## Aktuální stav
Idea generování avatarů by měla být již finální. Klientská část je taktéž finální, s výhradou, že ještě může docházet ke změnám API. Stojí na podpoře **Web komponent a css proměnných (navíc uvnitř SVG souborů)**.
Přibude ještě serverová část složená z kombinace PHP a JS. Tedy JS části by (asi?) měli sdílet nějaké vlastnosti.

## Plánované verze
- [x] *1.0*: Publikace použitelné knihovny
- [x] *1.1*: Dodělávky (první verze textů dokumentace/nápověd a příkladů)
- [ ] *1.5*: Ideálně dodělání dokumentace/příkladů apod. Náčrt serverové části (sjednocení API na klientovi)
- [ ] *2.0*: LTS verze (dokončení *1.5* + EN texty)

## Rozcestník
- [Struktura avatara z pohledu grafika](docs/svgs.cs.md)
- [Úprava avatara z pohledu grafika](docs/svgs_edit.cs.md)
- [Použití na klientovi](#client-side)
- Použití na serveru
- [Správa repozitáře](#technical-bg)

## Client-side
Lze použít knihovny ve složce [dist/client](dist/client). Soubory `*-module(.min).js` odpovídají [JS modulům](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), případně lze použít *bundle* verzi či *namespace* (`const SVGBigHeads= (function SVGBigHeads_iief(){…})();`). Vzhledem k rezignaci web komponent je vhodné použít script před jejich použitím (typicky umístit do hlavičky).

Vzhledem k přibaleným web komponentám stačí v HTML použít tagy `<svg-bigheads …>` či `<svg-bigheads-part type="…" value="…">`:
```html
<svg-bigheads href="dist/client/bigheads.svg" hair="mohawk" glasses="pincenez">
<svg-bigheads-part href="dist/client/bigheads.svg" type="glasses" value="pincenez">
```
… možnosti (typy) *‚hair, glasses, …’* odpovídají složkám (svg vrstvám) v [src/svgs/](src/svgs/) (a vl. také generovanému [parts.json](src/svgs/parts.json) – klíč **parts**).
Možné hodnoty pak jednotlivým souborům, přesněji viz klíč **parts** v automaticky generovaném souboru [parts.json](src/svgs/parts.json).
Web komponenty lze samozřejmě použít i v JavaScriptu v jakémkoliv framevorku/knihovně či přímo nativně:
```js
document.body.appendChild(
  Object.assign(
    document.createElement("svg-bigheads"),
    { href: "dist/client/bigheads.svg", hair: "mohawk", glasses: "pincenez" }
  )
);
document.body.appendChild(
  Object.assign(
    document.createElement("svg-bigheads-part"),
    { href: "dist/client/bigheads.svg", type: "glasses", value: "pincenez" }
  )
);
```

Dokumentace k nalezení v [docs/bigheads-module.md](docs/bigheads-module.md). Za vypíchnutí stojí:
- [colors](docs/bigheads-module.md#colors): objekt obsahující vrstvy s dynamickými barvami vč. defaultních hodnot – barva se aplikuje nastavením css proměnné `--bigheads-color-*`
- [parts_dictionary](docs/bigheads-module.md#parts_dictionary): objekt obsahující všehny vrstvy a možné hodnoty

[Ukázka použití (editor avatara)](https://refined-github-html-preview.kidonng.workers.dev/IndigoMultimediaTeam/svg-based-bigheads/raw/master/dist/client-example/index.html) (zdrojové soubory [./bin/client-example](./dist/client-example/)).

## Technical BG
Repozitář naklonujte jak jste zvyklí, poté stačí použít `npm install` a `gulp` (alternativně `npm run gulp`). Sekvence úkolů se provádí dle [package.json](package.json) (klíč `sequence`), položka začínající `!` se přeskakuje.

Konkrétní `gulp` tasky jsou k nalezení v [gulp/tasks/](gulp/tasks/).