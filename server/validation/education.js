const validator = require("validator");
const isEmpty = require("./is-empty"); 
module.exports = function validateExperienceInput(data) {
  let errors = {};
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.from : "";
 
  if (validator.isEmpty(data.school)) {
    errors.school = "School name is Required"; 
  }
  if (validator.isEmpty(data.degree)) {
    errors.degree = "Degree name is Required";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "Starting Date field is Required";
  }
  if (validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Field of study is Required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
