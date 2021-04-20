# svg-based-bigheads
Jedná se o alternativní přepracovanou verzi projektu/knihovny https://bigheads.io/. Jednotlivé části jsou vlastně samostatné soubory `svg`, které se zpracují pomocí `gulp`u.
Tak se vytvoří výsledný soubor [`bigheads.svg`](./dist/client/bigheads.svg) s pojmenovanými oblastmi – výsledný avatar lze tedy vytvořit čistě v *HTML* (například):
```html
<svg viewBox="0 0 1000 990">
  <use xlink:href="dist/client/bigheads.svg#hair-mohawk-top"></use>
  <use xlink:href="dist/client/bigheads.svg#base-base"></use>
  …
  <use xlink:href="dist/client/bigheads.svg#glasses-pincenez"></use>
</svg>
```
<svg viewBox="0 0 1000 990"><use xlink:href="dist/client/bigheads.svg#hair-mohawk-top"></use><use xlink:href="dist/client/bigheads.svg#base-base"></use><use xlink:href="dist/client/bigheads.svg#eyes-semiround"></use><use xlink:href="dist/client/bigheads.svg#clothes-tshirt"></use><use xlink:href="dist/client/bigheads.svg#eyebrow-angry"></use><use xlink:href="dist/client/bigheads.svg#hair-mohawk-front"></use><use xlink:href="dist/client/bigheads.svg#mouth-open"></use><use xlink:href="dist/client/bigheads.svg#glasses-pincenez"></use></svg>

## Client-side

### Client-side example
See [preview](https://refined-github-html-preview.kidonng.workers.dev/IndigoMultimediaTeam/svg-based-bigheads/raw/dev-1.0.Sx/dist/client-example/index.html) (sources in [./bin/client-example](./dist/client-example/))