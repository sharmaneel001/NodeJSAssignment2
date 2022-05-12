const { 
  saveStudent,
  fetchStudentById,
  fetchStudents,
  updateStudentById,
  deleteStudentById
} = require('../repository/student');



const createStudent = (student) => {

  return new Promise((resolve, reject) => {

    saveStudent(student)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

const getStudent = (studentId) => {

  return new Promise((resolve, reject) => {

    fetchStudentById(studentId)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.log("here")
        reject(error);
      })
  })
}

const getStudents = () => {

  return new Promise((resolve, reject) => {

    fetchStudents()
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

const updateStudent = (studentId, student) => {

  return new Promise((resolve, reject) => {

    updateStudentById(studentId, student)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

const deleteStudent = (studentId) => {

  return new Promise((resolve, reject) => {

    deleteStudentById(studentId)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

module.exports = {
  createStudent,
  getStudent,
  getStudents,
  updateStudent,
  deleteStudent
}