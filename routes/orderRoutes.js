import * as orderModule from "../modules/order/orderModule.js";

export default async function routesOrder(app, options) {
    try {
        orderModule.orderModule(app);

        //* login user
        app.post("/login", async (req, res) => {
            await userModule.login(req, res);
        });

        //* Create new user
        app.post(
            "/addUser",
            { preValidation: [app.authenticate] },
            async (req, res) => {
                await addUser(req, res);
            }
        );
        //* register new user
        app.post("/register", async (req, res) => {
            await userModule.addUser(req, res);
        });
        //* get all users
        app.get(
            "/users",
            { preValidation: [app.authenticate] },
            async (req, res) => {
                await userModule.getAll(req, res);
            }
        );
        //* get user with specyfic id
        app.get(
            "/user/:userID",
            { preValidation: [app.authenticate] },
            async (req, res) => {
                await userModule.getByID(req, res);
            }
        );
        //* activate user with activate token
        app.get("/user/activate/:token", async (req, res) => {
            await userModule.activateUser(req, res);
        });
        //* send token to reset user password
        app.post("/forgetPassword", async (req, res) => {
            await userModule.forgetPassword(req, res);
        });
        //* change user password
        app.put("/changePassword", async (req, res) => {
            await userModule.changePassword(req, res);
        });
        //* change user data
        app.put(
            "/changeUserInfo",
            { preValidation: [app.authenticate] },
            async (req, res) => {
                await userModule.forgetPassword(req, res);
            }
        );
    } catch (error) {
        console.log(error);
    }
}
