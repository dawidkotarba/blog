---
layout: post
title: Creating a personal GitHub page - view from the backend guy
subtitle: GitHub pages can be a good choice for a personal resume. Let's create such.
image: /img/hello_world.jpeg
bigimg: /img/path.jpg
tags: [front-end]
comments: true
---

Recently I have seen a couple of personal pages and they were pretty awesome. They were mostly designed by front-end folks who showed off their great design and coding skills.
As I use GitHub regularly and it offers free hosting static web pages for repositories, I decided to refresh a little bit of my front-end knowledge and create one. I guess a backend guy does not need such a page but I also think having one will not harm. I am going to document what I did, maybe it will be useful for someone who would like to develop a similar page. One disclaimer -  I am back-end guy so do not expect any rocket science here, yet the page works and looks fine I think :)

### New project in NPM
As I am going to have few dependencies on a cool libraries, I decided to use NPM to manage that. As I use linux, installing nodejs/npm is that simple:

```bash
sudo apt install nodejs
```

For Windows, it has to be downloaded from https://nodejs.org/.

To create a new project, just type:
```bash
npm init
```
NPM will ask whether we would like to change the default values. Once we pass all steps, the package.json will be created. The file will contain all dependencies the project needs. Those dependencies can be always downloaded after invoking:
```bash
npm install
```
... and the whole internet will be downloaded to the node_modules folder.

Below the example of the package.json for my personal site. I have removed most of dependencies for brevity.

```javascript
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
    "url": "https://github.com/dawidkotarba/dawidkotarba.github.io/issues"
  },
  "homepage": "https://github.com/dawidkotarba/dawidkotarba.github.io#readme",
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
- ^X.Y.Z - it means  "npm update" will update only the minor version (so "Y" and "Z" in this case)
If somone wants to upgrade deps, there is a good tool for that - npm-check-updates. It will check and update versions in package.json.
```bash
npm install -g npm-check-updates
ncu -u
```

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
  - W3 validator (https://validator.w3.org/)
  - lighthouse
  - slow connection in developer tools (slow 3G, disable cache)
- Cool libraries: AOS, animate.css, lozad (show fetch in network)
- Travis configuration

### Extra:
- Google analytics

Links:
- Twenty seventeen from WordPress: https://pl.wordpress.org/themes/twentyseventeen
- W3 Validator: https://validator.w3.org
- AOS: https://github.com/michalsnik/aos
- Animate CSS: https://github.com/daneden/animate.css
- lozad.js: https://github.com/ApoorvSaxena/lozad.js
- Favicon generator: https://www.favicon-generator.org
- Shadow box generator: https://www.cssmatic.com/box-shadow
- Gradient generator: https://cssgradient.io
- Pace: https://github.hubspot.com/pace/docs/welcome
