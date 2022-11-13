const isAdmin = async (roles) => roles?.length && roles?.includes("ADMIN");

module.exports = isAdmin;
