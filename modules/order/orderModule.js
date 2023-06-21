import crypto from "crypto";
import orderModel from "../../models/order/orderModel.js";
import responsError from "../errors.js";
import mail from "../mailer.js";
var userModel;
var fastify;

export async function orderModule(app) {
    fastify = app;
    userModel = orderModel(app);
    // userModel.sync({ force: true });
}

export async function addOrder(req, res) {
    const t = await fastify.db.transaction();
    try {
        req.body.activationToken = crypto.randomBytes(20).toString("hex");
        req.body.password = crypto
            .createHmac("sha512", req.body.password)
            .update(app.config.PASSWORD_HASH)
            .digest("hex");
        await userModel.create(req.body, { transaction: t });
        await mail(fastify, req.body.email, "New account created", "addNew", {
            token: req.body.activationToken,
        });
        await t.commit();
        res.send({ status: "OK" });
    } catch (error) {
        console.log(error);
        await t.rollback();
        responsError(error, res);
    }
}

export async function getAll(req, res) {
    try {
        let user = await userModel.findAll();
        if (Object.keys(user).length === 0) throw "Not found";
        res.send({ status: "OK", data: user });
    } catch (error) {
        responsError(error, res);
    }
}
export async function login(req, res) {
    try {
        req.body.password = crypto
            .createHmac("sha512", req.body.password)
            .update(app.config.PASSWORD_HASH)
            .digest("hex");
        let user = await userModel.findAll({
            attributes: ["id", "email", "role"],
            where: { email: req.body.email, password: req.body.password },
            limit: 1,
        });
        if (Object.keys(user).length === 0) throw "Not found";
        const token = fastify.jwt.sign({ user });
        res.send({ status: "ok", data: token });
    } catch (error) {
        responsError(error, res);
    }
}

export async function getByID(req, res) {
    try {
        let user = await userModel.findAll({
            where: { id: req.params.userID },
        });
        if (Object.keys(user).length === 0) throw "Not found";
        res.send({ status: "ok", data: user });
    } catch (error) {
        responsError(error, res);
    }
}
export async function activateUser(req, res) {
    try {
        let user = await userModel.update(
            { activationToken: null, active: true },
            {
                where: { activationToken: req.params.token, active: false },
            }
        );
        if (Object.keys(user).length === 0) throw "Not found";
        res.send({ status: "ok", data: "User activated" });
    } catch (error) {
        responsError(error, res);
    }
}
export async function forgetPassword(req, res) {
    try {
        let user = await userModel.update(
            { recoveryToken: crypto.randomBytes(20).toString("hex") },
            {
                where: { email: req.body.email, active: true },
            }
        );
        if (Object.keys(user).length === 0) throw "Not found";
        res.send({ status: "ok", data: "User activated" });
    } catch (error) {
        responsError(error, res);
    }
}
