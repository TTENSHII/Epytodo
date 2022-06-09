# EPYTODO

## Project :bookmark_tabs:

- Introduction to Web development
- Build an API
- Create a TODO app
- Use node.js and mysql

## Routes :city_sunset:

- We had to create the following routes
- We had to use json web token to secure some routes

|Route              |Method|Protected|Description|
|:------------------|:-----|:--------|:----------|
|/register          |POST  |NO       |Register a new user|
|/login             |POST  |NO       |Connect a user|
|/user              |GET   |YES      |View all user information|
|/user/todos        |GET   |YES      |View all user tasks|
|/users/:id or :email|GET   |YES      |View user information|
|/users/:id          |PUT   |YES      |Update user information|
|/users/:id          |DELETE|YES      |Delete user|
|/todos              |GET   |YES      |View all the todo|
|/todos/:id          |GET   |YES      |View the todo|
|/todos              |POST  |YES      |Create a todo|
|/todos/:id          |PUT   |YES      |Update a todo|
|/todos/:id          |DELETE|YES      |Delete a todo|

## Install requirements :flower_playing_cards:
- [NodeJS]([https://nodejs.org/en/download/package-manager/](https://nodejs.org/en/download/))
- [MySQL](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04-fr)
- make an .env file (see below)

## Install :flags:

- Clone repository
```
git clone git@github.com:TTENSHII/Epytodo.git
cd EpyTodo
```

- Install all dependencies:
```
npm install
```

- Run epytodo
```
npm start
```

## .env file :wrench:

You need to setup a .env file that contain:

- APP_PORT : the port to launch the app
- APP_HOST : host of the app (probably localhost)

- MYSQL_DATABASE : epytodo
- MYSQL_USER : mysql user
- MYSQL_PASSWORD : mysql password
- SECRET : for the Json Web Token
