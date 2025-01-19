const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
      },
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:false
    }
}, {
    timestamps: true
});

const Category = mongoose.model('Category',categorySchema);

module.exports = Category;