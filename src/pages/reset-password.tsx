import Image from "next/image";
import { Poppins } from "next/font/google";
import { AuthLayout } from "@/components/layout";
import { Input } from "@/components/common/inputs";
import Link from "next/link";
import { useState } from "react";
import { FiMail, FiLock, FiEyeOff, FiEye } from "react-icons/fi";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

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
            Password and confirm password do not match
          </p>
        )}
        {confirmPassword && password === confirmPassword ? (
          <button className="text-center font-bold text-white w-full mt-6 rounded-md duration-100 hover:opacity-80 bg-primary py-3 px-4">
            Continue
          </button>
        ) : (
          <button
            disabled
            className="text-center opacity-70 font-bold text-white w-full mt-6 rounded-md duration-100 bg-primary py-3 px-4"
          >
            Continue
          </button>
        )}
        <p className="text-gray-400 mt-3">
          Remember your password?{" "}
          <Link href="/" className="text-primary underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}