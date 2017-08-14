## Introduction

This is a Book Reader App. Feel free to use this App to search/record to make a reading plan.

## Installation

1. Go to the current folder, and `npm install` all the dependencies (**It is recommended to use `yarn install`**)
2. To start the dev server, use `npm start`(or yarn start) and web browser will be automatically open at `http://127.0.0.1:3000/`
3. To build for production, use `npm build`(or yarn build)

## Technical Stack

* React /  React Router

## Development Log

* Aug 2nd, 2017: First commit, create-react-app
* Aug 3rd - 6th: Find out how to transfer data among components. Write all the components.
* Aug 7th - 14th, 2017: Finish components functionally.

## Descriptions

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Main Source Code List

I have arranged the code structure so that we can develop easily.

- src
  * /api (BooksAPI)
  * /common (css/icons/js util functions)
  * /components
    - /book
    - /bookshelf
    - /bookshelf-changer
    - /loading
    - /search-books
  * /config (Definitions)
  * App.js (The main page)
  * index.js (React Entrance)

### Components and Routers

- Root
  - bookshelf(loop by categories)
    - book(loop by books)
      - bookshelf-changer
- /create
  - search-books
    - book(loop by books)
      - bookshelf-changer

## License

This project is under the license of GPL-v3.0. Detail information can be found on [here](https://github.com/liu599/BookReader/blob/master/LICENSE)