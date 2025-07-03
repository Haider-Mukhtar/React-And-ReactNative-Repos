import { useState } from "react";
import { useNavigate } from "react-router";
import MaxWidthWrapper from "../components/max-width-wrapper"
import { toast } from "sonner";
import { useRegisterUserMutation } from "../store/services/auth";
import { Loader } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [registerUserData, { isLoading }] = useRegisterUserMutation();

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => { 
    const response = await registerUserData({
      email: email,
      password: password,
      last_name: lName,
      first_name: fName,
    });

    // console.log('Register', response);
    if (response.data) {
      if (response.data.status === 400)
      {
        toast.error(`${response.data.message}`);
      } else {
        toast.success(`${response.data.message}`);
        void navigate("/");
        setFName("");
        setLName("");
        setEmail("");
        setPassword("");
      }
    } else {
      toast.error("Failed to register user!");
    }
  };

  return (
    <div className="bg-violet-900 h-screen overflow-y-scroll">
      <MaxWidthWrapper>
        <div className="p-8 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold text-violet-50">REDUX TOOLKIT REGISTER</h1>
          <form
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4 mt-20 w-full max-w-xl"
              onSubmit={e => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <input
                type="text"
                placeholder="First Name"
                className="px-4 py-2 rounded border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                value={fName}
                onChange={e => setFName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="px-4 py-2 rounded border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                value={lName}
                onChange={e => setLName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-2 rounded border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="px-4 py-2 rounded border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <div className="flex gap-4">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full flex items-center justify-center bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded transition shadow text-center"
                >
                {isLoading ?
                  <Loader size={20} color="#FFFFFF" className="animate-spin" />
                  :
                  "Register"
                }
                </button>
              </div>
          </form>
          <div className="text-violet-50 flex flex-row gap-2 my-6">
            <p>Already have an account?</p>
            <button
              className="cursor-pointer underline"
              onClick={() => navigate("/")}
            >
              Login
            </button>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

export default Register