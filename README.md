# MagottyAlumni Master Repository Overview

## Introduction
The MagottyAlumni Master repository is a comprehensive codebase for an alumni platform. The platform appears to be designed for alumni of the Magotty institution to interact, share news, participate in events, and even shop for products. The codebase is structured with a server-side component built using Node.js and a client-side component developed using Vue.js.

## Core Functionality
1. **User Authentication**: The repository provides routes and models for user registration, login, and profile management.
2. **News & Events**: Alumni can stay updated with the latest news and events related to the institution.
3. **Shopping**: A complete shopping cart system is implemented, allowing users to browse products, add them to their cart, and proceed with the order and payment process.
4. **Admin Management**: There's a dedicated admin section for managing various aspects of the platform.
5. **Q&A Page**: A section where users can ask questions and get answers, fostering community interaction.

## Relevant Files & Descriptions

- **Server Side**:
  - [index.js](https://github.com/omnidox/MagottyAlumni-master/blob/master/server/index.js) - Main server entry point.
  - [cart.js](https://github.com/omnidox/MagottyAlumni-master/blob/master/server/model/cart.js) - Model for the shopping cart.
  - [events.js](https://github.com/omnidox/MagottyAlumni-master/blob/master/server/model/events.js) - Model for events.
  - [news.js](https://github.com/omnidox/MagottyAlumni-master/blob/master/server/model/news.js) - Model for news articles.
  - [orders.js](https://github.com/omnidox/MagottyAlumni-master/blob/master/server/model/orders.js) - Model for handling orders.
  - [db.js](https://github.com/omnidox/MagottyAlumni-master/blob/master/server/config/db.js) - Database configuration for the server.
  - [resources.js](https://github.com/omnidox/MagottyAlumni-master/blob/master/server/router/resources.js) - Routes for handling resources.
  - [shopping.js](https://github.com/omnidox/MagottyAlumni-master/blob/master/server/router/shopping.js) - Routes for the shopping functionality.


- **Client Side**:
  - [App.vue](https://github.com/omnidox/MagottyAlumni-master/blob/master/src/App.vue) - Main Vue component.
  - [axios.js](https://github.com/omnidox/MagottyAlumni-master/blob/master/src/axios.js) - Configuration for Axios, a promise-based HTTP client.
  - [NavBar.vue](https://github.com/omnidox/MagottyAlumni-master/blob/master/src/components/NavBar.vue) - Navigation bar component.
  - [Bottom.vue](https://github.com/omnidox/MagottyAlumni-master/blob/master/src/components/Bottom.vue) - Bottom component, possibly a footer.
  - [main.js](https://github.com/omnidox/MagottyAlumni-master/blob/master/src/main.js) - Main entry point for the Vue application.
  - [router.js](https://github.com/omnidox/MagottyAlumni-master/blob/master/src/router.js) - Vue Router configuration.
  - [Q&APage.vue](https://github.com/omnidox/MagottyAlumni-master/blob/master/src/views/Q&APage/Q&APage.vue) - The Q&A page component.
  - [Admin.vue](https://github.com/omnidox/MagottyAlumni-master/blob/master/src/views/adminPage/Admin.vue) - The admin page component.
  - [Donate.vue](https://github.com/omnidox/MagottyAlumni-master/blob/master/src/views/donatePage/Donate.vue) - The donation page component.
  - [Events.vue](https://github.com/omnidox/MagottyAlumni-master/blob/master/src/views/eventsPage/Events.vue) - The events page component.
  - [Forget.vue](https://github.com/omnidox/MagottyAlumni-master/blob/master/src/views/forgetPage/Forget.vue) - The forget password page component.
  - [History.vue](https://github.com/omnidox/MagottyAlumni-master/blob/master/src/views/historyPage/History.vue) - The history page component.
  - [Login.vue](https://github.com/omnidox/MagottyAlumni-master/blob/master/src/views/loginPage/Login.vue) - The login page component.
  - [Main.vue](https://github.com/omnidox/MagottyAlumni-master/blob/master/src/views/mainPage/Main.vue) - The main landing page component.
  - ... (and more Vue components and views)

## Project By
The Mondays:
- Rafael Hidalgo
- Nesreen Salah
- Davaughn Hoots
- Laura Paulino

## Installation of Necessary Software
- **Nodejs**:
  - Download Link: [Nodejs](https://nodejs.org/en/download/)
  - Youtube Instructions: [Nodejs Installation](https://www.youtube.com/watch?v=qYwLOXjAiwM&ab_channel=Simplilearn)
  
- **MongoDB**:
  - Download Link: [MongoDB](https://www.mongodb.com/try/download/community)
  - Youtube Instructions: [MongoDB Installation](https://www.youtube.com/watch?v=QTZmA1kCEEw&ab_channel=GridoWit)
  
- **WebStorm**:
  - Download Link: [WebStorm](https://www.jetbrains.com/webstorm/download/#section=windows)
  - Youtube Instructions: [WebStorm Installation](https://www.youtube.com/watch?v=gwoOeRJfv9s&ab_channel=GeekyScript)

## Conclusion
The MagottyAlumni Master repository is a well-structured platform that caters to the needs of an alumni community. From user authentication to news, events, and shopping, it offers a wide range of features to keep the alumni engaged and connected.

