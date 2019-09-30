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

### Sass

We used use NPM to install [sass](https://www.npmjs.com/package/sass):

`npm install sass --save-dev`

Add a script to package.json for processing:

```js
  "scripts": {
    ...
    "startSass": "sass  scss/styles.scss app/css/styles.css --watch --source-map"
  },
```

Dart Sass CLI [documentation](https://sass-lang.com/documentation/file.SASS_REFERENCE.html)

To run both scripts at the same time add this to package.json:

```js
"scripts": {
  ...
  "start": "npm run startmac & npm run startSass"
},
```

And run `npm start` (the word 'run' is optional in this case).

Test it by re-adding the following to the `_base.scss` file:

```css
* { color: red !important };
```

Note that sass is less tolerant of errors than regular css. Try `* { color red !important };`.

#### SASS Variables

E.g.:

```css
$basil-green: #88a308;
$breakpoint-med: 640px;
```

Here is a larger example including variables for breakpoints and more:

Example:

```css
$break-five: 81.25em;
// 1300px
$break-four: 71.25em;
// 1140
$break-three: 61.25em;
// 980
$break-two: 46.25em;
// 760
$break-one: 22.5em;
// 360

//ADDITIONAL CONVERSIONS
// 67.5rem    1080px
// 1.125rem   18px
// 1rem       16px
// 0.875rem   14px
// .75rem     12px
$radius: .25rem;

$fonts: 'Source Sans Pro', Helvetica, Clean, sans-serif;

$basil-green: #88a308;
$link: #007eb6;
$cyan: #00aeef;
$cyan10: #e2f4fd;
$blue100: #003366;
$blue50: #5997b1;
$webdarkcyan: #006991;
$specialblue: #007eb6;
$text: #444;
$caption: #808285;
$borders: #dcdcdc;
$borders-callout: #820064;
$lightgray: #F2F2F1;
$gray10: #ebeced;
$gray25: #d0d2d3;
$gray50: #abacad;
$gray75: #808285;
$gray100: #585858;
$fushia100: #820064;
$green100: #339548;
$red100: #cc3333;


$blk-100: rgba(0,0,0,1);
$blk-095: rgba(0,0,0,0.95);
$blk-090: rgba(0,0,0,0.90);
$blk-085: rgba(0,0,0,0.85);
$blk-080: rgba(0,0,0,0.80);
$blk-075: rgba(0,0,0,0.75);
$blk-070: rgba(0,0,0,0.70);
$blk-065: rgba(0,0,0,0.65);
$blk-060: rgba(0,0,0,0.60);
$blk-055: rgba(0,0,0,0.55);
$blk-050: rgba(0,0,0,0.50);
$blk-040: rgba(0,0,0,0.40);
$blk-010: rgba(0,0,0,0.10);

$gray-100: rgba(51,51,51,1);
$gray-095: rgba(51,51,51,0.95);
$gray-090: rgba(51,51,51,0.90);
$gray-085: rgba(51,51,51,0.85);
$gray-080: rgba(51,51,51,0.80);
$gray-075: rgba(51,51,51,0.75);
$gray-070: rgba(51,51,51,0.70);
$gray-065: rgba(51,51,51,0.65);
$gray-060: rgba(51,51,51,0.60);
$gray-055: rgba(51,51,51,0.55);
$gray-050: rgba(51,51,51,0.50);
$gray-040: rgba(51,51,51,0.40);
$gray-010: rgba(51,51,51,0.10);
```

Add the above to a new `imports/_variables.scss` file and include it at the top of `styles.scss`: `@import 'imports/variables';`.

Usage example:

```css
* { color: $basil-green !important };
```

#### SASS nesting 

Sass will let you nest your CSS selectors in a way that follows the same visual hierarchy of your HTML. Be aware that overly nested rules will result in over-qualified CSS that could prove hard to maintain and is generally considered bad practice.

One of the best things about nesting in SASS is how it allows you to simplify media queries and keep them aligned with the selector.

#### SASS Partials and Imports

Sass partials allow you to create separate function or feature specific style sheets using [imports](https://sass-lang.com/guide#topic-4) and helps maintain a large code base.

Examples [Bootstrap](https://getbootstrap.com) and its [SASS roots](https://github.com/twbs/bootstrap-sass)

Create `imports/_nav.scss` and cut the nested **nav** related material from `_base.scss` into it. Add it to the main stylesheet.

Note the underscore in the include. If you add an underscore to the start of the file name, Sass won’t compile it. So, if you don’t want `colors.scss` to compile to `colors.css`, name the file `_colors.scss` instead. Files named this way are called partials in Sass terminology.

Create `imports/_header.scss` and add the following (remove the header related material from `_base.scss `).

```css
header {
  position: relative;
  height: 120px;
  background: var(--basil-green);
  border-radius: 8px 8px 0px 0px;
  
  h1 {
    background: url(img/basil.png) no-repeat;
    font-family: FuturaStdLight, sans-serif;
    font-weight: normal;
    color: #fff;
    font-size: 5rem;
    @media (min-width: 640px) {
      padding-left: 240px;
      padding-top: 90px;
      transform: translate(-100px, -80px);
      background-position: top left;
    }
  }
  
  a.beta {
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
    transform: rotate(20deg);
    transition: all 1s ease;
  }
  a.beta:hover {
    transform: rotate(0deg) scale(1.2);
  }
}
```

Note the use of nesting to perform the media query.

We can also use nesting and an ampersand for the hover pseudo selector:

```css
a.beta {
  ...
  &:hover {
    transform: rotate(0deg) scale(1.2);
  }
}
```

Note: SASS allows you to use JavaScript style comments - `//`. These comments do not get compiled into the css file. Traditional CSS comments ( `/* ... */` ) do.

<!-- `@import 'app/css/futura/stylesheet.css';` vs `@import url(futura/stylesheet.css);` -->

## CSS Grid

The [CSS Grid Cheatsheet](https://css-tricks.com/snippets/css/complete-guide-grid/) on CSS Tricks.

Flexbox operates in a [single axis](https://hackernoon.com/the-ultimate-css-battle-grid-vs-flexbox-d40da0449faf). CSS Grid operates in both x and y.

Our use of Flexbox to style the content columns operates in a single (horizontal or x) dimension. We can use CSS Grid but only need to specify one dimension.

Note that in our document these are only used in wide screens:

```css
@media (min-width: 640px) {
  .content{
    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
    grid-template-rows: 20% 20% 20% 20% 20%;
    grid-gap: 20px;
  }
  article {
    grid-row-start: 1;
    grid-column-start: 1;
    grid-column-end: span 3;
  }
  aside {
    grid-row-start: 1;
    grid-column-start: 4;
    grid-column-end: span 2;
    
    background: #f5faef;
    box-shadow: -4px 0px 4px #ddd;
  }
}
```

We have some width problems here due to the use of percentages (`20% * 5 + the grid-gap`).

Create a new partial `_layout.scss` and cut and paste the following code into it.

```css
article,
aside {
  padding: 1rem;
}

@media (min-width: 600px){
  .content {
      display: grid;
      grid-template-columns: 3fr 2fr;
      grid-column-gap: 1rem;
  }
  article {
      grid-column-start: 1;
  }
  aside {
      grid-column-start: 2;
      background-color: #f5faef;
      box-shadow: -4px 0px 4px #ddd;
      padding: 0.5rem;
  } 
}

footer {
  background-color: var(--basil-green);
  padding: 1rem;
  border-radius: 0 0 4px 4px;
  margin-bottom: 2rem;
}
```

Edit it to use `fr` - fractional units:

```css
@media (min-width: 600px){
  .content {
      display: grid;
      grid-template-columns: 3fr 2fr;
      grid-column-gap: 1rem;
  }
  article {
      grid-column-start: 1;
  }
  aside {
      grid-column-start: 2;
      background-color: #f5faef;
      box-shadow: -4px 0px 4px #ddd;
      padding: 0.5rem;
  } 
}
```

We can also use the repeat property. The `repeat` property requires a different property for the children:

```css
@media (min-width: 600px){
  .content {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-column-gap: 1rem;
  }
  article {
    grid-column: span 3;
  }
  aside {
    grid-column: span 2;
    background-color: #f5faef;
    box-shadow: -4px 0px 4px #ddd;
    padding: 0.5rem;
  } 
}
```

Note: while it is possible to use CSS Grid for the entire layout, it is not really necessary and adds unnecessary complexity.

However we will use `grid-template-areas` in order to show the principle and a nested grid:

```css
article,
aside {
  padding: 1rem;
}

@media (min-width: 600px){
  body {
    display: grid;
    grid-template-areas: 
    "header" 
    "nav" 
    "content"
    "footer";
  }
  header {
    grid-area: header;
  }
  nav {
    grid-area: nav;
  }
  .content {
    grid-area: content;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 1rem;
  }
  article {
    grid-column: span 3;
  }
  aside {
    grid-column: span 2;
    background-color: #f5faef;
    box-shadow: -4px 0px 4px #ddd;
  } 
  footer {
    grid-area: footer;
  }
}

footer {
  background-color: var(--basil-green);
  padding: 1rem;
  border-radius: 0 0 4px 4px;
  margin-bottom: 2rem;
}
```

Try:

```css
header {
  grid-area: content;
}
```

Commit your changes and checkout the `spring2019-done` branch.

## JavaScript

## Node Demo

In a new temp folder: `basilnode.js`

```sh
$ mkdir node
$ cd node
$ touch basilnode.js
$ npm init -y
$ npm install random-number
```

In `basilnode.js`:

```js
const randomNumber = require('random-number');

const randomIndex = randomNumber({
  min: 0,
  max: 4,
  integer: true
});

console.log(randomIndex);
console.log(typeof randomNumber);
console.log(typeof randomIndex);
```

At the command line:

```sh
$ node basilnode.js
```

```js
const randomNumber = require('random-number');

const basilChef = ['mama', 'papa', 'baby'];
const basilTexture = ['greasy', 'frozen', 'spicy'];

function randomItem(array) {
  const randomIndex = randomNumber({
    min: 0,
    max: array.length - 1,
    integer: true,
  });
  return array[randomIndex];
}

console.log(basilChef);
console.log(basilChef[0]);
console.log(basilChef.length);

console.log(randomItem(basilChef));
```

```sh
$ node basilnode.js
```

```js
const randomNumber = require('random-number');

const basilChef = ['mama', 'papa', 'baby'];
const basilTexture = ['greasy', 'frozen', 'spicy'];

function randomItem(array) {
  const randomIndex = randomNumber({
    min: 0,
    max: array.length - 1,
    integer: true,
  });
  return array[randomIndex];
}

function makeBasil() {
  return randomItem(basilChef) + '\'s' + ' ' + randomItem(basilTexture) + ' basil';
}

console.log(makeBasil());
```

```js
function makeBasil() {
  return (
    '<h2>' + randomItem(basilChef) + "'s" + ' ' + randomItem(basilTexture) + ' basil' + '</h2>'
  );
}
```

Template strings:

```js
function makeBasil() {
  return (
    `<h2>${randomItem(basilChef)}'s ${randomItem(basilTexture)} basil</h2>`
  );
}
```

Create `scripts.js` in the `js` folder and add it to `index.html`:

```html
<script src="js/scripts.js"></script>
```

In `scripts.js`:

```js
const el = document.querySelector('div.content h2')

function randomName(array) {
  const min = 0;
  const max = array.length - 1
  const randomIndex = Math.floor(Math.random() * (max + 1));
  return array[randomIndex];
}

const makeBasil = () => {
  const basilChef = ['mama', 'papa', 'baby'];
  const basilTexture = ['greasy', 'frozen', 'spicy'];

  return `
  <h2>${randomName(basilChef)}'s ${randomName(basilTexture)} basil</h2>
  `
};

console.log(makeBasil());

el.innerHTML = makeBasil()
```

```css
h2 {
  font-size: 2rem;
  text-transform: capitalize 
}
```

## Popover

Building the popover window.

Create and style a div on the bottom of the page.

```html
<div class="betainfo">
    <h2>In Beta</h2>
    <p>Information about the beta program.</p>
</div>
```

In `_header.scss`:

```css
.betainfo {
  width: 300px;
  height: 150px;
  padding: 0.5rem;
  background: #fff;
  border: 4px solid var(--orange);
  border-radius: 0.25rem;
  position: fixed;
  top: calc(50% - 75px);
  left: calc(50% - 150px);
  /*display: none;*/
}
```

Uncomment `display: none` and add a `show` class:

```css
.show {
  display: block;
}
```

Test by adding the class in the inspector and make any needed corrections.

Code the `.beta` button to show the window.

Create a variable for the beta button, attach an event listener to it, and create a function to handle the event.

```js
var popoverWindow = document.querySelector('.betainfo');
var betaButton = document.querySelector('.beta');

betaButton.addEventListener('click', showPopover);

function showPopover() {
    popoverWindow.classList.toggle('show');
    event.preventDefault();
}
```

## DOM Scripting Review:

* Use [querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) to find the first matching element on a page `var popoverWindow = document.querySelector('.betainfo');`
* Use [querySelectorAll()](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/querySelectorAll) to find all matching elements on a page
* Use [addEventListener('event', function)](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener), to listen for events on an element. You can find a full list of available events on the [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/Events)
* Use [Functions](https://developer.mozilla.org/en-US/docs/Glossary/Function) to store and execute your commands
* Use [classList](https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/) to add, remove, toggle, list and test for classes:

### Add Another Close Method

Add html to the betainfo:

```html
<div class="betainfo">
    <h2>In Beta</h2>
    <p>Information about the beta program.</p>
        <!-- NEW -->
    <a class="closer" href="#0">✖︎</a> 
</div>
```

Style it:

```css
.closer {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 1.5rem;
  height: 1.5rem;
  background: #fff;
  color: var(--orange);
  border: 3px solid #eabc5a;
  border-radius: 50%;
  text-align: center;
  line-height: 0.25rem;
  cursor: pointer;
}
```

Adjust the line height property to center the ✖︎.

Extend the functionality of the script.

```js
var popoverWindow = document.querySelector('.betainfo');
var betaButton = document.querySelector('.beta');
var popoverCloseButton = document.querySelector('.closer');  // NEW

betaButton.addEventListener('click', showPopover);
popoverCloseButton.addEventListener('click', showPopover);  // NEW

function showPopover() {
    popoverWindow.classList.toggle('show');
    event.preventDefault();
}
```

Add a shader div after the body tag to block access to the page and make the window modal:

```html
<div class="shader"></div>
```

Add styling:

```css
.shader {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: none;
}
```

Add it to the script:

```js
var popoverWindow = document.querySelector('.betainfo'); 
var betaButton = document.querySelector('.beta');
var popoverCloseButton = document.querySelector('.closer'); 
var shader = document.querySelector('.shader')  // NEW

betaButton.addEventListener('click', showPopover);
popoverCloseButton.addEventListener('click', showPopover); 
shader.addEventListener('click', showPopover)  // NEW

function showPopover() {
    popoverWindow.classList.toggle('show'); 
    shader.classList.toggle('show')  // NEW
    event.preventDefault();
}
```

Test. Change `position absolute` to `position fixed` and add a `z-index`.

<!-- Check the cascade and add z-indexes as appropriate.

Aside: Killing the scrollbar

```js
function showPopover() {
    popoverWindow.classList.toggle('show'); // NEW
    shader.classList.toggle('show')  // NEW
    body.classList.toggle('hidden')
    event.preventDefault();
}
```

```css
.hidden header,
.hidden nav,
.hidden .content,
.hidden footer
{
  display: none;
}
``` -->

## A Dynamic Popover

We will recreate the popover HTML using JavaScript. One advantage of making our popover dynamic is that we will be able to reuse it elsewhere on our page.

Delete the betainfo div at the bottom of our page:

```html
<!-- <div class="betainfo">
    <h2>In Beta</h2>
    <p>Information about the beta program.<p>
    <a class="closer" href="#0">X</a>
</div> -->
```

And remove the JavaScript related to it in scripts.js.

We will retain all the CSS in `_header.scss` for use in our new popover:

```css
.betainfo {
  width: 300px;
  height: 150px;
  padding: 0.5rem;
  background: #fff;
  border: 4px solid var(--orange);
  border-radius: 0.25rem;
  position: fixed;
  z-index: 201;
  top: calc(50% - 75px);
  left: calc(50% - 150px);
  display: none;
}

.closer {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 1.5rem;
  height: 1.5rem;
  background: #fff;
  color: var(--orange);
  border: 3px solid #eabc5a;
  border-radius: 50%;
  text-align: center;
  line-height: 1.10rem;
  cursor: pointer;
}

.shader {
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100vw;
  display: none;
}

.show {
  display: block;
}
```

### createElement

You use the `document.createElement()` [method](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) to create an HTML element.

In the browser's console e.g.:

```js
> var div = document.createElement('div');
> div
```

You can manipulate an element created with `createElement()` like you would any other element in the DOM. Add classes, attributes, styles, and more.

In the browser's console:

```js
var div = document.createElement('div');
div.className = 'new-div';
div.id = 'new-div';
div.setAttribute('data-div', 'new');
div.style.color = '#fff';
div.style.backgroundColor = 'rebeccapurple';
// add some text
div.textContent = 'Nice work, dude!';
div
```

### Appending Content

After you create an element, you need a way to add it to your page. JavaScript provides a handful of methods you can use to add an element before, after, or within some other element in the DOM.

First grab a target:`

```js
// Get the element to add your new HTML element before, after, or within
var target = document.querySelector('.content h2');
```

Then use the appropriate method:

```js
// Inject the `div` element before the element
target.before(div);

// Inject the `div` element after the element
target.after(div);

// Inject the `div` element before the first item *inside* the element
target.prepend(div);

// Inject the `div` element after the first item *inside* the element
target.append(div);
```

Try it again with the `betainfo` class. 

**Remove the `display: none` property from the betainfo css first.**

```js
var div = document.createElement('div');
div.className = 'betainfo';
div.style.color = '#fff';
div.style.backgroundColor = 'rebeccapurple';
// add some text
div.textContent = 'Nice work, dude!';
```

```js
div
var target = document.querySelector('header');
target.before(div);
```

### innerHTML

The innerHTML property can be used to both get and set HTML content in an element.

In the console:

```js
var elem = document.querySelector('.content');
elem
// Get HTML content
var html = elem.innerHTML;
html

// Set HTML content
elem.innerHTML = '<p>We can dynamically change the HTML including HTML elements like <a href="#">this link</a>.</p>';

// Add += HTML to the end of an element's existing content
elem.innerHTML = elem.innerHTML + '<p>Add this after what is already there.</p>';
elem.innerHTML += '<p>Add this after what is already there.</p>';

// Add HTML to the beginning of an element's existing content
elem.innerHTML = '<p>We can add this to the beginning.</p>' + elem.innerHTML;
```

Note: there is also an `innerText` property available. It works just like `innerHTML`, but only gets the text of an element and omits the markup.

```js
var elem = document.querySelector('.content');
elem.innerText = '<p>Welcome back my friends to the show that never ends.</p>';
```

Notice how it show the HTML tags as text.

Since we are creating our div dynamically we deleted the 'hardcoded' div:

```html
<div class="betainfo">
    <h2>In Beta</h2>
    <p>Information about the beta program.<p>
    <a class="closer" href="#0">X</a>
</div>
```

Add to `scripts.js`:

```js
var betaButton = document.querySelector('.beta')
betaButton.addEventListener('click', makePopover)

function makePopover() {
  var popover = document.createElement('div');
  popover.classList.add('betainfo');
  var popoverContent = '<h2>Beta Only!</h2><p>Information about the beta program.<p><div class="closer" href="#0"><div>✖︎</div></div>'; // NEW
  popover.innerHTML = popoverContent;
  document.querySelector('body').append(popover);
}
```

Click on the beta button and note the div in the source html. 

Note the long line for the popoverContent variable. Fortunately we can use a template string instead.

Note the use of back ticks:

```js
var popoverContent = `
<h2>In Beta</h2>
<p>Information about the beta program.<p>
<div class="closer" href="#0">
<div>✖︎</div>
</div>
`
```

E.g.:

```js
var betaButton = document.querySelector('.beta')
betaButton.addEventListener('click', makePopover)

function makePopover() {
  var popover = document.createElement('div');
  popover.classList.add('betainfo');
    var popoverContent = `
  <h2>In Beta</h2>
  <p>Information about the beta program.<p>
  <div class="closer" href="#0">
    <div>✖︎</div>
  </div>
  `
  popover.innerHTML = popoverContent;
  document.querySelector('body').append(popover);
}
```

Now, let's add the close functionality ('destroyPopover') back in. We cannot use `classList` to toggle the display property here so we will use the opposite of `append()` which is `remove()`:

```js
var betaButton = document.querySelector('.beta')
betaButton.addEventListener('click', makePopover)

function makePopover() {
  var popover = document.createElement('div');
  popover.classList.add('betainfo');
  var popoverContent = `
  <h2>In Beta</h2>
  <p>Information about the beta program.<p>
  <div class="closer" href="#0">
    <div>✖︎</div>
  </div>
  `
  popover.innerHTML = popoverContent;
  document.querySelector('body').append(popover);
  
  var popoverCloseButton = document.querySelector('.closer') // NEW
  popoverCloseButton.addEventListener('click', destroyPopover) // NEW
}
// NEW
function destroyPopover() {
    document.querySelector('.betainfo').remove();
    event.preventDefault()
}
```

Note that we do not create `var popoverCloseButton` or attach an event listener until we have created a popover. Otherwise we would get an error.

## Event Delegation

We can use 'event delegation' in order to further abstract the click event so we can use it elsewhere on the page.

Replace the event listener and add a new function:

```js
// betaButton.addEventListener('click', makePopover)
document.addEventListener('click', decide, false)

function decide() {
    console.log(event.target);
}
```

E.g.:

```js
// betaButton.addEventListener('click', makePopover)
document.addEventListener('click', decide, false)

function decide() {
    console.log(event.target);
}

function makePopover() {
  var popover = document.createElement('div');
  popover.classList.add('betainfo');
  var popoverContent = `
  <h2>In Beta</h2>
  <p>Information about the beta program.<p>
  <div class="closer" href="#0">
    <div>✖︎</div>
  </div>
  `
  popover.innerHTML = popoverContent;
  document.querySelector('body').append(popover);
  
  var popoverCloseButton = document.querySelector('.closer') 
  popoverCloseButton.addEventListener('click', destroyPopover) 
}

function destroyPopover() {
    document.querySelector('.betainfo').remove();
    event.preventDefault()
}
```

Note that you can see whatever you click on in the console.

### matches

The `matches()` method lets you check if an element would be selected by a particular selector. It returns true if the element is a match, and false when it’s not. It can be an alternative to using `element.classList.contains('.someclass')`.

```js
var elem = document.querySelector('.click-me');

// Match by an ID
if (elem.matches('#first-button')) {
    // Do something...
}

// Match by a class
if (elem.matches('.button-submit')) {
    // Do something...
}

// Match by a data attribute
if (elem.matches('[data-click-me]')) {
    // Do something...
}

// Match by a data attribute and value
if (elem.matches('[data-click-me="button-submit"]')) {
    // Do something...
}

// Match by multiple selectors
// Returns true when element contains all selectors
if (elem.matches('.click-me.button-submit[data-click-me]')) {
    // Do something...
}

// Match by one of several selectors
// Returns true when element contains at least one of the selectors
if (elem.matches('.click-me, .button-submit, [data-click-me]')) {
    // Do something...
}
```

Add an `if` statement to run `makePopover` if the item clicked on (`event.target`) matches the beta button:

```js
function decide() {
    console.log(event.target);
    if (event.target.matches('.beta')) {
        makePopover();
    } 
}
```

<!-- If clicking on the x isn't working you can add a class to it:

```js
    var popoverContent = `
    <h2>In Beta</h2>
    <p>Information about the beta program.<p>
    <div class="closer" href="#0">
    <div class="closex">✖︎</div> 
    </div>
    `
```

Then use it in an `else if` to remove the popover:

```js
function decide() {
    console.log(event.target);
    if (event.target.matches('.beta')) {
        makePopover();
    } else if (event.target.matches('.closex')) {
        destroyPopover()
    }
}
``` -->

Let's use our new popover to display a message when the user clicks on any of the three nav buttons:


Add a class `it` to each of the nav bottons:

```html
<nav>
    <p>Bonjour Monsieur Ferme</p>
    <ul>
        <li class="nav-pickit"><a class="it" href="#">pick it</a></li>
        <li class="nav-cookit"><a class="it" href="#">cook it</a></li>
        <li class="nav-storeit"><a class="it" href="#">store it</a></li>
    </ul>
</nav>
```

Create two new variables with the text for our messages:

```js
// var betaButton = document.querySelector('.beta');
document.addEventListener('click', decide, false);

var betaContent = `
<h2>In Beta</h2>
<p>Information about the beta program.<p>
<div class="closer" href="#0">
<div class="closex">✖︎</div>
</div>
`

var itContent = `
<h2>Coming Soon</h2>
<p>This feature coming soon.<p>
<div class="closer" href="#0">
<div class="closex">✖︎</div>
</div>
`
```

Use the first new variable as the source for our popover content:

```js
function makePopover() {
    var popover = document.createElement('div');
    popover.classList.add('betainfo');
    var popoverContent = betaContent; // NEW
    popover.innerHTML = popoverContent;
    document.querySelector('body').append(popover);
    
    var popoverCloseButton = document.querySelector('.closer')
    popoverCloseButton.addEventListener('click', destroyPopover)
}
```

Now let's decide which item is clicked on and use that to determine the message::

```js
function decide() {
  console.log(event.target);
  if (event.target.matches('.beta')) {
      makePopover(betaContent); // NEW
  } else if (event.target.matches('.it')) { // NEW
      makePopover(itContent); // NEW
  } else if (event.target.matches('.closex')) {
      destroyPopover()
  }
}
```

The line `makePopover(itContent);` passes the variable we want to display to the makePopover function.

Let's use that by first catching it or passing it into the function as a variable:

```js
function makePopover(content) {
  ...
}
```

And then making the contents of the popover dependent on the value of the variable:

```js
function makePopover(content) {
  var popover = document.createElement('div');
  popover.classList.add('betainfo');
  popover.innerHTML = content;  // NEW
  document.querySelector('body').append(popover);
  
  var popoverCloseButton = document.querySelector('.closer')
  popoverCloseButton.addEventListener('click', destroyPopover)
}
```

Because we are using event delegation we can remove the following uneeded lines:

```js
// var popoverCloseButton = document.querySelector('.closer')
// popoverCloseButton.addEventListener('click', destroyPopover)
```

Here is the final script:

```js
document.addEventListener('click', decide, false);

var betaContent = `
<h2>In Beta</h2>
<p>Information about the beta program.<p>
<div class="closer" href="#0">
<div class="closex">✖︎</div>
</div>
`

var itContent = `
<h2>Coming Soon</h2>
<p>This feature coming soon.<p>
<div class="closer" href="#0">
<div class="closex">✖︎</div>
</div>
`

function decide() {
    console.log(event.target);
    if (event.target.matches('.beta')) {
        makePopover(betaContent); 
    } else if (event.target.matches('.it')) { 
        makePopover(itContent); 
    } else if (event.target.matches('.closex')) {
        destroyPopover()
    }
}

function makePopover(content) { 
    if (document.querySelector('.betainfo')) {
        destroyPopover();
    }
    var popover = document.createElement('div');
    popover.classList.add('betainfo');
  
    popover.innerHTML = content; 
    document.querySelector('body').append(popover);
  
    function destroyPopover() {
      document.querySelector('.betainfo').remove();
      event.preventDefault()
    }
  }

function destroyPopover() {
    event.preventDefault()
    var targetElem = document.querySelector('.betainfo')
    targetElem.remove();
}
```

## Debugging

Note that the popovers accumulate and become difficult to destroy.

Let's add a test to see if a popover already exists and destroy it before creating a new one:

```js
function makePopover(content) {
    if (document.querySelector('.betainfo')) { //NEW
        destroyPopover(); //NEW
    } //NEW
    var popover = document.createElement('div');
    popover.classList.add('betainfo');
    var popoverContent = content;
    popover.innerHTML = popoverContent;
    document.querySelector('body').append(popover);
    
    var popoverCloseButton = document.querySelector('.closer')
    popoverCloseButton.addEventListener('click', destroyPopover)
}
```



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
