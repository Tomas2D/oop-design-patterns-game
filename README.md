# Intro
- Written in TypeScript
- Based on PIXI.js framework

# How to start?

## With docker

```
docker build -t dvorat19_app .
docker run -p 8000:80 -it dvorat19_app # app will be on http://localhost:8000
```

For delete, simply run: `docker rmi dvorat19_app`

## How to run test?

```
yarn test
```
