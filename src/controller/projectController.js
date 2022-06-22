const express = require('express');

const router = express.Router();

const autMiddleware = require('../middlewares/auth');

router.use(autMiddleware);

router.get('/',(req, resp) => {
    resp.send({ok:true, Id: req.userId});
});

module.exports = (app) => app.use("/projects", router);

