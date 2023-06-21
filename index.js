"use strict";
import apiCore from "./core/apiCore.js";

const app = await apiCore();
//@Routes

//* when plugins are loaded start server
app.ready(
  app.listen({ port: 8000 }, (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    } else {
      console.log(`Server running, navigate to  http://localhost:8000`);
    }
  })
);
