const { FightRepository } = require('../repositories/fightRepository');

class fightsService {
    // OPTIONAL TODO: Implement methods to work with fights
    getAll() {
        const fights = FightRepository.getAll();
        if (!fights) {
            return null
        } 
        return fights;
    }

    create(data) {
        const fight = FightRepository.create(data);
        if (!fight) {
            return null;
        }
        return fight;
    }

    search(search) {
        const item = FightRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
}

module.exports = new fightsService();