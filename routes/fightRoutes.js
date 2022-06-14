const { Router } = require('express');
const FightService = require('../services/fightService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');


const router = Router();

// OPTIONAL TODO: Implement route controller for fights
router.get('/', function (req, res) {
    const fights = FightService.getAll();
    if (fights) {
        res.status(200).send(fights);
    } else {
        const error = {
            "error": true,
            "message": "fights not found!"
        };
        res.status(400).send(JSON.stringify(error));
    }
});

router.post('/', function (req, res) {
    const fight = FightService.create(req.body);
    if (fight) {
        res.status(200).send({"message": "fight creation success!"});
    } else {
        const error = {
            "error": true,
            "message": "ERROR! fight does not created!"
        };
        res.status(400).send(JSON.stringify(error));
    }
});

module.exports = router;