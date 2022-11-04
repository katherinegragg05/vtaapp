const getRoles = (type) => {
  switch (type) {
    case "STUDENT":
      return ["APP_USER", "STUDENT"];
    case "ALUMNI":
      return ["APP_USER", "ALUMNI"];
    case "ADMIN":
      return ["APP_USER", "ADMIN"];
    case "SUPER-ADMIN":
      return ["APP_USER", "ADMIN", "SUPER_ADMIN"];

    default:
      return [];
  }
};

module.exports = getRoles;
