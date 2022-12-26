const mongoose = require('mongoose');

//  Your code goes here
const classSchema = mongoose.Schema({
    class : String,
    studentsCount : Number
})

const classModel = mongoose.model('class', classSchema)

module.exports = classModel;