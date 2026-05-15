import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
function App() {

  const [darkMode, setDarkMode] =
    useState(true);

  useEffect(() => {

    if (darkMode) {

      document.documentElement.classList.add(
        "dark"
      );

    } else {

      document.documentElement.classList.remove(
        "dark"
      );
    }

  }, [darkMode]);

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <Login
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            <Dashboard
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        <Route
          path="/analytics"
          element={
            <Analytics
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/settings"
          element={
            <Settings
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;