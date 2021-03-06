const moment = require("moment");
const lodash = require("lodash");
const { VN_PHONE, FULLNAME, PROJECT_NAME } = require("./regex");

const dateFormat = [moment.ISO_8601, "MM/DD/YYYY", "MM-DD-YYYY"];

const dateValidation = (date) => {
  return moment(date, dateFormat.format, true).isValid();
};
const fullNameValidation = (name) => {
  if (!name || name.length === 0) {
    return false;
  }
  return FULLNAME.test(name);
};
const phoneNumberValidation = (phoneNumber) => {
  if (!phoneNumber || phoneNumber.length === 0) {
    return false;
  }
  return VN_PHONE.test(phoneNumber);
};
const projectNameValidation = (name) => {
  if (!name || name.length === 0) {
    return false;
  }
  return PROJECT_NAME.test(name);
};

const normalizeHumanName = (fullName) => {
  const newName = lodash.trim(fullName);
  const arrs = lodash.split(newName, " ");
  let result = "";

  arrs.forEach((word) => {
    result += ` ${lodash.upperFirst(word)}`;
  });

  result = lodash.trimStart(result);

  return result;
};
const formatPhoneNumber = (phoneNumber) => {
  phoneNumber = phoneNumber.replace(/^(84|\+84)/, "0");
  return phoneNumber;
};

module.exports = {
  dateValidation,
  fullNameValidation,
  phoneNumberValidation,
  projectNameValidation,
  normalizeHumanName,
  formatPhoneNumber,
};
