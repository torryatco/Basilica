# V - Basilica!

## Homework

* Read [this article](https://medium.freecodecamp.org/learn-css-grid-in-5-minutes-f582e87b1228) (and follow along in your text editor) on CSS Grids
* See how far you can get in [Grid Garden](http://cssgridgarden.com/)
* Watch [an intro](https://youtu.be/gKyRqFgJt6k) to Node Package Manager

## Terminal Basics

Windows users should use the Git Bash terminal (installed along with Git) for best results

Here are some of the shell commands we covered last class:

```sh
$ cd <PATH> // copy and paste the folder you want to go to
$ cd ~ // go to your home directory
$ cd Desk // tab completion
$ cd .. // go up one level
$ ls
$ls -al  // flags expand the command
$ pwd
```

## Node Package Manager

[Node Package Manager](https://www.npmjs.com) is an essential part of the web design and development ecosystem.

[Node](https://nodejs.org/en/) includes NPM as part of its install

### NPM Manifest

```bash
$ npm init
$ npm install browser-sync --save
$ touch .gitignore
```

Notes

* package.json
* package-lock.json
* dependencies
* node_modules folder
* discuss the need for `.gitignore`.

Browser Sync [CLI documentation](https://www.browsersync.io/docs/command-line)

```js
"scripts": {
  "startmac": "browser-sync start --directory --server 'app' --files 'app'",
  "startpc": "browser-sync start --directory --server \"app\" --files \"app\""
},
```

If the repo comes with a package.json file (aka 'manifest') run `npm install` to install:

```
npm install
```

In the terminal:

`$ npm run startmac`

or, if you're on a PC:

`$ npm run startpc`

Note - the startpc script will work on Macs.

## Initialize a GIT Repo

```sh
$ touch .gitignore // edit to include 'node_modules'
$ git init
$ git add .
$ git commit -m 'initial commit'
```

Create a branch in VS Code.

Log into [Github](http://github.com) and create a new repo.

Follow the instructions to create a remote and push the master branch to the remote.

## Basilica

![Image of Basilica](app/img/FINAL.png)

Open `app/index.html` and examine code with regards to the [recipe schema](https://schema.org/Recipe) at [schema.org](http://schema.org/docs/gs.html).

Here is an [article that addresses the recipe schemas](https://www.foodbloggerpro.com/blog/article/what-is-recipe-schema/) but note that there are [many different kinds](https://schema.org/docs/full.html).

Note the `<abbr>` tag and the absence of a wrapper div (even though the design shows a centered document).

Normally you will start off with a few known styleguide settings. Let's define a couple [css variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) in `app/css/styles.css`:

```css
html {
  --basil-green: #88a308;
  --dark-gray: #333333;
  --light-gray: #999999;
  --max-width: 840px;
  --breakpoint: 640px;
}
```

CSS variables are applied as follows:

```css
<property>: var(--basil-green);
```

### Starter formatting

```css
* {
  margin: 0;
  padding: 0;
}
body {
  font: 100%/1.5 "Segoe UI", Candara, "Bitstream Vera Sans", "DejaVu Sans", "Bitstream Vera Sans", "Trebuchet MS", Verdana, "Verdana Ref", sans-serif;
  color: var(--dark-gray);
  max-width: var(--max-width);
  margin: 0 auto;
  margin-top: 24px;
}
```

Note the use of `max-width` on the body selector - we applied these to a div in the past.

## Responsive Images

[Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images):

```css
img {
    width: 100%;
    height: auto;
}
```

At a bare minimum, you will almost always use `width: 100%` on images and videos. 

Edit the HTML to use `figure` and `figcaption` tags:

```html
<figure>
  <img src="img/pesto.jpg" alt="Italian pesto" />
  <figcaption>Classic, simple basil pesto recipe with fresh basil leaves, pine nuts, garlic, Romano or Parmesan cheese, extra virgin olive oil, and salt and pepper.</figcaption>
</figure>
```

Note: a `<figure>` tag denotes an image, illustration, diagram, code snippet, etc. that is referenced in the main flow of a document, but that can be moved to another part of the document or to an appendix without affecting the main flow.

We want to display identical image content, just larger or smaller depending on the device. The standard `<img>` element only lets you point the browser to a single source file. We will use two new attributes — `srcset` and `sizes` — to provide additional source images along with hints to help the browser pick the right one.

* Upload `pesto.jpg` to a generator such as [responsivebreakpoints.com](https://www.responsivebreakpoints.com/). Download the zip file and place the unzipped folder in the `img` directory.

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
    img/pesto/pesto_iodywc_c_scale,w_380.jpg 380w,
    img/pesto/pesto_iodywc_c_scale,w_780.jpg 780w,
    img/pesto/pesto_iodywc_c_scale,w_1069.jpg 1069w,
    img/pesto/pesto_iodywc_c_scale,w_1337.jpg 1337w,
    img/pesto/pesto_iodywc_c_scale,w_1380.jpg 1380w"

    src="img/pesto/pesto_iodywc_c_scale,w_1380.jpg"

    alt="Italian pesto"
  >
</picture>
```

`srcset` defines the set of images we will allow the browser to choose between, and what size each image is.

It consists of:

1. Am image path / filename
1. A space
1. The image's inherent width (real size) in pixels using a `w` unit (not `px`).

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

Using this technique can save a lot of bandwidth. Older browsers that don't support these features will just ignore them, and go ahead and load the image referenced in the `src` attribute as per usual.

You can check the results of your work by viewing the Network tab in the inspector and noting which image was downloaded at a variety of screen sizes.

The `<picture>` tag can be used for cropping or modifying images for different media conditions _or_ offering different image formats when certain formats are not supported by all browsers. See the [example](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) on MDN.

## Layout

We'll start by using float on the two main content columns:

```css
article,
aside {
  float: left;
  width: 50%;
  padding: 16px;
}
```

Add `box-sizing: border-box;` to the article / aside rule.

```css
article,
aside {
    ...
    box-sizing: border-box;
}
```

Move it to a universal selector so it applies to all the boxes. See [Paul Irish](https://www.paulirish.com/2012/box-sizing-border-box-ftw/) on box-sizing.

```css
html {
    box-sizing: border-box;
}
*,
*:before,
*:after {
    box-sizing: inherit;
}
```

Note the footer. Because both columns have been floated it can wrap.

```css
footer {
  clear: both;
  background-color: var(--basil-green);
  padding: 1rem;
  border-radius: 0 0 4px 4px;
  margin-bottom: 2rem;
}
```

Try toggling the clear property in the inspector.

### Old School Faux Columns

Since the two columns can be of different heights and our design calls for two columns of a different color we can not color the aside and article divs. We'll use an old technique for the moment and change it later.

Examine the background image `html.png`.

```css
.content {
  background: url(img/html.png) repeat-y 50% 50%;
}
```

Note that we cannot see the background image. The content div has collapsed because its direct children have been floated. We have looked at a number of methods that can be used to prevent collapsing. E.g.:

```css
.content {
    background: url(img/html.png) repeat-y 50% 50%;
    float: left;
}
```

We will use the clearfix method instead of float to prevent collapsing.

### ::Pseudo-elements vs :Pseudo-classes

```txt
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

### Clearfix

Clearfix is an important method often used in conjunction with float based layouts to control collapsing.

_Disable the float:left rule on the content before applying these._

```css
.content:after {
  content: 'boo';
  display: block;
  clear: both;
}
```

```css
.content:after {
  content: '.';
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
```

The method uses `:after` to insert a character after the div and then sets it to `display: block` and `clear: both` to prevent collapsing and then hides it.

Since box collapsing is rather common, designers frequently create a generic class for use elsewhere.

Update the method to something shorter and more modern and apply the cf classname to the content div:

```css
.cf::before,
.cf::after {
    content: ' ';
    display: table;
}

.cf::after {
    clear: both;
}
```

Apply it to the content div:

```html
<div class="cf content">
```

Examine the html in the inspector. Look for `::before` and `::after` after the content div. We'll return to the :before and :after pseudo-classes later.

## Mobile First Layout with Floats

1. stack the article and aside on top of each other in small screen and remove the background image:

```css
.content {
    /*background : url(img/html.png) repeat-y 50% 50%;*/
}

article,
aside {
    padding: 1rem;
}
```

2. add back the features necessary for two column display on wide screens:

```css
@media only screen and (min-width: 600px) {
  .content {
    background: url('img/html.png') repeat-y 50% 50%;
  }
  article,
  aside {
    float: left;
    width: 50%;
    padding: 16px;
  }
}
```

Note that, unlike previous responsive examples in this class, we are _adding_ styles to the wide screen view using `min-width`. In previous examples we were adding styles to the small screen using `max-width`.

Aside: If we try to use a variable as a breakpoint value it won't work:

```css
@media only screen and (min-width: var(--breakpoint)) {
  ...
}
```

A media query is not an element selector, it does not inherit styles.

## Flex columns

Refactor the article and aside columns, this time to use flexbox. (Applies only to widescreen view.)

Remove the float property, change the column widths, remove the background image and add column effect via css:

```css
@media only screen and (min-width: 640px) {
  .content {
    display: flex;
  }
  article {
    flex: 1 0 60%;
  }
  aside {
    background: #f5faef;
    box-shadow: -4px 0px 4px #ddd;
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

Note: Since we are not using floats we no longer need to use clearfix for the content div or `clear: both` for the footer.

Clean up the CSS by removing the clearfix (and its class in the html).

### Format Basic Content

```css
h2,
h3 {
  color: var(--basil-green);
  margin: 8px 0;
  font-size: 1.4rem;
  letter-spacing: -1px;
}

a {
  color: #f90;
  text-decoration: none;
  transition: color 0.5s linear;
}

a:hover {
  color: #f00;
}

li > h4 {
  margin-top: 12px;
}

aside li {
  list-style: none;
}

article li,
article ol {
  margin-left: 1rem;
  margin-bottom: 0.5rem;
}

figcaption {
  font-size: 0.75rem;
}
```

Note `li > h4` [selector](https://www.w3schools.com/cssref/css_selectors.asp). It is used to select elements with a _specific parent_. In this case it will select `h4` tags _only_ when they are proceeded by an `li`. 

Take a moment to examine a [complete listing](https://www.w3schools.com/cssref/trysel.asp?selector=li:nth-child(1)) of selector types in CSS. Note the `:root` selector. This is the usual selector used for CSS variables.

Note also: the transition property on the anchor selector. This is a shortcut for:

```css
transition-property: color;
transition-duration: 1s;
transition-timing-function: linear;
```

or `transition: color 0.2s linear;`

### Animate Links

Confine this effect to anchors within the content div. Replace the generic hover with:

```css
.content a:hover {
    color: var(--basil-green);
}
```

## The Branding Header

Add the green background to the branding div.

```css
header {
    position: relative;
    height: 120px;
    background: var(--basil-green);
    border-radius: 8px 8px 0px 0px;
}
```

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

Note: image is 272px by 170px.

```css
header h1 {
  padding-left: 260px;
  padding-top: 90px;
    ...;
}
```

Note - when using custom fonts like this `font-weight: normal;` is necessary because normally header tags like h1 are bold and we do not have a bold version of the font here.

We cannot see the text because we have added padding. Use transform to tweak the positioning:

```css
header h1 {
    transform: translateX(-100px);
    transform: translateY(-80px);
    ...
}
```

Note the transform in the inspector - it doesn't work this way.

Use this format instead:

```css
header h1 {
  transform: translate(-100px, -80px);
  ...
}
```

Note: transforms are an [important property](https://www.w3schools.com/cssref/css3_pr_transform.asp) when it comes to creating animations. We'll see an example shortly.

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

Add a hover, transform and animate:

```css
header a.beta:hover {
    transform: rotate(0deg) scale(1.2);
}
```

```css
header a.beta {
    ...
    transform: rotate(20deg);
    transition: all 1s ease;
}
```

Note the use of svg for the background image. Examine the svg in Sublime text.

### Header Branding Responsive Design

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
}
```

Note: there is no hover in touch screen devices.

### Navigation Flexbox

Basic [usage](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

```css
nav {
    background: #e4e1d1;
    border-top: 0.5rem solid #ebbd4e;
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
  ...
  justify-content: space-between;
}
```

Since we are using flexbox we _could_ have the navigation elements appear before the paragraph by simply adding `order: -1;` to the unordered list and then reversing the margin on the paragraph to `margin-right: auto;`.

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
  ...
  min-width: 120px;
  display: inline-block;
}
```

## CSS Grid

Flexbox operates in a [single dimension](https://hackernoon.com/the-ultimate-css-battle-grid-vs-flexbox-d40da0449faf): x or y. CSS Grid operates in both.

Our use of Flexbox to style the content columns operates in a single (horizontal or x) dimension. We can use CSS Grid but only need to specify one dimension.

```css
@media only screen and (min-width: 640px) {
  .content{
    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
    /*grid-template-rows: 20% 20% 20% 20% 20%;*/
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

Final:

```css
@media only screen and (min-width: 640px) {
  .content{
    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
    grid-template-rows: 100%;
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

Time permitting, configure and use the SASS compiler in VS Code.

## Notes

```js

```