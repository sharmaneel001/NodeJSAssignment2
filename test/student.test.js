const request = require('supertest');
const { app } = require('./app');
const { setupDatabase, teardownDatabase } = require('./db');
const {  fetchStudentById,
  updateStudentById,
  deleteStudentById } = require('../src/repository/student');

beforeEach(setupDatabase);
afterEach(teardownDatabase);

test('Should create a new student', async () => {

  const response = await request(app).post('/student').send({
    name: "Jack",
    email: "Jack@gmail.com",
    mobile: "1234567890",
    address: "UK"
  }).expect(200)

  // Assert that the database was changed correctly
  const student = await fetchStudentById(response.body.id)
  expect(student).not.toBeNull()
})

test('Should get all student', async () => {
  const response = await request(app).post('/student').send({
    name: "Jack",
    email: "Jack002@gmail.com",
    mobile: "1234567890",
    address: "UK"
  }).expect(200)

  const students = await request(app)
    .get(`/student`)
    .send()
    .expect(200);

  expect(students.body.length).toBe(1)
})

test('Should get profile for student', async () => {
  const response = await request(app).post('/student').send({
    name: "Jack",
    email: "Jack003@gmail.com",
    mobile: "1234567890",
    address: "UK"
  }).expect(200)

  await request(app)
    .get(`/student/${response.body.id}`)
    .send()
    .expect(200)
})

test('Should update an existing student', async () => {
  const response = await request(app).post('/student').send({
    name: "Jack",
    email: "Jack005@gmail.com",
    mobile: "1234567890",
    address: "UK"
  }).expect(200)


  // Assert that the database was changed correctly
  let updatedStudent = await updateStudentById(response.body.id,
    {
      name: "Jack",
      email: "Jack006@gmail.com",
      mobile: "1234567890",
      address: "UK"
    })

  expect(updatedStudent.email).toBe("Jack006@gmail.com")
})

test('Should delete an existing student', async () => {
  const response = await request(app).post('/student').send({
    name: "Jack",
      email: "Jack007@gmail.com",
      mobile: "1234567890",
      address: "UK"
  }).expect(200)


  // Assert that the database was changed correctly
  let deleteStudent = await deleteStudentById(response.body.id);

  expect(deleteStudent.email).toBe("Jack007@gmail.com")
})