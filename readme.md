# Basilica!

## Homework

Create separate popovers for each button in the navigations. The popovers should each have different messages.

## Reading

- See how far you can get in [Grid Garden](http://cssgridgarden.com/)
- MDN on [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- The [Absolute Beginners Guide](https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/) to NPM
- [What is GIT?](https://guides.github.com/introduction/git-handbook/)

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
$ npm install browser-sync sass concurrently --save-dev
```

Note:

- sass, concurrently
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

For example:

```css
color: var(--basil-green);
```

Note also: the transition property on the anchor selector. This is a shortcut for:

```css
transition-property: color;
transition-duration: 1s;
transition-timing-function: linear;
```

or `transition: color 0.2s linear;`

Confine this effect to anchors within the content div. 

Replace the generic hover with:

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

A `<figure>` is an image, illustration, or diagram that is referenced in the main flow of a document, but that can be moved to another part of the document without affecting the main flow.

We want to display identical image content, just larger or smaller depending on the device. The standard `<img>` element only lets you point the browser to a single source file. We will use two new attributes — `srcset` and `sizes` — to provide additional source images along with hints to help the browser pick the right one.

- Upload `pesto.jpg` to a generator such as [responsivebreakpoints.com](https://www.responsivebreakpoints.com/). Download the zip file and place the unzipped folder in the `img` directory.

Replace the `img` tag in index.html with a [picture tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture):

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

1. A media condition e.g. `(max-width:480px)` - here "when the viewport width is 480 pixels or less"
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

## Flex Layout

The two column view applies only to widescreen.

We will make the article and aside run side by side by applying flex to their parent container within a mobile first breakpoint:

```css
@media (min-width: 640px) {
  .content {
    display: flex;
  }
}
```

Note: we _cannot_ use a CSS variable as a breakpoint:

```css
@media (min-width: var(--breakpoint)) {
  ...
}
``` 

A media query is not an element selector so it does not inherit styles.

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

Use a background color and box-shadow to color the aside:

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

We will attempt a mobile first design strategy. Edit the css to display for small screen first:

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

Flexbox operates in a [single dimension](https://hackernoon.com/the-ultimate-css-battle-grid-vs-flexbox-d40da0449faf): x or y. CSS Grid operates on both the x _and_ y axis.

Our current use of Flexbox to style the content columns operates in a single (horizontal or x) dimension so flex is a viable option. 

Nevertheless, we will use CSS Grid for the primary layout in order to introduce some of its features in this simple use case.

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

Finally, by moving using display grid to the body selector, we can use [grid areas](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas) to define our layout:

```css
@media (min-width: 600px) {
  body {
    margin: 0 auto;
    margin-top: 1.5rem;
    display: grid;
    grid-template-areas:
      'header'
      'nav'
      'content'
      'footer';
  }
  header {
    border-radius: 8px 8px 0px 0px;
    grid-area: header;
  }
  header h1 {
    padding-left: 240px;
    padding-top: 90px;
    transform: translate(-100px, -80px);
    background-position: top left;
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
    background: var(--light-green);
    box-shadow: -4px 0px 4px #ddd;
  }
  footer {
    grid-area: footer;
  }
}
```

Demo:

```css
header {
  grid-area: footer;
}
```

There is a complete CSS file available at [this gist](https://gist.github.com/DannyBoyNYC/4e0065e7b1f542c67a13899f0541bdb6)

## Sass

Earlier we used NPM to install [Sass](https://www.npmjs.com/package/sass):

`npm install sass --save-dev`

Stop the server and add a script to package.json for processing:

```js
"scripts": {
  ...
  "sass": "sass  scss/styles.scss app/css/styles.css --watch --source-map"
},
```

Dart Sass CLI [documentation](https://sass-lang.com/documentation/file.SASS_REFERENCE.html)

To run both scripts at the same time edit the scripts in package.json:

```js
  "scripts": {
    "server": "browser-sync start --directory --server 'app' --files 'app'",
    "sass": "sass  scss/styles.scss app/css/styles.css --watch --source-map",
    "start": "npm run server & npm run sass"
  },
```

1. Create a `scss` folder at the top level of our repo 
1. Copy `styles.css` into it
1. Rename `scss/styles.css` to `scss/styles.scss`.

Run `npm start` (note: the word 'run' is optional when using start).

Test it by re-adding the following to the top of `styles.scss`:

```css
* { color: red !important };
```

Note that sass is less tolerant of errors than regular css. Try 

`* { color red !important };`.

### SASS Variables

Sass has its own variables system, e.g.:

```css
$basil-green: #88a308;
$breakpoint-med: 640px;
```

Here is an example showing sass variables for breakpoints and more:

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

$radius: .25rem;

$fonts: 'Source Sans Pro', Helvetica, Clean, sans-serif;

$red: #f00;

```

Usage example:

```css
$red: #f00;
* { color: $red !important };
```

Add the sample SASS variables to a new file in a new folder `imports/_variables.scss` and include it at the top of `styles.scss`: 

`@import 'imports/variables';`.

Note the syntax differences between a native CSS import as well as the underscore in the file name. We will come back to that later.

Test using the `$red` variable. Try changing it. Remove it.

### SASS Nesting 

Sass will let you nest your CSS selectors in a way that mirrors the hierarchy of your HTML. Be aware that overly nested rules will result in over-qualified CSS that could prove hard to maintain and is generally considered bad practice.

Nest the header related styles in `styles.scss`:

```css
header {
  position: relative;
  height: 120px;
  background: var(--basil-green);

  h1 {
    background: url(img/basil.png) no-repeat;
    font-family: FuturaStdLight, sans-serif;
    font-weight: normal;
    color: #fff;
    font-size: 5rem;
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

### SASS Partials

Sass partials allow you to create separate function or feature specific style sheets using [imports](https://sass-lang.com/guide#topic-4) and helps maintain a large code base.

Examples [Bootstrap](https://getbootstrap.com) and its [SASS roots](https://github.com/twbs/bootstrap-sass)

Create `imports/_header.scss` and cut and paste the nested header material from `_styles.scss` into it. Import it to the main stylesheet with:

`@import 'imports/header';`

Note the underscore in the file name. If you add an underscore to the start of the file name, Sass won’t compile it. So, if you don’t want `header.scss` to compile to `header.css`, name the file with an undercore `_header.scss` instead. Files used this way are called partials in Sass.

Note: SASS allows you to use JavaScript style comments - `//`. These comments do not get compiled into the css file. Traditional CSS comments ( `/* ... */` ) do.

## fall-2019-done

<!-- HERE 
review - CSS Grid 
bootstrap - above
package json - scripts and dependencies
-->

Create a nested block for the nav in styles.scss:

```css
nav {
  background: var(--light-gray);
  border-top: 0.5rem solid var(--light-orange);
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  ul {
    display: flex;
  }

  li {
    list-style: none;
    margin-right: 0.5rem;
  }

  a {
    text-align: center;
    font-size: 1.5rem;
    padding: 8px;
    color: #fff;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    min-width: 120px;
    display: inline-block;
  }

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
}
```

Create a partial `_nav.scss` in the imports folder and cut and paste the nested nav block into it. Import the partial back into `styles.scss` with:

`@import 'imports/nav';`

Examine the CSS in the browser's inspector. Note the mapping.

One of the best things about nesting in SASS is how it allows you to simplify media queries and keep them aligned with the selector.

Cut the body rule from the breakpoint and add the styling to the initial body rule as shown:

```css
body {
  font: 100%/1.5 'Segoe UI', Candara, 'Bitstream Vera Sans', 'DejaVu Sans',
    'Bitstream Vera Sans', 'Trebuchet MS', Verdana, 'Verdana Ref', sans-serif;
  color: var(--dark-gray);
  max-width: var(--max-width);
  @media (min-width: $break-two) {
    margin: 0 auto;
    margin-top: 1.5rem;
    display: grid;
    grid-template-areas:
      'header'
      'nav'
      'content'
      'footer';
  }
}
```

Note: since SASS is a transpiler we can use SASS variables - `$break-two` - for break points.

Perform a similar action for the header partial use nesting for the media queries:

```css
header {
  position: relative;
  height: 120px;
  background: var(--basil-green);

  @media (min-width: $break-two) {
    border-radius: 8px 8px 0px 0px;
    grid-area: header;
  }

  h1 {
    background: url(img/basil.png) no-repeat;
    font-family: FuturaStdLight, sans-serif;
    font-weight: normal;
    color: #fff;
    font-size: 5rem;

    @media (min-width: $break-two) {
      padding-left: 240px;
      padding-top: 90px;
      transform: translate(-100px, -80px);
      background-position: top left;
    }
    
  }
  ...
}
```

- Add it to the imports folder and import it back into `styles.scss` with:

`@import 'imports/header';`

Nest the media query for the nav:

```css
nav {
  background: var(--light-gray);
  border-top: 0.5rem solid var(--light-orange);
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (min-width: $break-two) {
    grid-area: nav;
  }

  ...
}
```

Finally, create partials `_base.scss` and `_content.scss`.

In `_base.scss`:

```css
@import url(futura/stylesheet.css);

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

* {
  margin: 0;
  padding: 0;
}

::selection {
  background: var(--basil-green);
  color: #fff;
}

body {
  font: 100%/1.5 'Segoe UI', Candara, 'Bitstream Vera Sans', 'DejaVu Sans',
    'Bitstream Vera Sans', 'Trebuchet MS', Verdana, 'Verdana Ref', sans-serif;
  color: var(--dark-gray);
  max-width: var(--max-width);
  @media (min-width: $break-two) {
    margin: 0 auto;
    margin-top: 1.5rem;
    display: grid;
    grid-template-areas:
      'header'
      'nav'
      'content'
      'footer';
  }
}

h2,
h3 {
  color: var(--basil-green);
  margin: 8px 0;
  font-size: 1.4rem;
  letter-spacing: -1px;
}

h2 {
  font-size: 2rem;
}

a {
  color: var(--orange);
  text-decoration: none;
  transition: color 0.5s linear;
}

li > h4 {
  margin-top: 12px;
}

img {
  width: 100%;
  height: auto;
}
```

In `_content.scss`

```css
.content {
  @media (min-width: $break-two) {
    grid-area: content;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 1rem;
  }
  a:hover {
    color: var(--basil-green);
  }
}

article {
  padding: 1rem;
  @media (min-width: $break-two) {
    grid-column: span 3;
  }
  li {
    margin-left: 1rem;
    margin-bottom: 0.5rem;
  }
  ol {
    margin-left: 1rem;
    margin-bottom: 0.5rem;
  }
  figcaption {
    font-size: 0.75rem;
  }
}

aside {
  padding: 1rem;
  @media (min-width: $break-two) {
    grid-column: span 2;
    background: var(--light-green);
    box-shadow: -4px 0px 4px #ddd;
  }
  li {
    list-style: none;
    margin-left: 1rem;
    margin-bottom: 0.5rem;
  }
}

footer {
  background-color: var(--basil-green);
  padding: 1rem;
  border-radius: 0 0 4px 4px;
  margin-bottom: 2rem;
  @media (min-width: $break-two) {
    grid-area: footer;
  }
}
```

And in `styles.scss` all you should need is:

```css
@import 'imports/variables';
@import 'imports/base';
@import 'imports/header';
@import 'imports/nav';
@import 'imports/content';
```

Test in the browser at various sizes.

Note that we get a horizontal scrollbar at a 375px width. This is due to the size of the navigation buttons.

Try changing them in `_nav.scss`:

```css
  a {
    text-align: center;
    font-size: 1.5rem;
    padding: 8px;
    min-width: 90px;
    color: #fff;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    display: inline-block;
    @media (min-width: $break-two) {
      min-width: 120px;
    }
  }
```

<!-- Note: switching branches at this point will delete styles.css from the css directory. Stop the processes running in the console before switching branches. -->

## JavaScript

Let's ease into JavaScript with a demonstration and a simple DOM manipulation.

### Node - Demo

Review Node:

```sh
$ mkdir node
$ cd node
$ touch basilnode.js
$ npm init -y
$ npm install random-number
```

[Random Number](https://www.npmjs.com/package/random-number) on npmjs.com.

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

Add some additional variables - arrays:

```js
const randomNumber = require('random-number');

const basilChef = ['mama', 'papa', 'baby'];

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

Call the randomItem function from within another function that uses [concatination](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Strings#Concatenating_strings):

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

Elaborate on it to make an HTML element:

```js
function makeBasil() {
  return (
    '<h2>' + randomItem(basilChef) + "'s" + ' ' + randomItem(basilTexture) + ' basil' + '</h2>'
  );
}
```

Use a [template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals):

```js
function makeBasil() {
  return (
    `<h2>${randomItem(basilChef)}'s ${randomItem(basilTexture)} basil</h2>`
  );
}
```

A simple template literal (use Quokka):

```js
let x = 3;
let y = 8;
console.log(`${x} + ${y} = ${x + y}`)
```

### Add a Script

Note `scripts.js` in the `js` folder and link it to `index.html`:

```html
<script src="js/scripts.js"></script>
```

In `scripts.js`:

Evolve a function that uses JavaScript's built-in [Math methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) to return a random number between zero and two:

```js
function random() {
  const max = 3;
  // const randomIndex = Math.random();
  // const randomIndex = Math.random() * max;
  // const randomIndex = Math.floor(Math.random() * max);
  const randomIndex = Math.floor(Math.random() * max);
  return randomIndex;
}

console.log(random());
```

Now call our random function passing in an array. 

```js
const basilChefs = ['mama', 'papa', 'baby'];

function random(array) {
  const max = array.length;
  const randomIndex = Math.floor(Math.random() * max);
  return array[randomIndex];
}

var name = random(basilChefs);
console.log(name);
```

We used the random number to select a name from the array and return it to the calling function.

Add another variable and message the output to product a string:

```js
const basilChefs = ['mama', 'papa', 'baby'];
const basilTexture = ['greasy', 'frozen', 'spicy'];

function random(array) {
  const max = array.length;
  const randomIndex = Math.floor(Math.random() * max);
  return array[randomIndex];
}

var recipeName = 'My ' + random(basilChefs) + "'s " + random(basilTexture) + ' pesto';
console.log(recipeName);
```

Let's use the return value in our layout:

```js
const el = document.querySelector('h2')
```

Test `el` in the console.

```js
const el = document.querySelector('h2');

const basilChefs = ['mama', 'papa', 'baby'];
const basilTexture = ['greasy', 'frozen', 'spicy'];

function random(array) {
  const max = array.length;
  const randomIndex = Math.floor(Math.random() * max);
  return array[randomIndex];
}

var recipeName =
  'My ' + random(basilChefs) + "'s " + random(basilTexture) + ' pesto';

el.innerHTML = recipeName;
```

Finally, will use a template string:

```js
var recipeName = `${random(basilChefs)}'s ${random(basilTexture)} pesto`;
```

and format it in `_base.scss`:

```css
h2 {
  font-size: 2rem;
  text-transform: capitalize 
}
```

## JavaScript Popover

Building the popover window.

Create and style a div on the bottom of the html page (but before the script tag).

```html
<div class="betainfo">
    <h2>In Beta</h2>
    <p>Information about the beta program.</p>
</div>
```

In `_header.scss` (but not inside the nested area):

```css
.betainfo {
  max-width: 300px;
  padding: 0 1rem 1rem 1rem;
  background: #fff;
  border: 2px solid var(--orange);
  border-radius: $radius;
  position: fixed;
  top: 30%;
  left: calc(50% - 150px);
  // display: none;
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

function showPopover() {
    popoverWindow.classList.toggle('show');
    event.preventDefault();
}

betaButton.addEventListener('click', showPopover);
```

Use event delegation:

```js
var popoverWindow = document.querySelector('.betainfo');
// var betaButton = document.querySelector('.beta');

function showPopover() {
  console.log(event.target);
  if (!event.target.matches('.beta')) {
    return;
  }
  popoverWindow.classList.toggle('show');
  event.preventDefault();
}

document.addEventListener('click', showPopover);
```

## DOM Scripting Methods Used

* Use [querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) to find the first matching element on a page `var popoverWindow = document.querySelector('.betainfo');`
* Use [querySelectorAll()](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/querySelectorAll) to find all matching elements on a page
* Use [addEventListener('event', function)](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener), to listen for events on an element. You can find a full list of available events on the [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/Events)
* Use [Functions](https://developer.mozilla.org/en-US/docs/Glossary/Function) to store and execute your commands
* Use [classList](https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/) to add, remove, toggle, list and test for classes

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

// Match by one of several selectors
// Returns true when element contains at least one of the selectors
if (elem.matches('.click-me, .button-submit')) {
    // Do something...
}
```

### Add Another Close Method

Add html to the betainfo:

```html
<div class="betainfo">
    <h2>In Beta</h2>
    <p>Information about the beta program.</p>
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
  border: 2px solid #eabc5a;
  border-radius: 50%;
  text-align: center;
  line-height: 1.5rem;
  cursor: pointer;
}
```

Adjust the line height property to center the ✖︎.

Extend the functionality of the script.

```js
var popoverWindow = document.querySelector('.betainfo');

function showPopover() {
  console.log(event.target);
  if (event.target.matches('.beta, .closer')) {
    pop();
  } else {
    return;
  }
}

function pop() {
  popoverWindow.classList.toggle('show');
  event.preventDefault();
}

document.addEventListener('click', showPopover);
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
var shader = document.querySelector('.shader');

function showPopover() {
  console.log(event.target);
  if (event.target.matches('.beta, .closer')) {
    pop();
  } else {
    return;
  }
}

function pop() {
  popoverWindow.classList.toggle('show');
  shader.classList.toggle('show');
  event.preventDefault();
}

document.addEventListener('click', showPopover);
```

Test. 

Add `z-index`s to the header and popover as appropriate.

Remove the popover css into its own partial.

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

We will retain all the CSS in `_popovers.scss` for use in our new popover:

```css
.betainfo {
  max-width: 300px;
  padding: 0 1rem 1rem 1rem;
  background: #fff;
  border: 2px solid var(--orange);
  border-radius: $radius;
  position: fixed;
  z-index: 30;
  top: 30%;
  left: calc(50% - 150px);
  // display: none;
}

.closer {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 1.5rem;
  height: 1.5rem;
  background: #fff;
  color: var(--orange);
  border: 2px solid #eabc5a;
  border-radius: 50%;
  text-align: center;
  line-height: 1.5rem;
  cursor: pointer;
}

.shader {
  position: absolute;
  z-index: 20;
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

Examine the elements in the dev tools. We are creating multiple popovers.

Now, let's add the close functionality ('destroyPopover') in. We cannot use `classList` to toggle the display property here so we will use the opposite of `append()` which is `remove()`:

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

We can also run a check to ensure the a popover is not already on the screen:

```js
function makePopover() {
  if (document.querySelector('.betainfo')) {
    destroyPopover();
  }
  ...
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
document.addEventListener('click', clickHandler, false)

function clickHandler() {
    console.log(event.target);
}

function makePopover() {
  var popover = document.createElement('div');
  popover.classList.add('betainfo');
  var popoverContent = `
    <h2>In Beta</h2>
    <p>Information about the beta program.<p>
    <a class="closer" href="#0">✖︎</a>
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

Add an `if` statement to run `makePopover` if the item clicked on (`event.target`) matches the beta button:

```js
function clickHandler() {
    console.log(event.target);
    if (event.target.matches('.beta')) {
        makePopover();
    } 
}
```

We can also add our shader div:

```js
var betaButton = document.querySelector('.beta');
document.addEventListener('click', clickHandler, false);

function clickHandler() {
  console.log(event.target);
  if (event.target.matches('.beta')) {
    makePopover();
  }
}
function makePopover() {
  if (document.querySelector('.betainfo')) {
    destroyPopover();
  }
  var popover = document.createElement('div');
  popover.classList.add('betainfo');
  var popoverContent = `
  <h2>In Beta</h2>
  <p>Information about the beta program.<p>
  <a class="closer" href="#0">✖︎</a>
  `;
  popover.innerHTML = popoverContent;
  document.querySelector('body').append(popover);

  var popoverCloseButton = document.querySelector('.closer'); // NEW
  popoverCloseButton.addEventListener('click', destroyPopover); // NEW
  document.querySelector('.shader').classList.add('show');
}

function destroyPopover() {
  document.querySelector('.betainfo').remove();
  document.querySelector('.shader').classList.remove('show');
  event.preventDefault();
}

```

As a demostration of the new functionality afforded by a dynamically generated popover, let's use our new popover to display a different message when the user clicks on any of the three nav buttons:


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
var betaContent = `
<h2>In Beta</h2>
<p>Information about the beta program.<p>
<a class="closer" href="#0">✖︎</a>
`;
var buttonContent = `
<h2>Coming Soon</h2>
<p>This feature coming soon.<p>
<a class="closer" href="#0">✖︎</a>
`;
```

Use the first new variable as the source for our popover content:

```js
var popover = document.createElement('div');
popover.classList.add('betainfo');
var popoverContent = betaContent; // NEW
...
}
```

Now let's decide which item is clicked on and use that to determine the message::

```js
function clickHandler() {
  console.log(event.target);
  if (event.target.matches('.beta')) {
    makePopover(betaContent); // NEW
  } else if (event.target.closest('nav ul')) {
    // NEW
    makePopover(buttonContent); // NEW
  } else if (event.target.matches('.close')) {
    destroyPopover();
  }
}
```

Note the use of [closest](https://gomakethings.com/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/) above. The closest() method looks for the closest matching parent to an element that has a selector that you pass in.

Let's use that by first passing it into the function as a variable:

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
  
  var popoverCloseButton = document.querySelector('.close')
  popoverCloseButton.addEventListener('click', destroyPopover)
}
```

Because we are using event delegation we can remove the following uneeded lines:

```js
// var popoverCloseButton = document.querySelector('.close')
// popoverCloseButton.addEventListener('click', destroyPopover)
```

Here is the final script:

```js
// popovers

var betaContent = `
<h2>In Beta</h2>
<p>Information about the beta program.<p>
<a class="closer" href="#0">✖︎</a>

`;

var buttonContent = `
<h2>Coming Soon</h2>
<p>This feature coming soon.<p>
<a class="closer" href="#0">✖︎</a>
`;

var betaButton = document.querySelector('.beta');
document.addEventListener('click', clickHandler, false);

function clickHandler() {
  console.log(event.target);
  if (event.target.matches('.beta')) {
    makePopover(betaContent);
  } else if (event.target.closest('nav ul ')) {
    makePopover(buttonContent);
  } else if (event.target.matches('.closer')) {
    destroyPopover();
  } else {
    return;
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
  document.querySelector('.shader').classList.add('show');
}

function destroyPopover() {
  document.querySelector('.betainfo').remove();
  document.querySelector('.shader').classList.remove('show');
  event.preventDefault();
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
