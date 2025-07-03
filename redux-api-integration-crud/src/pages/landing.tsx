import { useState } from "react";
import { useNavigate } from "react-router";
import MaxWidthWrapper from "../components/max-width-wrapper"

const Landing = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => { 
    console.log({ name, email });
    void navigate("/dashboard");
  };

  return (
    <div className="bg-violet-900 h-screen overflow-y-scroll">
      <MaxWidthWrapper>
        <div className="p-8 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold text-violet-50">TODO WITH REDUX TOOLKIT</h1>
          <form
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4 mt-20 w-full max-w-xl"
              onSubmit={e => {
                e.preventDefault();
                // console.log({ title, description });
                handleSubmit();
              }}
            >
              <input
                type="text"
                placeholder="Name"
                className="px-4 py-2 rounded border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                value={name}
                onChange={e => setName(e.target.value)}
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
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded transition shadow"
                >
                  Login
                </button>
              </div>
            </form>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

export default Landing