const dotEnv = require('dotenv');

if(process.env.NODE_ENV != 'prod '){
    let configFile = `./.${process.env.NODE_ENV}.env`;
    configFile = configFile.split(' ').join('');
    dotEnv.config({path: configFile})
}else{
    dotEnv.config();
}

module.exports={
    PORT: process.env.PORT,
    DB_URL: process.env.MONGODB_URI,
    APP_SECRET: process.env.APP_SECRET
}