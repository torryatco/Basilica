# Basilica!

## Homework

## Reading

- See how far you can get in [Grid Garden](http://cssgridgarden.com/)
- MDN on [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)

## Initialize a GIT Repo and .gitignore

```sh
$ git init
$ git add .
$ git commit -m 'initial commit'
```

Create a branch:

```sh
$ git branch inclass
$ git checkout inclass
$ touch .gitignore // edit to include 'node_modules'
```

Create a branch in VS Code and merge it back into another.

Log into [Github](http://github.com) and create a new repo.

Follow the instructions to create a remote and push the master branch and inclass branch to the remote.

## NPM

- Create a manifest (package.json)
- Install a package
- set up a gitignore

```bash
$ npm init
$ npm install browser-sync sass --save-dev
```

Note:

- sass
- package.json
- package-lock.json
- dependencies
- node_modules folder
- why the need for `.gitignore`?

Browser Sync [CLI documentation](https://www.browsersync.io/docs/command-line)

```js
"scripts": {
  "start": "browser-sync start --directory --server 'app' --files 'app'",
},
```

Remember, if the repo comes with a package.json file (aka 'manifest') run `npm install` to install.

In the terminal:

`$ npm run start`

## Basilica

![Image of Basilica](other/FINAL.png)

Open `app/index.html` in VS Code and examine the HTML with regards to the [recipe schema](https://schema.org/Recipe) at [schema.org](http://schema.org/docs/gs.html).

Here is an [article that addresses the recipe schemas](https://www.foodbloggerpro.com/blog/article/what-is-recipe-schema/) but note that there are [many different kinds](https://schema.org/docs/full.html).

Have a look at a sample [recipe](https://www.allrecipes.com/recipe/20144/banana-banana-bread/) and note the schema in the inspector.

Note the `<abbr>` tag and the absence of a wrapper div (even though the design shows a centered document).

### Starter CSS

Examine the starter CSS. Note the use of `max-width` on the body selector - we applied these to a div in the past.

Note `li > h4` selector. It is used to select elements with a _specific parent_. In this case it will select `h4` tags _only_ when they are proceeded by an `li`.

Here's a [complete listing](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference#Combinators) of selector types in CSS. 


Note the [css variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*):

```css
html {
  --basil-green: #88a308;
  --dark-gray: #333333;
  --light-gray: #e4e1d1;
  --light-green: #f5faef;
  --orange: #f90;
  --light-orange: #ebbd4e;
  --red: #f00;
  --max-width: 840px;
  --breakpoint: 640px;
}
```

CSS variables are applied as follows:

```css
<property>: var(--<variable-name>);
```

Note also: the transition property on the anchor selector. This is a shortcut for:

```css
transition-property: color;
transition-duration: 1s;
transition-timing-function: linear;
```

or `transition: color 0.2s linear;`

Confine this effect to anchors within the content div. Replace the generic hover with:

```css
.content a:hover {
  color: var(--basil-green);
}
```

## Responsive Images

[Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) are a critical component of responsive design:

```css
img {
  width: 100%;
  height: auto;
}
```

You should always use `width: 100%` on images (and videos). 

Replace the lone img tag in the HTML with `figure` and `figcaption` tags:

```html
<figure>
  <img src="img/pesto.jpg" alt="Italian pesto" />
  <figcaption>
    Classic, simple basil pesto recipe with fresh basil leaves, pine nuts,
    garlic, Romano or Parmesan cheese, extra virgin olive oil, and salt and
    pepper.
  </figcaption>
</figure>
```

A `<figure>` an image, illustration, or diagram that is referenced in the main flow of a document, but that can be moved to another part of the document without affecting the main flow.

We want to display identical image content, just larger or smaller depending on the device. The standard `<img>` element only lets you point the browser to a single source file. We will use two new attributes — `srcset` and `sizes` — to provide additional source images along with hints to help the browser pick the right one.

- Upload `pesto.jpg` to a generator such as [responsivebreakpoints.com](https://www.responsivebreakpoints.com/). Download the zip file and place the unzipped folder in the `img` directory.

Replace the `img` tag in index.html with the following:

```html
<picture>
  <img
    sizes=" 
    (max-width: 320px) 380px,
    (max-width: 768px) 740px,
    (max-width: 1024px) 980px, 
    (max-width: 1280px) 100vw, 1280px"
    srcset="
      img/pesto/pesto_iodywc_c_scale,w_380.jpg   380w,
      img/pesto/pesto_iodywc_c_scale,w_780.jpg   780w,
      img/pesto/pesto_iodywc_c_scale,w_1069.jpg 1069w,
      img/pesto/pesto_iodywc_c_scale,w_1337.jpg 1337w,
      img/pesto/pesto_iodywc_c_scale,w_1380.jpg 1380w
    "
    src="img/pesto/pesto_iodywc_c_scale,w_1380.jpg"
    alt="Italian pesto"
  />
</picture>
```

`srcset` defines the set of images we will allow the browser to choose between, and what size each image is.

It consists of:

1. Am image path / filename
2. A space
3. The image's inherent width (real size) in pixels using a `w` unit (not `px`).

`sizes` defines a set of media conditions (e.g. screen widths) and indicates what image size would be best to choose, when certain media conditions are true. In this case, before each comma we write:

1. A media condition `(max-width:480px)` - here "when the viewport width is 480 pixels or less"
1. A space
1. The width of the slot the image will fill when the media condition is true (440px.). You can get this from the inspector by inspecting the image at a variety of screen widths.

The browser ignores everything after the first matching condition, so be careful how you order the media conditions.

With these attributes in place, the browser will:

1. Look at its device width.
1. Work out which media condition in the sizes list is the first one to be true.
1. Look at the slot size given to that media query.
1. Load the image referenced in the `srcset` list that most closely matches the chosen slot size.

Using this technique can save a lot of bandwidth. Older browsers that don't support these features will just ignore them, and go ahead and load the image referenced in the `src` attribute.

You can check the results of your work by viewing the Network tab in the inspector and noting which image was downloaded at a variety of screen sizes.

The `<picture>` tag can be used for cropping or modifying images for different media conditions _or_ offering different image formats when certain formats are not supported by all browsers. See the [example](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) on MDN.

<!-- Aside: If we try to use a variable as a breakpoint value it won't work:

```css
@media (min-width: var(--breakpoint)) {
  ...
}
``` -->

<!-- A media query is not an element selector, it does not inherit styles. -->

## Flex Layout

The two column view applies only to widescreen.

<!-- change the column widths, add column effect via css: -->

We will make the article and aside run side by side by applying flex to their parent container within a mobile first breakpoint:

```css
@media (min-width: 640px) {
  .content {
    display: flex;
  }
}
```

We can use the flex property on the flex children to manipulate the columns:

```css
@media (min-width: 640px) {
  .content {
    display: flex;
  }
  article {
    flex: 1 0 60%;
  }
}
```

The [flex property](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) is used on flex children only. We are using a shortcut here which includes `flex-grow, flex-shrink, and flex-basis`. Default is `Default is 0 1 auto`.

Here is the long form:

```css
article {
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 60%;
}
```

And use a background color and box-shadow to color the aside:

```css
@media (min-width: 640px) {
  .content {
    display: flex;
  }
  article {
    flex: 1 0 60%;
  }
  aside {
    background: var(--light-green);
    box-shadow: -4px 0px 4px #ddd;
  }
}
```

Add some padding to the two coluns outside the media query so it applies to both large and small screens:

```css
article,
aside {
  padding: 1rem;
}
```

Format the footer;

```css
footer {
  background-color: var(--basil-green);
  padding: 1rem;
  border-radius: 0 0 4px 4px;
  margin-bottom: 2rem;
}
```

<!-- Create a box sizing CSS rule for all the boxes. See [Paul Irish](https://www.paulirish.com/2012/box-sizing-border-box-ftw/) on box-sizing.

```css
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
``` -->

### Review: Pseudo-elements vs Pseudo-classes

```txt
Pseudo-elements:    Pseudo-classes:
::first-letter      :hover
::first-line        :visited
::before            :link
::after             :active
::selection         :target
                    :focus
```

Some [ideas](https://css-tricks.com/pseudo-element-roundup/) for using pseudo-elements.

e.g.: Selected text:

```css
::selection {
  background: var(--basil-green);
  color: #fff;
}
```

## The Branding Header

Add the green background to the branding div.

```css
header {
  height: 120px;
  background: var(--basil-green);
  border-radius: 8px 8px 0px 0px;
}
```

Note: this is one of the rare occasions that we will use the height property. We use it here because the header does not contain dynamic content.

Add the custom font (top of the css file):

```css
@import url(futura/stylesheet.css);
```

Note - To convert fonts to web formats see [Font Squirrel](https://www.fontsquirrel.com/tools/webfont-generator). This requires an additional call to the server to fetch the additional css when the browser renders the file.

```css
header h1 {
  background: url(img/basil.png) no-repeat;
  font-family: FuturaStdLight, sans-serif;
  font-weight: normal;
  color: #fff;
  font-size: 5rem;
}
```

Note: when using custom fonts like this `font-weight: normal;` is necessary because normally header tags like h1 are bold and we do not have a bold version of the font here.

The background image is 272px by 170px.

Since background images fill the container we can manipulate it using padding:

```css
header h1 {
  padding-left: 260px;
  padding-top: 90px;
  ...;
}
```

We cannot see the text because we have added padding. Use transform to tweak the positioning:

```css
header h1 {
  transform: translateX(-100px);
  transform: translateY(-80px);
  ...;
}
```

Note the transform in the inspector - there is an error.

We have to use this format:

```css
header h1 {
  transform: translate(-100px, -80px);
  ...;
}
```

Note: transforms are an [important property](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transforms), especially when it comes to creating animations. We'll create an example now.

Note the beta link in the header:

```html
<header>
  <h1>Basilica!</h1>
  <a class="beta" href="#">Beta</a>
</header>
```

Absolutely position the beta element (we can do this in the context of the header because we apply `position: relative` to it earlier).

```css
header a.beta {
  background: url('img/burst.svg') no-repeat;
  color: #fff;
  font-size: 1.5rem;
  position: absolute;
  top: -20px;
  right: 10px;
  width: 85px;
  height: 85px;
  line-height: 85px;
  text-align: center;
  text-transform: uppercase;
}
```

Note: the use of svg for the background image. Examine the svg in the editor.

Note: the use of line-height to set the leading to the same height as the containing element. This allows the text to vertically center.

Note the use of position absolute. We will give this element a positioning context by applying position absolute to its containing element:

```css
header {
  position: relative;
  ...
}
```

Add a hover, transform and animate:

```css
header a.beta {
  transform: rotate(20deg);
  transition: all 1s ease;
  ...
}
```

```css
header a.beta:hover {
  transform: rotate(0deg) scale(1.2);
}
```

### Header: Responsive Design

Examine the site for problems in a narrow browser.

Since we are attempting a mobile first design let's edit the css to display for small screen first:

```css
header h1 {
  background: url(img/basil.png) no-repeat;
  font-family: FuturaStdLight, sans-serif;
  font-weight: normal;
  color: #fff;
  font-size: 5rem;
}
```

And add features for the large screen within a media query:

```css
@media (min-width: 640px) {
  header h1 {
    padding-left: 240px;
    padding-top: 90px;
    transform: translate(-100px, -80px);
    background-position: top left;
  }
  ...
}
```

Additional tweaks for the small screen might include:

- Removing the body margin top (and adding it back for the wide screen):
  
```css
body {
  font: 100%/1.5 'Segoe UI', Candara, 'Bitstream Vera Sans', 'DejaVu Sans',
    'Bitstream Vera Sans', 'Trebuchet MS', Verdana, 'Verdana Ref', sans-serif;
  color: var(--dark-gray);
  max-width: var(--max-width);
  /* margin: 0 auto;
  margin-top: 24px; */
}
```

```css
@media (min-width: 640px) {
  body {
    margin: 0 auto;
    margin-top: 24px;
  }
  ...
}
```

- Removing the rounded corners on small screen (and adding it back on wide screens):

```css
header {
  position: relative;
  height: 120px;
  background: var(--basil-green);
  /* border-radius: 8px 8px 0px 0px; */
}
```

```css
@media (min-width: 640px) {
  header {
    border-radius: 8px 8px 0px 0px;
  }
  ...
}
```

Remember: there is no hover in touch screen devices.

## Navigation 

Add the code below one rule at a time:

```css
nav {
  background: var(--light-gray);
  border-top: 0.5rem solid var(--light-orange);
  padding: 0.5rem;
  display: flex;
  align-items: center;
}

nav ul {
  display: flex;
}

nav li {
  list-style: none;
  margin-right: 0.5rem;
}

nav p {
  margin-right: auto;
}
```

Note the margin-right property on the paragraph and the effect it has on the positioning on the navigation links.

Remove it and add `justify-content` to the flex parent:

```css
nav {
  justify-content: space-between;
  flex-wrap: wrap;
  ... 
}
/* nav p {
  margin-right: auto; 
} */
```

Note: the flex-wrap property allows the paragraph to stack on small screens.

### Button and Gradients

```css
nav a {
  text-align: center;
  font-size: 1.5rem;
  padding: 8px;
  color: #fff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  border-radius: 6px;
}
```

The [gradients](http://www.colorzilla.com/gradient-editor/) for the buttons:

```css
.nav-storeit a {
  background: linear-gradient(to bottom, #fcde41 1%, #dfa910 100%);
}

.nav-storeit a:hover {
  background: linear-gradient(to bottom, #dfa910 0%, #fcde41 100%);
}

.nav-pickit a {
  background: linear-gradient(to bottom, #abc841 0%, #6b861e 100%);
}

.nav-pickit a:hover {
  background: linear-gradient(to bottom, #6b861e 1%, #abc841 100%);
}

.nav-cookit a {
  background: linear-gradient(to bottom, #6f89c7 0%, #344e8b 100%);
}

.nav-cookit a:hover {
  background: linear-gradient(to bottom, #344e8b 1%, #6f89c7 100%);
}
```

Make all the buttons the same width. Try with and without the `inline-block`.

```css
nav a {
  min-width: 120px;
  display: inline-block;
  ... 
}
```

Note: this is a setting which will likely need to be changed to accomodate small screens.

## CSS Grid

CSS Tricks offers a [guide to CSS grid](https://css-tricks.com/snippets/css/complete-guide-grid/).

Flexbox operates in a [single dimension](https://hackernoon.com/the-ultimate-css-battle-grid-vs-flexbox-d40da0449faf): x or y. CSS Grid operates in both.

Our use of Flexbox to style the content columns operates in a single (horizontal or x) dimension so flex is a viable option. 

Nevertheless, we will use CSS Grid for the primary layout in order to introduce some of its features in a simple use case.

Remove the flex statements and use a grid display, define columns, and set the start and end points for the grid children:

```css
@media (min-width: 640px) {
  .content {
    /* display: flex; */
    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
  }
  article {
    grid-column-start: 1;
    grid-column-end: span 3;
    /* flex: 1 0 60%; */
  }
  aside {
    grid-column-start: 4;
    grid-column-end: span 2;
    background: var(--light-green);
    box-shadow: -4px 0px 4px #ddd;
  }
  ...
}
```

Final:

```css
@media (min-width: 640px) {
  .content {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }
  article {
    grid-column: 1 / span 3;
  }
  aside {
    grid-column: 4 / span 2;
    background: var(--light-green);
    box-shadow: -4px 0px 4px #ddd;
  }
}
```

There is a complete CSS file available at [this gist](https://gist.github.com/DannyBoyNYC/4e0065e7b1f542c67a13899f0541bdb6)

## Notes

`<h2 itemprop="name"></h2>`

ONE

```js
const recipeTitle = recipesData[0].name;
console.log(recipeTitle);
const figure = document.querySelector('h2');
console.log(figure);
figure.innerText = recipeTitle;
```

`<div id="app"></div>`

TWO

```js
const recipe = recipesData[0];
const recipeOne = '<h2 itemprop="name">' + recipe.name + '</h2>';
const app = document.querySelector('#app');
app.innerHTML = recipeOne;
```

`<div id="app"></div>`

THREE

```js
const recipe = recipesData[0];
const recipeOne =
  '<h2>' +
  recipe.name +
  '</h2>' +
  '<figure>' +
  '<picture>' +
  '<img src=img/' +
  recipe.photo +
  ' alt="' +
  recipe.name +
  '" />' +
  '</picture>' +
  '<figcaption>' +
  recipe.description +
  '</figcaption>' +
  '</figure>';

const app = document.querySelector('#app');
app.innerHTML = recipeOne;
```

FOUR

```js
const recipe = recipesData[0];
const recipeOne = `<h2>${recipe.name}</h2>
  <figure >
  <picture>
    <img src="img/${recipe.photo}" alt="${recipe.name}" />
  </picture>
    <figcaption>${recipe.description}</figcaption>
  </figure>`;

console.log(recipeOne);

const app = document.querySelector('#app');
app.innerHTML = recipeOne;
```
