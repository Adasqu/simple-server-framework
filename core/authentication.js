import jwt from "@fastify/jwt";
import auth from "@fastify/auth";

export default function authenticate(app) {
  app.register(jwt, { secret: app.config.SECRET });
  app.decorate("authenticate", async (req, res) => {
    try {
      await req.jwtVerify();
    } catch (err) {
      res.status(401);
      res.send({ status: "Error", data: "Not authenticate" });
    }
  });
  return app;
}

export function authorization(app) {
  app.decorate("authorization", async (req, res) => {
    try {
      console.log(req.headers);
      await req.jwtVerify();
      if (req.user.role != "admin")
        throw "Not permitted user"
    } catch (err) {
      res.send({ status: "Error", data: "Not permitted" });
    }
  });
  return app;
}
