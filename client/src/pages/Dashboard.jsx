import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { motion } from "framer-motion";

import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";

import API from "../services/api";

const Dashboard = ({
    darkMode,
    setDarkMode,
}) => {

    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");

    const [editingEmployee, setEditingEmployee] =
        useState(null);

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        department: "",
        salary: "",
    });

    const token = localStorage.getItem("token");

    const filteredEmployees =
        employees.filter((employee) =>
            employee.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );

    useEffect(() => {

        if (!token) {
            navigate("/");
        }

        fetchEmployees();

    }, []);

    const fetchEmployees = async () => {

        try {

            const res = await API.get(
                "/employees",
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            setEmployees(res.data);

        } catch (err) {

            toast.error(
                "Failed to fetch employees"
            );
        }
    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const addEmployee = async (e) => {

        e.preventDefault();

        try {

            await API.post(
                "/employees",
                formData,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            toast.success(
                "Employee Added"
            );

            setFormData({
                name: "",
                role: "",
                department: "",
                salary: "",
            });

            fetchEmployees();

        } catch (err) {

            toast.error(
                "Failed to add employee"
            );
        }
    };

    const updateEmployee = async (e) => {

        e.preventDefault();

        try {

            await API.put(
                `/employees/${editingEmployee._id}`,
                editingEmployee,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            toast.success(
                "Employee Updated"
            );

            setEditingEmployee(null);

            fetchEmployees();

        } catch (err) {

            toast.error(
                "Update Failed"
            );
        }
    };

    const deleteEmployee = async (id) => {

        try {

            await API.delete(
                `/employees/${id}`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            toast.success(
                "Employee Deleted"
            );

            fetchEmployees();

        } catch (err) {

            toast.error(
                "Delete Failed"
            );
        }
    };
    const exportToExcel = () => {

        const worksheet =
            XLSX.utils.json_to_sheet(
                employees
            );

        const workbook =
            XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Employees"
        );

        const excelBuffer =
            XLSX.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });

        const data = new Blob(
            [excelBuffer],
            {
                type:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
            }
        );

        saveAs(
            data,
            "employees.xlsx"
        );
    };
    const logout = () => {

        localStorage.removeItem("token");

        toast.success(
            "Logged Out"
        );

        navigate("/");
    };

    return (

        <div className="
      gradient-bg
      min-h-screen
      flex
      text-white
    ">

            <Sidebar
                logout={logout}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />

            <div className="
        pt-24 md:pt-10 md:ml-72
        flex-1
        p-4
        md:p-10
      ">

                <div className="mb-10">

                    <h1 className="
            text-3xl
            md:text-5xl
            font-bold
            mb-3
          ">
                        Employee Dashboard
                    </h1>

                    <p className="text-slate-400">
                        Manage your company workforce
                    </p>
                    <button
                        onClick={exportToExcel}
                        className="
    mt-6
    bg-green-600
    hover:bg-green-700
    transition
    px-6
    py-3
    rounded-xl
    font-bold
  "
                    >

                        Export Excel

                    </button>
                    <div className="mt-6">

                        <input
                            type="text"
                            placeholder="Search Employees..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="
                glass
                w-full
                md:w-96
                p-4
                rounded-2xl
                outline-none
                border
                border-white/10
              "
                        />

                    </div>

                </div>

                <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
          mb-10
        ">

                    <StatsCard
                        title="Total Employees"
                        value={employees.length}
                        color="border-blue-500"
                    />

                    <StatsCard
                        title="Departments"
                        value="5"
                        color="border-purple-500"
                    />

                    <StatsCard
                        title="Active Users"
                        value="24"
                        color="border-green-500"
                    />

                </div>

                <form
                    onSubmit={addEmployee}
                    className="
            glass
            p-6
            rounded-2xl
            mb-10
            grid
            grid-cols-1
            md:grid-cols-4
            gap-4
          "
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Employee Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="
              bg-white/10
              border
              border-white/10
              p-4
              rounded-xl
              outline-none
            "
                    />

                    <input
                        type="text"
                        name="role"
                        placeholder="Role"
                        value={formData.role}
                        onChange={handleChange}
                        className="
              bg-white/10
              border
              border-white/10
              p-4
              rounded-xl
              outline-none
            "
                    />

                    <input
                        type="text"
                        name="department"
                        placeholder="Department"
                        value={formData.department}
                        onChange={handleChange}
                        className="
              bg-white/10
              border
              border-white/10
              p-4
              rounded-xl
              outline-none
            "
                    />

                    <input
                        type="number"
                        name="salary"
                        placeholder="Salary"
                        value={formData.salary}
                        onChange={handleChange}
                        className="
              bg-white/10
              border
              border-white/10
              p-4
              rounded-xl
              outline-none
            "
                    />

                    <button
                        className="
              md:col-span-4
              bg-blue-600
              hover:bg-blue-700
              transition
              p-4
              rounded-xl
              font-bold
            "
                    >
                        Add Employee
                    </button>

                </form>

                <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        ">

                    {filteredEmployees.map((employee) => (

                        <div
                            key={employee._id}
                            className="
                glass
                p-6
                rounded-2xl
                hover:scale-105
                transition
                duration-300
              "
                        >

                            <h2 className="text-2xl font-bold mb-3">
                                {employee.name}
                            </h2>

                            <p className="text-slate-300 mb-2">
                                Role: {employee.role}
                            </p>

                            <p className="text-slate-300 mb-2">
                                Department: {employee.department}
                            </p>

                            <p className="text-slate-300 mb-5">
                                Salary: ₹{employee.salary}
                            </p>

                            <div className="flex gap-3">

                                <button
                                    onClick={() =>
                                        setEditingEmployee(employee)
                                    }
                                    className="
                    bg-yellow-500
                    hover:bg-yellow-600
                    transition
                    px-5
                    py-2
                    rounded-xl
                  "
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        deleteEmployee(employee._id)
                                    }
                                    className="
                    bg-red-500
                    hover:bg-red-600
                    transition
                    px-5
                    py-2
                    rounded-xl
                  "
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                    ))}

                </div>

                {
                    editingEmployee && (

                        <motion.div
                            initial={{
                                opacity: 0,
                            }}

                            animate={{
                                opacity: 1,
                            }}

                            exit={{
                                opacity: 0,
                            }}

                            className="
                fixed
                inset-0
                bg-black/50
                flex
                items-center
                justify-center
                z-50
                p-4
              "
                        >

                            <motion.form

                                initial={{
                                    scale: 0.8,
                                    opacity: 0,
                                }}

                                animate={{
                                    scale: 1,
                                    opacity: 1,
                                }}

                                transition={{
                                    duration: 0.3,
                                }}

                                onSubmit={updateEmployee}

                                className="
                  glass
                  p-8
                  rounded-2xl
                  w-full
                  max-w-[500px]
                  space-y-4
                "
                            >

                                <h2 className="
                  text-2xl
                  md:text-3xl
                  font-bold
                  mb-4
                ">
                                    Edit Employee
                                </h2>

                                <input
                                    type="text"
                                    value={editingEmployee.name}
                                    onChange={(e) =>
                                        setEditingEmployee({
                                            ...editingEmployee,
                                            name: e.target.value,
                                        })
                                    }
                                    className="
                    w-full
                    bg-white/10
                    p-4
                    rounded-xl
                    outline-none
                  "
                                />

                                <input
                                    type="text"
                                    value={editingEmployee.role}
                                    onChange={(e) =>
                                        setEditingEmployee({
                                            ...editingEmployee,
                                            role: e.target.value,
                                        })
                                    }
                                    className="
                    w-full
                    bg-white/10
                    p-4
                    rounded-xl
                    outline-none
                  "
                                />

                                <input
                                    type="text"
                                    value={editingEmployee.department}
                                    onChange={(e) =>
                                        setEditingEmployee({
                                            ...editingEmployee,
                                            department: e.target.value,
                                        })
                                    }
                                    className="
                    w-full
                    bg-white/10
                    p-4
                    rounded-xl
                    outline-none
                  "
                                />

                                <input
                                    type="number"
                                    value={editingEmployee.salary}
                                    onChange={(e) =>
                                        setEditingEmployee({
                                            ...editingEmployee,
                                            salary: e.target.value,
                                        })
                                    }
                                    className="
                    w-full
                    bg-white/10
                    p-4
                    rounded-xl
                    outline-none
                  "
                                />

                                <div className="
                  flex
                  flex-col
                  md:flex-row
                  gap-4
                ">

                                    <button
                                        type="submit"
                                        className="
                      flex-1
                      bg-blue-600
                      hover:bg-blue-700
                      transition
                      p-4
                      rounded-xl
                    "
                                    >
                                        Save Changes
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setEditingEmployee(null)
                                        }
                                        className="
                      flex-1
                      bg-red-500
                      hover:bg-red-600
                      transition
                      p-4
                      rounded-xl
                    "
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </motion.form>

                        </motion.div>
                    )
                }

            </div>

        </div>
    );
};

export default Dashboard;