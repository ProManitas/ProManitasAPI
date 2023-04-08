//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//------------------------MOCK DATA----------------------------------
const { User, Services, Adpost, Rating, Contract } = require('./src/db');

const fakeDb = require('./src/MOCK_DATA_SERVICES.json');
const fakeDbUsers = require('./src/MOCK_DATA_USERS.json');
const fakeDbAdpost = require('./src/MOCK_DATA_ADPOST.json');
const fakeDbContracts = require('./src/MOCK_DATA_CONTRACTS.json')

const filledDbServices = async () =>{ 
    fakeDb.map(e => Services.create({name : e.name, image:e.image }));
};

const filledDbAdpost = async () =>{
    fakeDbAdpost.map(post => Adpost.create({name : post.name, description: post.description, image: post.image}));
};

const filledContracts = async () =>{    
    fakeDbContracts.map(post => Contract.create({
        commencementDate: post.commencementDate, 
        terminationDate: post.terminationDate,
        payment: post.payment
    }))
}

const filledDbUsers = async () =>{
    fakeDbUsers.map(e => User.create({
        username: e.username,
        firstname: e.firstname,
        lastname: e.lastname, 
        email: e.email,
        password: e.password,
        cellnumber: e.cellnumber,
        address: e.address,
        role: e.role,
        experience: e.experience,
        image: e.image,
        delete: e.delete
    }));
};


const server = require('./src/app.js');
const { database } = require('./src/db');

// SYNC MODELS
database.sync({ force: true })
    .then(() => {
        server.listen(3001, () => {
            filledDbUsers() 
            filledDbServices()
            filledDbAdpost()
            filledContracts()
            console.log('Listening at' + ' ' + 3001)
        });
    });