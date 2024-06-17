// const express  = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cors  = require('cors');
// const dotenv = require("dotenv")
// dotenv.config()
// const PORT = process.env.PORT 
// const {connectDB} = require('./middleware/database')
// const {userRoutes}  = require("./routes/userRoutes")
// const swaggerUi = require("swagger-ui-express");
// const swaggerJsdoc = require("swagger-jsdoc");
// const SwaggerDocument = require("./swagger/swagger.json");




// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(SwaggerDocument));
   
// app.use(cors({}));
// var options = {
//   explore: true
// };


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(userRoutes)

// app.use("/", (req, res) => {
//   // Handle GET request
//   if (req.method === "GET") {
//     res.send(`
//       <html>
//         <head>
//           <link rel="stylesheet" type="text/css" href="./public/css/styles.css">
//         </head>
//         <body>
//           <h1 class="greeting">Welcome to Restful  Backend!</h1>
//         </body>
//       </html>
//     `);
//   }
// });

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
  
// });

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const sequelize = require("./middleware/sequelize"); // Import Sequelize instance
const {userRoutes} = require("./routes/userRoutes");
// const employeeRoutes = require("./routes/employeeRoutes"); // Assuming you have employee routes
const swaggerUi = require("swagger-ui-express");
const SwaggerDocument = require("./swagger/swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(SwaggerDocument));

app.use(cors({}));
var options = {
  explore: true
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// Use routes
app.use(userRoutes);


app.use("/", (req, res) => {
  if (req.method === "GET") {
    res.send(`
      <html>
        <head>
          <link rel="stylesheet" type="text/css" href="./public/css/styles.css">
        </head>
        <body>
          <h1 class="greeting">Welcome to Restful Backend!</h1>
        </body>
      </html>
    `);
  }
});

// Sync models with the database and start the server
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
