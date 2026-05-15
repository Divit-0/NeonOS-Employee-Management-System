const express = require("express");

const Employee = require("../models/Employee");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth, async (req, res) => {

    const employees = await Employee.find();

    res.json(employees);

});

router.post("/", auth, async (req, res) => {

    const employee = new Employee(req.body);

    await employee.save();

    res.json(employee);

});

router.put("/:id", auth, async (req, res) => {

    const employee =
        await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

    res.json(employee);

});

router.delete("/:id", auth, async (req, res) => {

    await Employee.findByIdAndDelete(
        req.params.id
    );

    res.json({
        message: "Employee Deleted",
    });

});

module.exports = router;