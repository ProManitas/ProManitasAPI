const { User, Services, Adpost, Rating } = require('../db')

const signUp = async (username, firstname, lastname, email, password, cellnumber, address, image) =>{
    try {
        const sign = await User.create({
            username, 
            firstname, 
            lastname, 
            email, 
            password, 
            cellnumber, 
            address, 
            image
        });
        return sign 
    }   
     catch (error) {
        console.error(error)
        return {message: "It seens like we're having a problem creating the user"}
    }
}

module.exports ={
    signUp,
}