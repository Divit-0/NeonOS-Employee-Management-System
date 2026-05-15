import { useState } from "react";

import {
    useNavigate,
    Link,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
    FaUser,
    FaEnvelope,
    FaLock,
} from "react-icons/fa";

import { motion } from "framer-motion";

import API from "../services/api";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            password: "",
        });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post(
                "/auth/register",
                formData
            );

            toast.success(
                "Registration Success"
            );

            navigate("/");

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Registration Failed"
            );
        }
    };

    return (

        <div className="
      min-h-screen
      flex
      items-center
      justify-center
      overflow-hidden
      relative
      gradient-bg
      px-4
    ">

            {/* BACKGROUND BLOBS */}

            <div className="
        absolute
        w-72
        h-72
        bg-purple-500/30
        rounded-full
        blur-3xl
        top-10
        left-10
      " />

            <div className="
        absolute
        w-72
        h-72
        bg-blue-500/30
        rounded-full
        blur-3xl
        bottom-10
        right-10
      " />

            {/* REGISTER CARD */}

            <motion.form

                initial={{
                    opacity: 0,
                    y: 50,
                }}

                animate={{
                    opacity: 1,
                    y: 0,
                }}

                transition={{
                    duration: 0.5,
                }}

                onSubmit={handleSubmit}

                className="
          glass
          z-10
          w-full
          max-w-md
          p-8
          rounded-3xl
          border
          border-white/10
          backdrop-blur-xl
        "
            >

                <h1 className="
          text-5xl
          font-bold
          text-center
          mb-3
          bg-gradient-to-r
          from-blue-400
          to-purple-500
          bg-clip-text
          text-transparent
        ">
                    NeonOS
                </h1>

                <p className="
          text-center
          text-slate-400
          mb-10
        ">
                    Create your account 🚀
                </p>

                {/* NAME */}

                <div className="mb-5">

                    <div className="
            flex
            items-center
            gap-3
            bg-white/10
            border
            border-white/10
            rounded-xl
            px-4
          ">

                        <FaUser />

                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            onChange={handleChange}
                            className="
                w-full
                bg-transparent
                p-4
                outline-none
              "
                        />

                    </div>

                </div>

                {/* EMAIL */}

                <div className="mb-5">

                    <div className="
            flex
            items-center
            gap-3
            bg-white/10
            border
            border-white/10
            rounded-xl
            px-4
          ">

                        <FaEnvelope />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            className="
                w-full
                bg-transparent
                p-4
                outline-none
              "
                        />

                    </div>

                </div>

                {/* PASSWORD */}

                <div className="mb-8">

                    <div className="
            flex
            items-center
            gap-3
            bg-white/10
            border
            border-white/10
            rounded-xl
            px-4
          ">

                        <FaLock />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            className="
                w-full
                bg-transparent
                p-4
                outline-none
              "
                        />

                    </div>

                </div>

                {/* BUTTON */}

                <button
                    className="
            w-full
            bg-gradient-to-r
            from-blue-500
            to-purple-600
            hover:scale-105
            transition
            p-4
            rounded-xl
            font-bold
            text-lg
          "
                >
                    Register
                </button>

                {/* LOGIN */}

                <p className="
          text-center
          text-slate-400
          mt-8
        ">

                    Already have an account?

                    <Link
                        to="/"
                        className="
              text-blue-400
              ml-2
            "
                    >
                        Login
                    </Link>

                </p>

            </motion.form>

        </div>
    );
};

export default Register;