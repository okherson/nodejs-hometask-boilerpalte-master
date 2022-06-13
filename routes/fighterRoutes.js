const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter
router.get('/', function(req, res, next) {
    const fighters = FighterService.getAllFighters();
	if (fighters) {
        res.send(fighters);
    } else {
        const error = {
            error: true,
            message:"Fighter not got, error!"
        };
        res.status(400).send(JSON.stringify(error));
    }	
})
router.get('/:id', function(req, res, next) {
    const fighter = FighterService.getOneFighter(req.params.id);;
	if (fighter) {
        res.send(fighter);
    } else {
        const error = {
            error: true,
            message:"Fighter not got, error!"
        };
        res.status(404).send(JSON.stringify(error));
    }	

})

router.post('/', createFighterValid, function(req, res) {
    const fighter = FighterService.create(req.body);
    if (fighter) {
        res.send("Fighter create successful");
    } else {
        const error = {
            error: true,
            message:"Fighter not create, error!"
        };
        res.status(400).send(JSON.stringify(error));
    }	
})

router.put('/:id', updateFighterValid, function(req, res ) {
    const dataToUpdate = req.body;
    const fighter = FighterService.update(req.params.id, dataToUpdate);
    if (fighter) {
        res.send("Fighter update successful");
    } else {
        const error = {
            error: true,
            message:"Fighter not update, error!"
        };
        res.status(400).send(JSON.stringify(error));
    }	
})

router.delete('/:id', function(req,res){
    const fighter = FighterService.delete(req.params.id);
    if (fighter) {
        res.send("Fighter delete successful");
    } else {
        const error = {
            error: true,
            message:"Fighter not delete, error!"
        };
        res.status(400).send(JSON.stringify(error));
    }	
})
module.exports = router;