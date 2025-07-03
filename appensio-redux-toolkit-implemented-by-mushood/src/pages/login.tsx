import { useState } from "react";

import { ChartCircle } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/store/services/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [login, { isLoading }] = useLoginMutation();
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    const response = await login({
      email,
      password,
    });

    if (response.data) {
      toast.success("Logged In Successfully!");
      void navigate("/dashboard");
    } else {
      toast.error("Something went wrong, Please try again!");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void handleLogin();
      }}
      className="mx-auto flex h-screen w-[90%] flex-col items-center justify-center lg:w-2/3 xl:w-1/2"
    >
      <span className="w-full text-center text-[32px] leading-[32px] font-bold md:text-[48px] md:leading-[48px]">
        Welcome to the Developer Panel
      </span>
      <span className="mt-2.5 mb-5 w-full text-center text-[14px] leading-[14px] text-[#71717A]">
        Enter your credentials to login.
      </span>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-5 mb-2.5 w-full p-5"
        placeholder="Enter your email"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-5"
        placeholder="Enter your password"
      />
      <Button
        disabled={isLoading}
        className="mt-10 w-full"
        variant="default"
        size="lg"
      >
        {isLoading ? (
          <ChartCircle size={20} color="#FFFFFF" className="animate-spin" />
        ) : (
          "Sign In with Email"
        )}
      </Button>
    </form>
  );
};

export default Login;
