//VALIDATOR ID
const validationID = () => {
    return (req, res, next) => {
        const data = req.params.id;
        const regex = /^\d{1,3}$/;
        const uuidRegEx = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/;

        const matches = data.match(regex) || data.match(uuidRegEx)

        if(!matches){
            //ERROR VALIDATION
            res.status(400).json({
                error : `${data} is invalid`,
            });
            return;
        };

        return next();
    };
};

//VALIDATOR NAME
const validatorName = () => {
    return ( req, res, next ) => {

        const { name } = req.query;

        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
        const matches = name.match(regex)
        
        if(!matches){
            res.status(400).send({
                error: `${name} is invalid, must be only letters`
            })
            return;
        };
        return next();
    };
};

//VALIDATOR FORM SIGN-IN
const validatorSignIn = () => {

    return (req, res, next) => {

        const { username, firstname, lastname, email, password } = req.body;

        const regexWords = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
        const regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,16}).*$/;
        const regexUsername = /^[a-zA-Z0-9]+$/;

        if( !username.match(regexUsername)){
            res.status(400).send({
                error: `${username} is invalid`
            });
        };

        if ( !firstname.match(regexWords) || !lastname.match(regexWords)){
            res.status(400).send({
                error: `Firstname: ${firstname} or Lastname: ${lastname} is invalid`,
                message: 'Only letter allowed'
            });
            return;
        };

        if( !email.match(regexEmail) ){
            res.status(400).send({
                error: `${email} is invalid`
            });
            return;
        };

        if( !password.match(regexPass) ){
            res.status(400).send({
                error: `${password} is invalid`,
                message: 'Minimum 8 characters, maximum 16 characters, at least one digit, at least one lowercase letter, at least one uppercase letter and at least one special character'
            });
            return;
        };
        next();
    };
};

module.exports = {
    validationID,
    validatorName,
    validatorSignIn
};