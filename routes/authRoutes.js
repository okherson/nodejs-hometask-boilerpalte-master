const { Router } = require('express');
const AuthService = require('../services/authService');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.post('/login', (req, res, next) => {
    try {
        // TODO: Implement login action (get the user if it exist with entered credentials)
        const data = {
            "email": req.body.email,
            "password": req.body.password
        };
        const user = AuthService.login(data);
        res.send(user);
    } catch (err) {
        res.status = err.message.includes('not found') ? 404 : 400;
        res.message = err.message;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;