const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter
router.get('/', function (req, res, next) {
    const fighters = FighterService.getAll();
	if (fighters) {
        res.status(200).send(fighters);
    } else {
        const error = {
            "error": true,
            "message": "Fighters not found!"
        };
        res.status(400).send(JSON.stringify(error));
    }
});

router.get('/:id', function (req, res, next) {
    const fighter = FighterService.getOne(req.params.id);
	if (fighter) {
        res.status(200).send(fighter);
    } else {
        const error = {
            "error": true,
            "message": "Fighter does not found!"
        };
        res.status(404).send(JSON.stringify(error));
    }
});

router.post('/', createFighterValid, function (req, res) {
    const fighter = FighterService.create(req.body);
    if (fighter) {
        res.status(200).send({"message": "Fighter creation success!"});
    } else {
        const error = {
            "error": true,
            "message": "ERROR! Fighter does not created!"
        };
        res.status(400).send(JSON.stringify(error));
    }
});

router.put('/:id', updateFighterValid, function (req, res) {
    const dataToUpdate = req.body;
    const fighter = FighterService.update(req.params.id, dataToUpdate);
    if (fighter) {
        res.status(200).send({"message": "Fighter update successful"});
    } else {
        const error = {
            "error": true,
            "message": "Fighter not update, error!"
        };
        res.status(400).send(JSON.stringify(error));
    }
});

router.delete('/:id', function (req, res){
    const fighter = FighterService.delete(req.params.id);
    if (fighter) {
        res.status(200).send({"message": "Fighter delete successful"});
    } else {
        const error = {
            "error": true,
            "message": "Fighter not delete, error!"
        };
        res.status(400).send(JSON.stringify(error));
    }
});

module.exports = router;