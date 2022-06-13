const { user } = require('../models/user');
const UserService = require('../services/userService');


const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation
    const errorText = validate(req.body, 'forCreation');
    if (errorText !== '') {
        const error = {
            error: true,
            message : errorText
        }
        res.status(400).send(JSON.stringify(error));
    } else {
        next();
    }
}

const updateUserValid = (req, res, next) => {
    const errorText = validate(req.body, 'forUpdate');
    if (errorText !== '') {
        const error = {
            error: true,
            message : errorText
        }
        res.status(400).send(JSON.stringify(error));
    } else {
        next();
    }
}

const validateEmail = (mail) => {
    return mail && mail.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
};
const validatePhone = (phoneNumber) => {
    return phoneNumber && phoneNumber.match(/\+380[0-9]{9}$/);
};

const validatePassword = (password) => {
    return password && password.length >= 3;
};

const validateLastName = (lastName) => {
    return typeof lastName === 'string';
};

const validateFirstName = (firstName) => {
    return typeof firstName === 'string';
};

const validate = (newUser, reasone) => {
    let errorText = "";
    const userProps = Object.keys(newUser);
    if (reasone === 'forCreation' && (!userProps.includes('email') || !userProps.includes('password') ||
    !userProps.includes('firstName') || !userProps.includes('lastName') || !userProps.includes('phoneNumber'))) {
        errorText += 'Required parameters missing. ';
    }
    if (reasone === 'forCreation' && (UserService.search(newUser.email) || UserService.search(newUser.phoneNumber))) {
        errorText += "User with such email or phone number already exists";
    }
    if (!validateEmail(newUser.email)) {
        errorText += 'Invalid email. ';
    }
    if (!validatePassword(newUser.password)) {
        errorText += 'Password must be min 3 characters. ';
    }
    if (!validatePhone(newUser.phoneNumber)) {
        errorText += 'Invalid number format. ';
    }
    if (!validateLastName(newUser.lastName)) {
        errorText += 'Invalid last name. ';
    }
    if (!validateFirstName(newUser.firstName)) {
        errorText += 'Invalid first name. ';
    }
    return errorText;
};

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;


