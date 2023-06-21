import view from "@fastify/view";
import ws from "@fastify/websocket";
import ejs from "ejs";
// * register optional modules
export default function optionalModules(app) {
  //* register view engine
  app.register(view, {
    engine: {
      ejs: ejs,
    },
  });
  // * register websocket
  app.register(ws);
  return app;
}
