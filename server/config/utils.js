const { v4: uuid } = require("uuid");

const idGeneratorHelper = (prefix) =>
  `${prefix || "id"}_${uuid().slice(0, 12).replace("-", "")}`;

module.exports = {
  idGeneratorHelper,
};
