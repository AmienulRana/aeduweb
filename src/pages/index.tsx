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
    <AuthLayout>
      <div className="md:w-[450px] px-4">
        <p className="font-medium text-lg">Sign in</p>
        <p className="text-gray-400 text-sm mb-5">Login to your account</p>
        <button className="flex border justify-center w-full rounded-md hover:opacity-80 duration-300 items-center bg-transparent py-2 px-4 border-primary">
          <Image src="/goggle.svg" alt="goggle icon" width={25} height={25} />
          <p className="text-grey ml-3">Continue with goggle</p>
        </button>
        <div className="flex items-center gap-5 mt-5">
          <span className="w-[45%] border border-gray-300" />
          <p className="text-gray-400">OR</p>
          <span className="w-[45%] border border-gray-300" />
        </div>
        <div>
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
          <button className="text-center font-bold text-white w-full mt-6 rounded-md duration-100 hover:opacity-80 bg-primary py-3 px-4">
            Sign up
          </button>
          <p className="text-gray-400 mt-3">
            Don&apos;t have a account?{" "}
            <Link href="/sign-up" className="text-primary underline">
              Create new Account
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
