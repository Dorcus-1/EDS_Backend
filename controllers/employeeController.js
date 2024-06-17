// const {employeeModel} =  require('../models/employeeModel')
// const {validate} = require('../utils/employeeValidations')

// exports.createEmployee = async(req,res) => {
//     const {error } = validate(req.body)
//     if (error) {
//         res.send(error.details[0].message)
//     }
//     employee = new employeeModel({
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       nationalId: req.body.nationalId,
//       telephone: req.body.telephone,
//       department: req.body.department,
//       position: req.body.position,
//       laptopManufacturer: req.body.laptopManufacturer,
//       model: req.body.model,
//       serialNumber: req.body.serialNumber
//     });

//     await employee.save();
//     res.send(employee).status(201 );

// }
// exports.getAllEmployee = async (req, res) => {
//   const employee = await employeeModel.find();
//   res.send(employee).status(200);
// };

// exports.getEmployeeById = async (req, res) => {
//     const employeeId = req.params.id;

//     try {
//         const employee = await employeeModel.findById(employeeId);
//         if (!employee) {
//             return res.status(404).send("Employee not found");
//         }
//         res.status(200).send(employee);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };

// exports.deleteEmployeeById = async (req, res) => {
//     const employeeId = req.params.id;

//     try {
//         const employee = await employeeModel.findByIdAndDelete(employeeId);
//         if (!employee) {
//             return res.status(404).send("Employee not found");
//         }
//         res.status(200).send("Employee deleted successfully");
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
    
// }

const { Op } = require("sequelize");
const Employee = require("../models/employeeModel");
const { validate } = require("../utils/employeeValidations");

exports.createEmployee = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const employee = await Employee.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      nationalId: req.body.nationalId,
      telephone: req.body.telephone,
      department: req.body.department,
      position: req.body.position,
      laptopManufacturer: req.body.laptopManufacturer,
      model: req.body.model,
      serialNumber: req.body.serialNumber
    });

    res.status(201).send(employee);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while creating the employee");
  }
};

exports.getAllEmployee = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.status(200).send(employees);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching employees");
  }
};

exports.getEmployeeById = async (req, res) => {
  const employeeId = req.params.id;

  try {
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.status(200).send(employee);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the employee");
  }
};

exports.deleteEmployeeById = async (req, res) => {
  console.log("here in delete")
  const employeeId = req.params.id;

  try {
    const result = await Employee.destroy({ where: { id: employeeId } });
    if (!result) {
      return res.status(404).send("Employee not found");
    }
    res.status(200).send("Employee deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while deleting the employee");
  }
};

exports.updateEmployeeById = async (req, res) => {
  const employeeId = req.params.id;

  try {
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    employee.firstName = req.body.firstName || employee.firstName;
    employee.lastName = req.body.lastName || employee.lastName;
    employee.email = req.body.email || employee.email;
    employee.nationalId = req.body.nationalId || employee.nationalId;
    employee.telephone = req.body.telephone || employee.telephone;
    employee.department = req.body.department || employee.department;
    employee.position = req.body.position || employee.position;
    employee.laptopManufacturer = req.body.laptopManufacturer || employee.laptopManufacturer;
    employee.model = req.body.model || employee.model;
    employee.serialNumber = req.body.serialNumber || employee.serialNumber;
    await employee.save();
    res.status(200).send(employee);
    console.log(employee);
    res.status(200).send("Employee updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the employee");
  }
  }
