const mongoose=require('mongoose');

const dbConnection = () =>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"basket-service",
    })
    .then(()=>{
        console.log('Connection to DB succesful');
    })
    .catch((error)=>{
      console.log(error);
    })
};

module.exports={dbConnection};