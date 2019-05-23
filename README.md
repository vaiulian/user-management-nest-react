# user-management-nest-react
A functional user management system


## Webserver

- is running NestJS with Typescript
- REST API protected by PassportJS JWT Authentication strategy
- Swagger exposed on http://localhost:3000/api/

## Webclient

- is backed by ReactJS v15
- powerd by Redux and React-Router v5

### Actions

- by default you can log in with:

```
username: admin
password: admin123
```

- feel free to register a new user and access the application
- once you log in, a `JWT` will be saved in `localStorage`
- the routes `/`, `/users/:id` and `/users/new` are protected by JWT
- the routes `/register`, `/login` are free to access
- accesing `/register` or `/login` will automatically logout the user

## Instalation

```
git clone git@github.com:vaiulian/user-management-nest-react.git
cd user-management-nest-react
docker-compose up
access http://localhost:3001
```

Alternatively you could

```npm run start```

in `client` and `server` folder, but i like `DOCKER` :-J