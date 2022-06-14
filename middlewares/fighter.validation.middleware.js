const { fighter } = require('../models/fighter');

const createFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during creation
    const errorText = validate(req.body, 'forCreation');
    if (errorText !== '') {
        const error = {
            "error": true,
            "message": errorText
        }
        res.status(400).send(JSON.stringify(error));
    } else {
        next();
    }
}

const updateFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during update
    const errorText = validate(req.body, 'forUpdate');
    if (errorText !== '') {
        const error = {
            "error": true,
            "message": errorText
        }
        res.status(400).send(JSON.stringify(error));
    } else {
        next();
    }
}

const validate = (newFighter, reasone) => {
    let errorText = "";
    const fighterProps = Object.keys(newFighter);
    if (reasone === 'forCreation' && (!fighterProps.includes('name') ||
    !fighterProps.includes('power') || !fighterProps.includes('defense'))) {
        errorText += 'Required parameters missing. ';
    }
    if (newFighter.id) {
        errorText += "Fighter should not have id property!";
    }
    if (reasone === 'forCreation' && UserService.search(newFighter.name)) {
        errorText += "Fighter with such name already exists";
    }
    if (newFighter.power && (newFighter.power <= 1 || newFighter.power >= 100)) {
        errorText += 'Invalid power value. ';
    }
    if (newFighter.defense && (newFighter.defense <= 1 || newFighter.defense >= 10)) {
        errorText += 'Invalid defense value. ';
    }
    if (newFighter.health && (newFighter.health <= 80 || newFighter.health >= 120)) {
        errorText += 'Invalid health value. ';
    }
    if (reasone === 'forCreation' && !newFighter.health) {
        newFighter.health = 100;
    }
    return errorText;
};

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;