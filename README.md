# Ritesh — Portfolio

A premium, heavily-animated single-page portfolio for a UI/UX & Web Designer.
Dark editorial theme with huge display typography, inspired by modern agency sites.

## ✨ Features

- **Animated preloader** with counting number
- **Custom blend-mode cursor** with hover expansion
- **Staggered reveal animations** on scroll (IntersectionObserver)
- **Hero display type** that slides up on load + parallax on scroll
- **Animated stat counters** (years / projects / clients)
- **Infinite marquee** strip
- **3D tilt** on hero & about photos
- **Scroll progress bar** and sticky blur navbar
- Fully **responsive** and respects `prefers-reduced-motion`

## 🚀 Run it

No build step — it's plain HTML/CSS/JS. Just open `index.html`, or serve locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 🖼 Add your images

Put your screenshots in the `assets/` folder using the filenames listed in
[`assets/README.md`](assets/README.md). Until then, styled placeholders show.

## 🎨 Customize

- Text/content: edit `index.html`
- Colors & type: CSS variables at the top of `styles.css` (`--red`, `--cream`, `--bg`, fonts)
- Animation timing: `styles.css` (`--ease`) and `script.js`

## 📂 Structure

```
index.html      Markup & content
styles.css      Theme, layout, animations
script.js       Loader, cursor, reveals, counters, tilt
assets/         Your images
```
