# blog
My personal miniblog - under construction

### Credits:
- Theme: https://github.com/daattali/beautiful-jekyll

Images from Unsplash by:
- Victor Malyushev
- Shahadat Rahman
- Greg Rakozy
- Martin Wilner
- Aryan Dhiman
- Esteban Lopez

### Build:
```
docker build -t blog "$PWD"
docker run -d -p 4000:4000 --name blog -v "$PWD":/srv/jekyll blog
```

or execute "docker_install_run.sh" from "scripts" folder.

### Run:
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