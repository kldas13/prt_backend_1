const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const classModel = require('./models/class');
const studentModel = require('./models/student')

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here
let class_id;
app.post('/v1/myClass', async (req,res)=>{
    try {
        const studentCount=new Array(req.studentsCount)
        const classes = await classModel.create(req.body);
        // console.log(req.body);
        // console.log(classes);
        res.status(201).json({
            status:"Success",
            message: classes
        })

    } catch (error) {
        res.status(400).json({
            status:'Failed',
            message:error.message
        })
    }
})


// Get all classes

app.get('/v1/myClass', async (req,res)=>{
    try {
        const classes = await classModel.find();
        // console.log(req.body);
        // console.log(classes);
        res.status(200).json(classes)

    } catch (error) {
        res.status(400).json({
            status:'Failed',
            message:error.message
        })
    }
})

// Get one class by id

app.get('/v1/myClass/:id', async (req,res)=>{
    try {
        const id = req.params;
        console.log(id);
        const classes = await classModel.find({_id:req.params.id});
        // console.log(req.body);
        // console.log(classes);
        if(classes.length==0) {
            res.status(404).json({
                error: "There is no class at that id"
            })
        }
        res.status(200).json(classes)

    } catch (error) {
        res.status(400).json({
            status:'Failed',
            message:error.message
        })
    }
})


// Delete a class

app.delete('/v1/myClass/:id', async (req,res)=>{
    try {
        const classes = await classModel.deleteMany({_id:req.params.id});
        // console.log(req.body);
        // console.log(classes);
        if(classes.deletedCount==0) {
            res.status(404).json({
                error: "There is no task at that id"
            })
        }
        res.status(204)


    } catch (error) {
        res.status(400).json({
            status:'Failed',
            message:error.message
        })
    }
})

// Post students into one class

app.post('/v1/myClass/:id/students', async (req,res)=>{
    try {
        console.log(req.params);
        const studentDetails = {
            name:req.body.name,
            classId:req.params.id
        }
        const students = await studentModel.create(studentDetails);
        // console.log(req.body);
        // console.log(classes);
        res.status(201).json({studentId: students._id})

    } catch (error) {
        res.status(400).json({
            status:'Failed',
            message:error.message
        })
    }
})

// Get students in one class

app.get('/v1/myClass/:id/students', async (req,res)=>{
    try {
        console.log(req.params);
        // const studentDetails = {
        //     name:req.body.name,
        //     classId:req.params.id
        // }
        const students = await studentModel.find({classId:req.params.id});
        // console.log(req.body);
        // console.log(classes);
        if(students.length==0) {
            res.status(404).json({
                error: "There are no students in this class"
            })
        }
        res.status(200).json(students)

    } catch (error) {
        res.status(400).json({
            status:'Failed',
            message:error.message
        })
    }
})


// Get one student in one class

app.get('/v1/myClass/:id/students/:studentId', async (req,res)=>{
    try {
        console.log(req.params);
        // const studentDetails = {
        //     name:req.body.name,
        //     classId:req.params.id
        // }
        const students = await studentModel.find({classId:req.params.id});
        const student = students.filter((item)=>{
            return item._id == req.params.studentId
        })
        // const student = await students.find({_id:req.params.studentId})
        // console.log(req.body);
        if(student.length==0) {
            return res.status(404).json({
                error: "There is no student of that id"
            })
        }
        console.log(student);
        res.status(200).json(student)

    } catch (error) {
        res.status(400).json({
            status:'Failed',
            message:error.message
        })
    }
})

app.put('/v1/myClass/:id/students/:studentId', async (req,res)=>{
    try {
        console.log(req.params);

        const students = await studentModel.find({classId:req.params.id});
        const student = students.filter((item)=>{
            return item._id == req.params.studentId
        })

        const updated = await studentModel.updateOne({_id:req.params.studentId}, req.body)
        res.status(204)

    } catch (error) {
        res.status(400).json({
            status:'Failed',
            message:error.message
        })
    }
})


app.delete('/v1/myClass/:id/students/:studentId', async (req,res)=>{
    try {
        const students = await studentModel.find({classId:req.params.id});
        const student = students.filter((item)=>{
            return item._id == req.params.studentId
        })

        const updated = await studentModel.deleteOne({_id:req.params.studentId})
        if(updated.deletedCount==0) {
            res.status(404).json({
                error: "There is no task at that id"
            })
        }
        console.log(student);
        res.status(204)

    } catch (error) {
        res.status(400).json({
            status:'Failed',
            message:error.message
        })
    }
})




module.exports = app;