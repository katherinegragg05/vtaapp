const allowedOrigins = [
  "https://technotes.onrender.com",
  `http://localhost:${process.env.PORT || 3500}`,
];

module.exports = allowedOrigins;
