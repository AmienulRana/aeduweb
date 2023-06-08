import Image from "next/image";
import { Poppins } from "next/font/google";
import { AuthLayout } from "@/components/layout";
import { Input } from "@/components/common/inputs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMail, FiLock, FiEyeOff, FiEye } from "react-icons/fi";
import { TYPOGRAPHY } from "@/data/typhography";
import axios from "axios";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    const tokenLocal = localStorage.getItem("token") || "";
    setToken(tokenLocal);
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const payload = {
        token,
        newPass: password,
        confirmnewPass: confirmPassword,
      };
      const response = await axios.post(`/api/auth/change-password`, {
        ...payload,
      });
      // router.push("/");
      // window.location.href = URL_LEARNING_AEDU;
      console.log(response);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(
        error?.response?.data?.message || "Failed to reset your password"
      );
      setIsLoading(false);
    }
  };
  return (
    <AuthLayout
      title="Reset your password"
      subTitle="Don't worry you can change the password"
      oAuth={false}
    >
      <div className="md:w-[450px]">
        <div className="relative">
          <Input
            label="Password"
            placeholder="Input your new password here"
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
            placeholder="Input your new confirm password here"
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
            {TYPOGRAPHY.INVALID_PASSWORD}
          </p>
        )}
        {confirmPassword && password === confirmPassword ? (
          <button
            className={`text-center font-bold text-white w-full mt-6 rounded-md duration-100 hover:opacity-70 bg-primary py-3 px-4 ${
              isLoading && "opacity-70"
            }`}
            disabled={isLoading}
            onClick={() => handleSubmit()}
          >
            {TYPOGRAPHY.CONTINUE}
          </button>
        ) : (
          <button
            disabled
            className="text-center opacity-70 font-bold text-white w-full mt-6 rounded-md duration-100 bg-primary py-3 px-4"
          >
            {TYPOGRAPHY.CONTINUE}
          </button>
        )}
        {errorMessage && (
          <p className="text-red-500 text-xs mt-2 mb-3">{errorMessage}!</p>
        )}
        <p className="text-gray-400 mt-3">
          {TYPOGRAPHY.REMEMBER_PASSWORD}{" "}
          <Link href="/" className="text-primary underline">
            {TYPOGRAPHY.SIGN_IN}
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
