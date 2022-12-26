const mongoose = require('mongoose');

//  Your code goes here
const studentSchema = mongoose.Schema({
    name : String,
    classId : String
});

const studentModel = mongoose.model('student', studentSchema);


module.exports = studentModel;