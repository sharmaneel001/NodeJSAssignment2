const express = require('express');
const Joi = require('joi');

const {
  createStudent,
  getStudent,
  getStudents,
  updateStudent,
  deleteStudent
} = require('../service/student');

const studentRoute = new express.Router();

//POST API to create Student
studentRoute.post("/student", validateStudentReqBody, (req, res) => {

  let body = req.body;
  
  createStudent(body)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({  error :  error.message })
    })
})

//Get API to fetch Student by Id
studentRoute.get("/student/:id", (req, res) => {

  let studentId = req.params.id;

  getStudent(studentId)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({  error :  error.message })
    })
})

//Get API to fetch all Student 
studentRoute.get("/student", (req, res) => {

  getStudents()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({ error :  error.message})
    })
})

//PUT API to update Student 
studentRoute.put("/student/:id", validateStudentReqBody, (req, res) => {

  let studentId = req.params.id;
  let body = req.body;

  updateStudent(studentId, body)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({  error :  error.message })
    })
})

//DELETE API to delete Student
studentRoute.delete("/student/:id", (req, res) => {

  let studentId = req.params.id;

  deleteStudent(studentId)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({  error :  error.message })
    })
})

// middlewire to validate the request body
// only two validation will be happened here.
// 1. Allowed Propertes or not
// 2. Mandatory propertes provided or not
function validateStudentReqBody(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    mobile: Joi.string().required(),
    address: Joi.string().required()
  });
  const options = {
    abortEarly: false, 
    allowUnknown: false
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
      res.status(500).send({  
        error :  `Validation error: ${error.details.map(x => x.message).join(', ')}` 
      });
  } else {
      req.body = value;
      next();
  }
}

module.exports = { studentRoute }