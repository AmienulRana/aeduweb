import Image from "next/image";
import { Poppins } from "next/font/google";
import { AuthLayout } from "@/components/layout";
import { Input } from "@/components/common/inputs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMail, FiLock, FiEyeOff, FiEye } from "react-icons/fi";
import { TYPOGRAPHY } from "@/data/typhography";
import axios from "axios";
axios.defaults.withCredentials = true;
import { useRouter } from "next/router";
import { URL_API, URL_LEARNING_AEDU } from "@/config";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
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

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const payload = {
        email,
        password,
      };
      const response = await axios.post(`${URL_API}/login`, { ...payload });
      if (response.status === 200) {
        // await axios.post("/api/set-cookie", { token: response?.data?.token });
        window.location.href = `${URL_LEARNING_AEDU}/${
          router.query["prev-page"] || "/"
        }`;
      }
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Failed to authentication"
      );
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  return (
    <AuthLayout title="Sign in" subTitle="Login to your account">
      <div className="md:w-[450px] px-4">
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
          <p className="text-red-500 text-xs mt-2 mb-3">
            {TYPOGRAPHY.INVALID_EMAIL}
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
        <div className="flex mt-1.5 justify-end">
          <Link
            href="/forgot-password"
            className="text-primary underline cursor-pointer text-sm"
          >
            {TYPOGRAPHY.FORGOT_PASSWORD}
          </Link>
        </div>
        {isValidEmail && email && password ? (
          <button
            className={`text-center font-bold text-white w-full mt-6 rounded-md duration-100 hover:opacity-70 bg-primary py-3 px-4 ${
              isLoading && "opacity-70"
            }`}
            disabled={isLoading}
            onClick={() => handleSubmit()}
          >
            {TYPOGRAPHY.SIGN_IN}
          </button>
        ) : (
          <button
            disabled
            className="text-center opacity-70 font-bold text-white w-full mt-6 rounded-md duration-100 bg-primary py-3 px-4"
          >
            {TYPOGRAPHY.SIGN_IN}
          </button>
        )}
        {errorMessage && (
          <p className="text-red-500 text-xs mt-2 mb-3">{errorMessage}!</p>
        )}
        <p className="text-gray-400 mt-3">
          {TYPOGRAPHY.NOT_HAVE_ACCOUNT}{" "}
          <Link href="/sign-up" className="text-primary underline">
            {TYPOGRAPHY.CREATE_NEW_ACCOUNT}
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
