//VALIDATOR ID
const validationID = () => {
    return (req, res, next) => {
        const data = req.params.id;
        const regex = /^\d{1,3}$/;
        const uuidRegEx = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

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

module.exports = {
    validationID,
    validatorName
};