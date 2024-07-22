import { Route, Routes, Navigate } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";

function Authenticate({ handleLogin, handleRegister }) {
  return (
    <Routes>
      <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      <Route
        path="/register"
        element={
          <Register
            handleRegister={handleRegister}
          />
        }
      />

      <Route path="/*" element={<Navigate to={"/login"} />} />
    </Routes>
  );
}

export default Authenticate;
