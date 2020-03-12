# blog
My personal blog - under construction

### Credits:
- Theme: https://github.com/daattali/beautiful-jekyll

### Build:

docker build -t blog "$PWD"
docker run -d -p 4000:4000 --name blog -v "$PWD":/srv/jekyll blog

### Run:
docker start blog
docker stop blog