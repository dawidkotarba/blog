[![Build Status](https://travis-ci.org/dawidkotarba/blog.svg?branch=master)](https://travis-ci.org/dawidkotarba/blog)
[![codebeat badge](https://codebeat.co/badges/f7bad784-7732-4cd8-a27f-de09ad3f49f9)](https://codebeat.co/projects/github-com-dawidkotarba-blog-gh-pages)

# https://dawidkotarba.github.io/blog
My personal miniblog

### Build:
```bash
npm install
docker build -t blog "$PWD"
docker run -d -p 4000:4000 --name blog -v "$PWD":/srv/jekyll blog
```

or execute "docker_install_run.sh" from "scripts" folder.

To install ruby gems:
```bash
bundle install
```

### Run/Stop:

#### Option 1) Jekyll:
```bash
npm run jekyll
npm run jekyll-stop
```

#### Option 2) Docker:
```bash
docker start blog
docker stop blog
```
or
```bash
docker restart blog
```

or execute "restart.sh" from "scripts" folder.
Page will be available at http://localhost:4000/

### Testing:

#### Option 1) Jekyll:
```bash
npm run test
npm run cypress

```

#### Option 2) Docker:
```bash
npm run test-docker
npm run cypress-docker
```

### Credits:
- Theme: https://github.com/daattali/beautiful-jekyll

Images from Unsplash by:
- Victor Malyushev
- Shahadat Rahman
- Greg Rakozy
- Martin Wilner
- Aryan Dhiman
- Esteban Lopez
- seth schwiet

- Few awesome libraries used:
    - AOS: https://github.com/michalsnik/aos
    - Animate CSS: https://github.com/daneden/animate.css
    - lozad.js: https://github.com/ApoorvSaxena/lozad.js
    - Pace: https://github.hubspot.com/pace/docs/welcome
    - Back top scroll indicator: https://www.jqueryscript.net/other/back-top-scroll-indicator.html
    - Read time: https://www.jqueryscript.net/other/Medium-Inspired-jQuery-Read-Time-Estimating-Plugin-readtime.html
