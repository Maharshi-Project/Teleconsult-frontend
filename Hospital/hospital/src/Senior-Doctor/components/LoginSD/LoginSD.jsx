import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkValidData } from "../../../utils/validate";

const LoginSD = () => {
  const naviagte = useNavigate();
  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);


  const gotosd = async () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;
    console.log(email.current.value);
    console.log(password.current.value);
    // Authentication
    try {
      const response = await fetch("http://localhost:8081/auth/srdoc/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.current.value,
          password: password.current.value,
        }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      const token = data.token;
      const message = data.message;
      console.log(token + " " + message);
      localStorage.setItem("token", token);
      localStorage.setItem("email", message);
      naviagte("/seniordoctor");
    } catch (error) {
      setErrorMessage("Invalid Email or password");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* Left side */}
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Welcome back</span>
          <span className="font-light text-gray-400 mb-8">
            Welcome back! Please enter your details
          </span>

          <div className="py-4">
            <span className="mb-2 text-md">Email</span>
            <input
              ref={email}
              type="email"
              name="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Password</span>
            <input
              ref={password}
              type="password"
              name="pass"
              id="pass"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <div className="flex justify-between w-full py-4">
            <span className="font-bold text-md">Forgot password</span>
          </div>
          <p className="text-red-500 font-bold text-lg">{errorMessage}</p>
          <button
            className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
            onClick={gotosd}
          >
            Sign in
          </button>
        </div>
        {/* Right side */}
        <div className="relative">
          <img
            src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
          {/* Text on image */}
          <div className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
            <span className="text-white text-xl">We have been using Untitle to kick start every new project and can not imagine working without it.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSD;
