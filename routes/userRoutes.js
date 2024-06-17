const express = require("express");
const router = express.Router();

const { createUser, loginUser } = require("../controllers/userController");
const {
  createEmployee,
  getAllEmployee,
  getEmployeeById,
  deleteEmployeeById,
  updateEmployeeById
} = require("../controllers/employeeController");

// Importing auth as a default import
const auth = require("../controllers/auth");

router.post("/user/create", createUser); // Add leading slash '/'
router.post("/user/login", loginUser); // Add leading slash '/'
router.post("/create/employee", auth, createEmployee);
router.get("/all/employees", auth, getAllEmployee);
router.get("/:id/employees", auth, getEmployeeById);
router.delete("/delete/employee/:id", auth, deleteEmployeeById);
router.patch("/update/employee/:id", auth, updateEmployeeById);

module.exports.userRoutes = router;
