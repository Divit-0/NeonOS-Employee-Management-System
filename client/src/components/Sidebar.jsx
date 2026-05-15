import {
    Link,
    useLocation,
} from "react-router-dom";

import {
    FaUsers,
    FaChartBar,
    FaCog,
    FaSignOutAlt,
    FaBars,
    FaTimes,
} from "react-icons/fa";

import { useState } from "react";

const Sidebar = ({
    logout,
}) => {

    const location = useLocation();

    const [open, setOpen] =
        useState(false);

    return (

        <>

            {/* MOBILE TOPBAR */}

            <div className="
        md:hidden
        fixed
        top-0
        left-0
        right-0
        z-50
        glass
        p-4
        flex
        justify-between
        items-center
      ">

                <h1 className="
          text-2xl
          font-bold
          bg-gradient-to-r
          from-blue-400
          to-purple-500
          bg-clip-text
          text-transparent
        ">
                    NeonOS
                </h1>

                <button
                    onClick={() =>
                        setOpen(true)
                    }
                    className="text-2xl"
                >
                    <FaBars />
                </button>

            </div>

            {/* SIDEBAR */}

            <div className={`
        fixed
        top-0
        left-0
        h-screen
        w-72
        glass
        p-6
        z-50
        transition-transform
        duration-300

        ${open
                    ? "translate-x-0"
                    : "-translate-x-full"
                }

        md:translate-x-0
      `}>

                {/* CLOSE BUTTON */}

                <div className="
          flex
          justify-between
          items-center
          mb-12
        ">

                    <h1 className="
            text-5xl
            font-bold
            bg-gradient-to-r
            from-blue-400
            to-purple-500
            bg-clip-text
            text-transparent
          ">
                        NeonOS
                    </h1>

                    <button
                        onClick={() =>
                            setOpen(false)
                        }
                        className="
              md:hidden
              text-2xl
            "
                    >
                        <FaTimes />
                    </button>

                </div>

                {/* NAVIGATION */}

                <div className="space-y-4">

                    <Link to="/dashboard">

                        <button
                            onClick={() =>
                                setOpen(false)
                            }
                            className={`
                w-full
                flex
                items-center
                gap-3
                p-4
                rounded-xl
                transition

                ${location.pathname ===
                                    "/dashboard"

                                    ? "bg-blue-600"

                                    : "hover:bg-white/10"
                                }
              `}
                        >

                            <FaUsers />
                            Employees

                        </button>

                    </Link>

                    <Link to="/analytics">

                        <button
                            onClick={() =>
                                setOpen(false)
                            }
                            className={`
                w-full
                flex
                items-center
                gap-3
                p-4
                rounded-xl
                transition

                ${location.pathname ===
                                    "/analytics"

                                    ? "bg-blue-600"

                                    : "hover:bg-white/10"
                                }
              `}
                        >

                            <FaChartBar />
                            Analytics

                        </button>

                    </Link>

                    <Link to="/settings">

                        <button
                            onClick={() =>
                                setOpen(false)
                            }
                            className={`
      w-full
      flex
      items-center
      gap-3
      p-4
      rounded-xl
      transition

      ${location.pathname ===
                                    "/settings"

                                    ? "bg-blue-600"

                                    : "hover:bg-white/10"
                                }
    `}
                        >

                            <FaCog />
                            Settings

                        </button>

                    </Link>

                </div>

                {/* LOGOUT */}

                <button
                    onClick={logout}
                    className="
            absolute
            bottom-10
            left-6
            right-6
            flex
            items-center
            justify-center
            gap-3
            bg-red-500
            hover:bg-red-600
            p-4
            rounded-xl
            transition
          "
                >

                    <FaSignOutAlt />
                    Logout

                </button>

            </div>

        </>
    );
};

export default Sidebar;