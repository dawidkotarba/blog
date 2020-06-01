---
layout: post
title: Java's guy journey to GitHub pages
subtitle: What I learned from the journey?
image: /img/hello_world.jpeg
bigimg: /img/path.jpg
tags: [front-end]
comments: true
---

Recently I have seen a couple of personal pages and they were pretty awesome. They were mostly designed by front-end folks who showed off their great design and coding skills.
As I use GitHub regularly and it offers free hosting static web pages for repositories, I decided to refresh a little bit of my front-end knowledge and create one. I guess a backend guy does not need such a page but I also think having one will not do a harm. I am going to document what I did, maybe it will be useful for someone who would like to develop a similar page and has a little knowledge about a front-end. One disclaimer - I am back-end guy so do not expect any rocket science here, yet the page works and does not hurt eyes I think.

## How GitHub pages work

GitHub can store for free and display a page for its repositories. Generally speaking, it is possible to have one page that will be accessible by the [username.github.io](http://username.github.io) (here is mine: [https://dawidkotarba.github.io](https://dawidkotarba.github.io/)) and multiple pages that will be accessible by the main page URL and repository suffix - like *username.github.io/anotherRepositoryName*. The only thing to remember is that we need to store the static page on either master branch on the main repository or gh-pages branch for other repos. Last but not least, the main repository's name has to be  [username.github.io](http://username.github.io).

GitHub pages can host only static pages, which means HTML + scripts and stylesheets or i.e. Jekyll blog. No fancy Spring Boot jars running there. Obviously, that does not mean the site cannot make ajax calls to the backend but it has to be hosted somewhere else.

## New project in NPM

As I am going to have few dependencies with few cool libraries, I decided to use NPM to manage that. I use Linux as my OS and installing Node.js/NPM is that simple:

```bash
sudo apt install nodejs
```

For Windows, it has to be downloaded from [https://nodejs.org/](https://nodejs.org/).

To create a new project, just type:

```bash
npm init
```

NPM will ask whether we would like to change the default values, for me most of them were good enough. Once we pass all steps, the package.json will be created. The file will contain all dependencies the project needs. Those dependencies can be always downloaded after invoking:

```bash
npm install
```

... and the entie internet will be downloaded to the node_modules folder:)

Below is the example of the package.json for my personal site. I have removed most of the dependencies for the sake of brevity (the full file and all other files I am going to talk about can be found here: [https://github.com/dawidkotarba/dawidkotarba.github.io](https://github.com/dawidkotarba/dawidkotarba.github.io)):

```json
{
  "name": "dawidkotarba.github.io",
  "version": "1.0.0",
  "description": "My resume, under construction forever :)",
  "main": "index.html",
  "scripts": {
    "test": "npm run test-chrome",
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/dawidkotarba/dawidkotarba.github.io.git"
  },
  "author": "Dawid Kotarba",
  "license": "ISC",
  "bugs": {
    "url": "<https://github.com/dawidkotarba/dawidkotarba.github.io/issues>"
  },
  "homepage": "<https://github.com/dawidkotarba/dawidkotarba.github.io#readme>",
  "devDependencies": {
    "@babel/core": "^7.9.0",
  },
  "dependencies": {
    "animate.css": "^3.7.2",
  }
}
```

For those unfamiliar with deps management in package.json:

- ~X.Y.Z - it means "npm update" will update only the patch version (so "Z")
- ^X.Y.Z - it means "npm update" will update only the minor version (so "Y" and "Z" in this case)
If somone wants to upgrade deps, there is a good tool for that - npm-check-updates. It will check and update versions in package.json.

```bash
npm install -g npm-check-updates
ncu -u
```

Of course updating versions of libs always poses some risk so ensure the page is well tested before you commit any changes like that.

## Installing Gulp and saving that to package.json

It is always good to have a tool that will assemble a page. I have used a gulp for that purpose - it is already a few years in the market and there are tons of examples available. As I did not want to spend hours getting familiar with a build tool, it was an easy choice. There are other alternatives like Grunt (which I used in the past and AFAIR seemed pretty similar) or Webpack so there is always an option to experiment further.

To install gulp, let's use NPM:

```bash
npm install gulp --save-dev
```

- --*save-dev* option - it puts a lib under devDependencies section in package.json. They shall be used for the development purpose
- *--save* option - it puts a lib under dependencies section in package.json. They shall be used in prod.

When the install command is invoked with one of the above flags, the dependency will be put inside package.json and this is exactly what we want. Later on, this can be downloaded just by invoking an *npm install* command.

## A general project structure

Ok, so the general build system is there, let's start putting some files. I have spent few minutes analyzing other front-end projects and it looks like one common scenario is to have the *src* folder that contains the source files and the *dist* folder with JS, CSS bundles, and other files needed to run a page (like images, favicons, etc.). So I have followed the same approach. I have also created a few other files, like index.html which will be the actual site (minified), index_dev which I will work on, [README.md](http://readme.md) file to keep build badges and run instructions and additionally installed Cypress ([https://www.cypress.io](https://www.cypress.io/)) that will help me in testing the page. The overall structure looks that way:

```bash
├── cypress
├── cypress.json
├── dist
├── githooks
├── gulpfile.js
├── index_dev.html
├── index.html
├── node_modules
├── package.json
├── README.md
└── src
```

## Site skeleton

I really liked the way how "Twenty seventeen" theme from the WordPress looks like therefore I have used that to build the general look and feel of the site. Of course without the WordPress engine behind - just HTML, scripts and CSS were needed. The theme can be found here:
[https://pl.wordpress.org/themes/twentyseventeen](https://pl.wordpress.org/themes/twentyseventeen)

It is simple, clean, and fast. Exactly what I needed. I have put HTML as index_dev.html and placed JS and CSS in the src folder. Below its structure:

```bash
src
├── css
├── favicon
├── img
└── js
```

Here is the structure of the *dist* folder:

```bash
dist
├── css
├── favicon
├── img
└── js
```

## Build system: pipes and bundling resources

Ok, so with a working HTML skeleton and few JavaScript and CSS files included, it is possible to start a page - just push the code to the repository and access the site's URL. As we are going to include there a bunch of fancy JS libraries, stylesheets, and images, it would be good to optimize the site somehow. Uglyfing, minifying, and bundling our resources can help to achieve that.

### JavaScript files processing:

It is possible to achieve that by a simple Gulp pipeline. First, we need to install several libraries that can do the job (by using NPM as earlier):

```bash
npm install gulp-plumber gulp-concat gulp-uglify --save-dev
```

Additionally, it would be good to use newer JS syntax, so le'ts install Babel that will transpile our shiny JS code:

```bash
npm install --save-dev @babel/core @babel/preset-env --save-dev
```

Last but not least, let's install Browsersync that will refresh our page once resources are modified:

```bash
npm install browser-sync --save-dev
```

Then, we need to require them in the *gulpfile.js* file and create a pipeline with the meaningful name, like js😃 :

```jsx
const gulp = require('gulp');
// Babel as a transpiler
const babel = require('gulp-babel');
// Plumber to show errors
const plumber = require('gulp-plumber')
// Concat to put all libs in same file
const concat = require('gulp-concat');
// To uglify JS
const uglify = require('gulp-uglify');
// To refresh the browser
const browserSync = require('browser-sync').create();

gulp.task('js', (done) => {
    gulp.src(['src/js/pace.min.js',
        'node_modules/lib_from_node_modules.js',
        'src/js/lib_from_src_folder.js'])
        .pipe(plumber())
        .pipe(concat('bundle.js'))
        .pipe(babel({
            presets: [
                ['@babel/env', {
                    modules: false
                }]
            ]
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());

				done();
});
```

Here we go! Our bundle.js file will be placed in the *dist/js* folder ready to use. We can use a typical way to import the file in the HTML (deferred as it needs to be invoked once the HTML loads):

```bash
<script defer src="dist/js/bundle.js"></script>
```

### CSS processing:

A similar story applies to CSS. First, we need to install few libraries that will do the job:

```bash
npm install gulp-minify-css gulp-sass --save-dev
```

Then we need to require it:

```jsx
// to work with Sass files
const sass = require('gulp-sass');
// to do the minification
const minifyCss = require('gulp-minify-css');
// ... we need also to require the previous libraries like gulp or browserSync
// if we have not yet
```

... and write a pipeline:

```jsx
gulp.task('css', (done) => {
    gulp.src(['src/css/**/*.css',
        'src/css/**/*.scss'])
        .pipe(concat('bundle.css'))
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());

    done();
});
```

Our css task will get all css and scss files from the scr/css folder, minify them and put as bundle.css into dist/css directory. To import that into HTML, just add the following:

```html
<link rel="stylesheet" id="bunlde-css" href="dist/css/bundle.css" type="text/css" media="all">h
```

### HTML minification

Last but not least, let's do a similar thing with the HTML file.

======================================

- npm new project (npm init, node modules show, download the internet;)), gulp install, gulpfile
- npm --save vs --save-dev
- project structure: src vs dist
- Gulp tasks:
    - browsersync, how it works (page refresh, CSS injection, sync scroll)
- performance improvements:
    - JS minification, getting from node_modules
    - CSS minification
    - HTML minification
    - bundling
    - Images (imagemin, guetzli etc., progressive jpegs in imagemin, tell about cache and slow network)
    - lazy loading, color placeholders, gradients
    - async and defer in javascript
- quickly about SASS (variables, class names with & etc.)
- introduction to cypress, issues with different browsers, headless mode, present UI
- quickly about npm tasks
- Mobile development, viewport invisible items
- tools to debug:
    - W3 validator ([https://validator.w3.org/](https://validator.w3.org/))
    - lighthouse
    - slow connection in developer tools (slow 3G, disable cache)
- Cool libraries: AOS, animate.css, lozad (show fetch in network)
- Travis configuration

### Extra:

- Google analytics

Links:

- Twenty seventeen from WordPress: [https://pl.wordpress.org/themes/twentyseventeen](https://pl.wordpress.org/themes/twentyseventeen)
- W3 Validator: [https://validator.w3.org](https://validator.w3.org/)
- AOS: [https://github.com/michalsnik/aos](https://github.com/michalsnik/aos)
- Animate CSS: [https://github.com/daneden/animate.css](https://github.com/daneden/animate.css)
- lozad.js: [https://github.com/ApoorvSaxena/lozad.js](https://github.com/ApoorvSaxena/lozad.js)
- Favicon generator: [https://www.favicon-generator.org](https://www.favicon-generator.org/)
- Shadow box generator: [https://www.cssmatic.com/box-shadow](https://www.cssmatic.com/box-shadow)
- Gradient generator: [https://cssgradient.io](https://cssgradient.io/)
- Pace: [https://github.hubspot.com/pace/docs/welcome](https://github.hubspot.com/pace/docs/welcome)
