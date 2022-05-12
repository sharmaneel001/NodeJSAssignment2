const { studentModel } = require('../model/student');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

/**
 * 
 * @param {*} student 
 * @returns 
 */
const saveStudent = async (student) => {
  try {
    let uniqueRollNumber = uuidv4().replace(/-/g, '');
    student.rollNumber = uniqueRollNumber;

    let studentObj = new studentModel(student);
    return await studentObj.save();;
  } catch (err) {
    console.log(err);
    //duplicate key error
    if ( err && err.code === 11000 ) {  
      throw new Error(`Student with same email id[${student.email}] already exists`);
    }
    throw new Error(err.message);
  }
}

const fetchStudentById = async (studentId) => {

  try {
    let query = studentModel.find(mongoose.Types.ObjectId(studentId));

    return await query.exec();
  } catch (err) {
    console.log("Failed to fetch Student");
    throw new Error("Failed to fetch Student");
  }
}

const fetchStudents = async () => {

  try {
    let query = studentModel.find({})
      .sort({ name: -1 });

    return await query.exec();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch Students");
  }
}

const updateStudentById = async (studentId, student) => {

  try {
    let query = studentModel.findByIdAndUpdate(mongoose.Types.ObjectId(studentId), student, {
      new: true,
      runValidators: true
    })

    return await query.exec();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to find and update Student");
  }
}

const deleteStudentById = async (studentId) => {

  try {
    let query = studentModel.findByIdAndDelete(mongoose.Types.ObjectId(studentId), {
      select: { __v: 0 }
    })

    return await query.exec();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to find and delete Student");
  }
}

module.exports = {
  saveStudent,
  fetchStudentById,
  fetchStudents,
  updateStudentById,
  deleteStudentById
}