const mongoose = require("mongoose");
const validator = require("validator");

let studentsCollection = "students";

// Student schema validation
let studentsSchema = mongoose.Schema({
  // Name is mandatory and can be string only
  name: {
    type: "String",
    validate(val) {
      if (validator.isEmpty(val, { min: 5, max: 50 })) {
        throw new Error("Name is Mandatory");
      }
      if (!validator.isAlpha(val, ["en-US"], { ignore: " " })) {
        throw new Error("Name must only contain characters");
      }
    }
  },
  // email is mandatory, unique and can be minimum 1 character and max 254 character
  email: {
    type: "String",
    unique : true,
    required : true,
    validate(val) {
      if (validator.isEmpty(val, { min: 1, max: 254 })) {
        throw new Error("Email is Mandatory");
      }
      if (!validator.isEmail(val)) {
        throw new Error("Please provide a valid email address");
      }
    }
  },
  // mobile is mandatory and can be of 10 digits
  mobile: {
    type: "string",
    validate(val) {
      if (validator.isEmpty(val)) {
        throw new Error("Mobile Number is Mandatory");
      }
      if (validator.isEmpty(val, { min: 10, max: 10 })) {
        throw new Error("Mobile Number should not exceed 10 digit");
      }
      if (!validator.isNumeric(val, {no_symbols: true})) {
        throw new Error("Mobile Number must only contain numbers");
      }
    }
  },
  // rollNumber is auto generated field
  rollNumber: {
    type : "String" , 
    unique : true, 
    required : true
  },
  // address is mandatory and can be of max 300 characters
  address: {
    type: "String",
    validate(val) {
      if (validator.isEmpty(val, { min: 1, max: 300 })) {
        throw new Error("Address is Mandatory");
      }
    }
  }
})

//  To remove auto generated __V
//  To rename _id to id
mongoose.set('toJSON', {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
    delete converted.__v;
  }
});

let studentModel = mongoose.model(studentsCollection, studentsSchema);

module.exports = { studentModel }


