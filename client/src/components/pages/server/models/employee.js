const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: String,
    position: String,
    department: String,
    salary: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Employee", employeeSchema);