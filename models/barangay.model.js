const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const barangaySchema = new Schema({
    username:{ type:String,required:true},
    barangayname:{type:String, required:true},
    date:{type:Date, required:true},
},{
    timestamps:true,
});



    const Barangay = mongoose.model('Barangay',barangaySchema);

    module.exports = Barangay;