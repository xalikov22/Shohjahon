import { FloatingLabel, Button } from "flowbite-react";
import { Link, NavLink, Navigate } from "react-router-dom";
import { useState } from "react";
const Login = ({ setUser, User }: any) => {
  const [Change, setChange] = useState("");
  const handleSubmit = () => {
    // <Navigate to="/all" />;
    setUser("");
    setUser(Change);
  };
  return (
    <div className="bg-white h-svh">
      <div className="w-[600px] m-auto pt-[60px] text-center pb-[50px]">
        <img src="login.gif" className="mx-auto w-[300px]" />
        <p className="text-center text-[24px] font-bold pb-[30px]">Login</p>
        <div className="grid grid-flow-col justify-stretch space-x-4 pb-[50px]">
          <FloatingLabel
            variant="outlined"
            label="Email address"
            color="success"
            onChange={(e) => setChange(e.target.value)}
          />
        </div>
        <div className="grid grid-flow-col justify-stretch space-x-4 pb-[50px]">
          <FloatingLabel
            variant="outlined"
            label="Phone number"
            color="success"
          />
        </div>
        <NavLink to={Change ? "/all" : "/"}>
          <button
            onClick={handleSubmit}
            className="w-[600px] bg-blue-600 text-white rounded-md py-[10px]"
          >
            Login
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
