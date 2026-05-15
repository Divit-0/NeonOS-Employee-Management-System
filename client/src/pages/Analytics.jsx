import { useEffect, useState } from "react";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
} from "recharts";

import Sidebar from "../components/Sidebar";

import API from "../services/api";

const Analytics = ({
    darkMode,
    setDarkMode,
}) => {

    const [employees, setEmployees] =
        useState([]);

    const token =
        localStorage.getItem("token");

    useEffect(() => {

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

            console.log(err);
        }
    };

    // DEPARTMENT COUNT

    const departmentMap = {};

    employees.forEach((employee) => {

        if (
            departmentMap[
            employee.department
            ]
        ) {

            departmentMap[
                employee.department
            ] += 1;

        } else {

            departmentMap[
                employee.department
            ] = 1;
        }
    });

    const pieData =
        Object.keys(departmentMap).map(
            (key) => ({
                name: key,
                value: departmentMap[key],
            })
        );

    // SALARY DATA

    const salaryData =
        employees.map((employee) => ({
            name: employee.name,
            salary: employee.salary,
        }));

    const COLORS = [
        "#2563eb",
        "#7c3aed",
        "#14b8a6",
        "#f59e0b",
        "#ef4444",
        "#06b6d4",
    ];

    return (

        <div className="
      gradient-bg
      min-h-screen
      text-white
      flex
    ">

            <Sidebar
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />

            <div className="
        pt-24
        md:pt-10
        md:ml-72
        flex-1
        p-4
        md:p-10
      ">

                <h1 className="
          text-3xl
          md:text-5xl
          font-bold
          mb-10
        ">
                    Analytics Dashboard
                </h1>

                <div className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-10
        ">

                    {/* PIE CHART */}

                    <div className="
            glass
            p-6
            rounded-2xl
            h-[400px]
          ">

                        <h2 className="
              text-2xl
              font-bold
              mb-5
            ">
                            Department Distribution
                        </h2>

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <PieChart>

                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    outerRadius={120}
                                    label
                                >

                                    {
                                        pieData.map(
                                            (
                                                entry,
                                                index
                                            ) => (

                                                <Cell
                                                    key={index}
                                                    fill={
                                                        COLORS[
                                                        index %
                                                        COLORS.length
                                                        ]
                                                    }
                                                />
                                            )
                                        )
                                    }

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                    {/* BAR CHART */}

                    <div className="
            glass
            p-6
            rounded-2xl
            h-[400px]
          ">

                        <h2 className="
              text-2xl
              font-bold
              mb-5
            ">
                            Salary Analytics
                        </h2>

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <BarChart
                                data={salaryData}
                            >

                                <XAxis dataKey="name" />

                                <YAxis />

                                <Tooltip />

                                <Bar
                                    dataKey="salary"
                                    fill="#2563eb"
                                    radius={[
                                        10,
                                        10,
                                        0,
                                        0,
                                    ]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Analytics;