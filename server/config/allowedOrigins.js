const allowedOrigins = [
  "https://technotes.onrender.com",
  `http://localhost:${process.env.PORT || 3500}`,
  `http://localhost:3000`,
];

module.exports = allowedOrigins;
