/*
//* Load core functions that are nessesery to work correctly
//* Do not comment or remove!
//* Do not change if is not nessesery!
*/
import fastify from "fastify";
import envFastify from "@fastify/env";
import sequelizeFastify from "fastify-sequelize";
import fastifyStatic from "@fastify/static";
import path from "path";
import fastifyMailer from "fastify-mailer";
import authenticate from "./authentication.js";
import optionalModules from "./optionalModules.js";
import routes from "./routes.js";
import schema from "./envSchema.js";

const serverPath = path.resolve();
var app = fastify({
  logger: true,
  //! uncomment if use https
  // https: {
  //   key: fs.readFileSync(path.join(__dirname, "file.key")),
  //   cert: fs.readFileSync(path.join(__dirname, "file.cert")),
  // },
});
export default async function apiCore() {
  try {
    //* Get .env variables to global.env
    await app.register(envFastify, {
      dotenv: true,
      schema: schema(),
    });
    //* plugin to serve static files like css, js
    app.register(fastifyStatic, {
      root: `${serverPath}/assets`,
      prefix: "/assets", // optional: default '/'
    });
    //* plugin for use and verify user jwt token
    app = authenticate(app);
    //* mailer plugin
    app.register(fastifyMailer, {
      defaults: {
        from: app.config.EMAIL_FROM,
        subject: "default example",
      },
      transport: {
        host: app.config.EMAIL_PROVIDER,
        port: app.config.EMAIL_PORT,
        secure: true, // use TLS
        auth: {
          user: app.config.EMAIL_ADDRESS,
          pass: app.config.EMAIL_PASSWORD,
        },
      },
    });
    //* DB connection with server
    app
      .register(sequelizeFastify, {
        instance: "db",
        autoConnect: true,
        database: app.config.DATABASE_NAME,
        dialect: app.config.DATABASE_DIALECT,
        host: app.config.DATABASE_HOST,
        username: app.config.DATABASE_USER,
        password: app.config.DATABASE_PASSWORD,
        port: 5432,
        dialectOptions: {
          encrypt: true,
          trustedConnection: true,
          requestTimeout: 30000, // 30 seconds
        },
      })
      .ready((error) => {
        if (error) {
          console.log(error);
        }
      });
    //* register optional functions
    app = optionalModules(app);
    //* register routes
    app = routes(app);
    return app;
  } catch (error) {
    console.log(error);
    return null;
  }
}
