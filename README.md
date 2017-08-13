## Introduction

This is a Book Reader App. Feel free to use this App to search/record to make a reading plan.

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
