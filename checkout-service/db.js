const mongoose=require('mongoose');

const dbConnection = async () =>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"checkoutService",
    })
    .then(()=>{
        console.log('Connection to DB succesful');
    })
    .catch((err)=>{
      console.log(err);
    })
};


module.exports=dbConnection;