import Image from "next/image";
import { Poppins } from "next/font/google";
import { AuthLayout } from "@/components/layout";
import { Input } from "@/components/common/inputs";
import Link from "next/link";
import { useState } from "react";
import { FiMail, FiLock, FiEyeOff, FiEye } from "react-icons/fi";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  return (
    <AuthLayout title="Sign in" subTitle="Login to your account">
      <div className="md:w-[450px] px-4">
        <div className="relative">
          <Input
            label="Email"
            placeholder="Input your email here"
            className="pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FiMail className="text-gray-400 absolute bottom-3.5 left-4" />
        </div>
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
            Forgot password?
          </Link>
        </div>
        <button className="text-center font-bold text-white w-full mt-6 rounded-md duration-100 hover:opacity-80 bg-primary py-3 px-4">
          Sign in
        </button>
        <p className="text-gray-400 mt-3">
          Don&apos;t have a account?{" "}
          <Link href="/sign-up" className="text-primary underline">
            Create new Account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
