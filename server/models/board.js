const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const moment = require('moment');

const boardSchema = mongoose.Schema({
    seq : {
        type : Number,
        unique : true
    },
    title : {
        type:String,
        required :true
        
    },
    content : {
        type : String,
        required :true
    },
    writer : {
        type : String,
        required :true,
        maxLength: 100

    },
    writeDate : {
        type : String,
        required :true,
        default : moment().format("YYYYMMDDHHmmss")
    },
    updateDate : {
        type : String,
        required :true,
        default : moment().format("YYYYMMDDHHmmss")
    },
    like : {
        type : Number,
        default : 0
    },
    view : {
        type : Number,
        default : 0
    }
})


boardSchema.plugin(AutoIncrement,{
    model : 'boardModel',
	inc_field : 'seq',
	startAt : 1, //시작 
	increment : 1 // 증가
});
const Board = mongoose.model('boardModel',boardSchema)
module.exports = {Board}