import userRoutes from "../routes/userRoutes.js";
import orderRoutes from "../routes/orderRoutes.js";
import viewsRoutes from "../routes/viewsRoutes.js";

// const userRoutes = require("../routes/userRoutes.js");
// const orderRoutes = require("../routes/orderRoutes.js");
export default function routes(app) {
  app.register(viewsRoutes);
  app.register(userRoutes, { prefix: "api" });
  // app.register(orderRoutes, { prefix: "api" });

  return app;
}
