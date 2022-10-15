/**
 * To validate if the email is a valid email address
 *
 * @param {String} email
 * @returns {Boolean}
 */

export const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};
