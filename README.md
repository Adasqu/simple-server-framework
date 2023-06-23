# **Simple Server Framework**

Simple and fast framework to serve API with Fastify and some usefull plugins to create simple API webserwer (and some simple front).

## **TODO LIST**

- [x] Scheme of API structure
- [x] Scheme of API endpoits
- [ ] Core functions
  - [x] Database connection
  - [x] Serve static files (styles.css, images etc)
  - [x] Authentication
  - [x] Authorization (not tested)
  - [x] Mailer
- [ ] Optional modules
  - [x] Firebase (not tested)
  - [x] WebSocket

## **System directory and structure**

- **APISchemas** this directory contain scheme of requests and responses to all routes if you create new route you must test it here and commit with route commit!
- **assets** some useless files like .css or .jpeg which are serve statically when you call http(s)://server:port/assets/you/path/to/file.
- **core** core app functions like: register plugins, add routes schemas or auth.
- **models** directory with models of data that are uses in Database to CRUD.
- **modules** all logic needed for routes.
- **routes** routes tell app what whitch endpoits are in use and what response are restricted. Allways create schema of route in APISchema!!!
- **view** if server have static code not only endpoints API use this to show UI.

## **How use**

1. Create new model.
2. Create new route in routes directory.
3. Create logic in modules directory.
4. Register route in core/routes.js file.
5. Test routes in APISchemas.
6. Commit your new part of application.
7. Repeat if your are not done.

## **How create and test APISchemas**

1. On VS code install REST Client extension
2. Create directory under APISchemas contain name of your module like: users, orders etc.
3. In this directory create every files that's names are name's of your routes with .txt extension.
4. Copy/paste of example test and change endpoints (change post body if needed or remove it if request is get/delete)
5. Add sample response
6. Test it.
7. Done :)
