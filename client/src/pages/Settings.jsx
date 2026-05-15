import Sidebar from "../components/Sidebar";

import {
    FaUser,
    FaBell,
    FaLock,
    FaPalette,
} from "react-icons/fa";

const Settings = ({
    darkMode,
    setDarkMode,
}) => {

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
                    Settings
                </h1>

                <div className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-8
        ">

                    {/* PROFILE */}

                    <div className="
            glass
            p-8
            rounded-2xl
          ">

                        <div className="
              flex
              items-center
              gap-3
              mb-6
            ">

                            <FaUser className="text-2xl" />

                            <h2 className="
                text-2xl
                font-bold
              ">
                                Profile Settings
                            </h2>

                        </div>

                        <div className="space-y-4">

                            <input
                                type="text"
                                placeholder="Username"
                                className="
                  w-full
                  bg-white/10
                  p-4
                  rounded-xl
                  outline-none
                "
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                className="
                  w-full
                  bg-white/10
                  p-4
                  rounded-xl
                  outline-none
                "
                            />

                            <button
                                className="
                  w-full
                  bg-blue-600
                  hover:bg-blue-700
                  transition
                  p-4
                  rounded-xl
                "
                            >
                                Save Profile
                            </button>

                        </div>

                    </div>

                    {/* PASSWORD */}

                    <div className="
            glass
            p-8
            rounded-2xl
          ">

                        <div className="
              flex
              items-center
              gap-3
              mb-6
            ">

                            <FaLock className="text-2xl" />

                            <h2 className="
                text-2xl
                font-bold
              ">
                                Security
                            </h2>

                        </div>

                        <div className="space-y-4">

                            <input
                                type="password"
                                placeholder="Current Password"
                                className="
                  w-full
                  bg-white/10
                  p-4
                  rounded-xl
                  outline-none
                "
                            />

                            <input
                                type="password"
                                placeholder="New Password"
                                className="
                  w-full
                  bg-white/10
                  p-4
                  rounded-xl
                  outline-none
                "
                            />

                            <button
                                className="
                  w-full
                  bg-purple-600
                  hover:bg-purple-700
                  transition
                  p-4
                  rounded-xl
                "
                            >
                                Update Password
                            </button>

                        </div>

                    </div>

                    {/* NOTIFICATIONS */}

                    <div className="
            glass
            p-8
            rounded-2xl
          ">

                        <div className="
              flex
              items-center
              gap-3
              mb-6
            ">

                            <FaBell className="text-2xl" />

                            <h2 className="
                text-2xl
                font-bold
              ">
                                Notifications
                            </h2>

                        </div>

                        <div className="
              flex
              items-center
              justify-between
              bg-white/10
              p-4
              rounded-xl
            ">

                            <span>
                                Email Notifications
                            </span>

                            <input type="checkbox" />

                        </div>

                    </div>

                    {/* APPEARANCE */}

                    <div className="
            glass
            p-8
            rounded-2xl
          ">

                        <div className="
              flex
              items-center
              gap-3
              mb-6
            ">

                            <FaPalette className="text-2xl" />

                            <h2 className="
                text-2xl
                font-bold
              ">
                                Appearance
                            </h2>

                        </div>

                        <button
                            onClick={() =>
                                setDarkMode(!darkMode)
                            }
                            className="
                w-full
                bg-pink-600
                hover:bg-pink-700
                transition
                p-4
                rounded-xl
              "
                        >

                            Toggle Theme

                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Settings;