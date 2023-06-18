import Image from "next/image";
import { Poppins } from "next/font/google";
import { AuthLayout } from "@/components/layout";
import { Input } from "@/components/common/inputs";
import Link from "next/link";
import { useState } from "react";
import { FiMail, FiLock, FiEyeOff, FiEye } from "react-icons/fi";
import axios from "axios";
axios.defaults.withCredentials = true;
import { URL_API } from "@/config";
import { useRouter } from "next/router";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    if (inputEmail !== "") {
      setIsValidEmail(validateEmail(inputEmail));
    } else {
      setIsValidEmail(true);
    }
  };
  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|id|co\.id|io|co)$/;
    return regex.test(email);
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");
    setSuccess(false);
    try {
      const payload = {
        email,
        password,
        passConfirm: confirmPassword,
      };
      const response = await axios.post(`${URL_API}/register`, { ...payload });
      if (response.status === 200) {
        setSuccess(true);
        resetForm();
        handleVerifyEmail(response.data.token);
        // router.push("/");
      }
      // console.log(response);
      // setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setError(error?.response?.data || "Failed to register account");
      setIsLoading(false);
    }
  };
  const handleVerifyEmail = async (token: string) => {
    try {
      const response = await axios.post(`${URL_API}/verify/${token}`);
      if (response.status === 200) {
        // setTimeout(() => {
        //   router.push("/");
        // }, 3000);
      }
      setIsLoading(false);
    } catch (error: any) {
      setError(error?.response?.data || "Failed to register account");
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Sign up" subTitle="Let's get started with us">
      <div className="md:w-[450px] md:px-4">
        {success && (
          <p className="text-center border border-primary rounded-md mt-3 text-sm text-primary py-2.5">
            Please check{" "}
            <a
              href="https://gmail.com"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              your email
            </a>{" "}
            to verify your account.
          </p>
        )}
        <div className="relative">
          <Input
            label="Email"
            placeholder="Input your email here"
            className="pl-10"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleEmailChange(e)
            }
          />
          <FiMail className="text-gray-400 absolute bottom-3.5 left-4" />
        </div>
        {!isValidEmail && (
          <p className="text-red-500 text-xs px-4 mt-2">
            Please enter a valid email with allowed domains such as .com, .id,
            .co.id, or .io
          </p>
        )}
        <div className="relative">
          <Input
            label="Password"
            placeholder="Input your password here"
            className="pl-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
          />
          {showPassword ? (
            <FiEye
              className="text-gray-400 cursor-pointer absolute bottom-3.5 right-4"
              onClick={handleShowPassword}
            />
          ) : (
            <FiEyeOff
              className="text-gray-400 cursor-pointer absolute bottom-3.5 right-4"
              onClick={handleShowPassword}
            />
          )}
          <FiLock className="text-gray-400 absolute bottom-3.5 left-4" />
        </div>
        <div className="relative">
          <Input
            label="Confirm Password"
            placeholder="Input your confirm password here"
            type={showPassword ? "text" : "password"}
            className="pl-10"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {showPassword ? (
            <FiEye
              className="text-gray-400 cursor-pointer absolute bottom-3.5 right-4"
              onClick={handleShowPassword}
            />
          ) : (
            <FiEyeOff
              className="text-gray-400 cursor-pointer absolute bottom-3.5 right-4"
              onClick={handleShowPassword}
            />
          )}
          <FiLock className="text-gray-400 absolute bottom-3.5 left-4" />
        </div>
        {confirmPassword && password !== confirmPassword && (
          <p className="text-red-500 text-xs mt-2 mb-2">
            Password and confirm password do not match
          </p>
        )}
        {error && <p className="text-red-500 text-xs mt-2 mb-2">{error}</p>}
        {isValidEmail && email && password && confirmPassword ? (
          <button
            className={`text-center font-bold text-white w-full mt-6 rounded-md duration-100 hover:opacity-80 bg-primary py-3 px-4 ${
              isLoading && "opacity-70"
            }`}
            disabled={isLoading}
            onClick={() => handleSubmit()}
          >
            Sign up
          </button>
        ) : (
          <button
            disabled
            className="text-center opacity-70 font-bold text-white w-full mt-6 rounded-md duration-100 bg-primary py-3 px-4"
          >
            Sign up
          </button>
        )}
        <p className="text-gray-400 mt-3">
          Already have a account?{" "}
          <Link href="/" className="text-primary underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
