import { AuthLayout } from "@/components/layout";
import { Input } from "@/components/common/inputs";
import Link from "next/link";
import { useState } from "react";
import { FiMail } from "react-icons/fi";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  return (
    <AuthLayout
      oAuth={false}
      title="Forgot Password?"
      subTitle="No worries, we'll send you reset insturctions"
    >
      <div className="md:w-[450px] px-4">
        <div className="relative">
          <Input
            label="Enter your email"
            placeholder="unames@gmail.com"
            className="pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FiMail className="text-gray-400 absolute bottom-3.5 left-4" />
        </div>
        <div className="flex mt-1.5 justify-end">
          <Link
            href="/"
            className="text-primary underline cursor-pointer text-sm"
          >
            Back to login
          </Link>
        </div>
        <button className="text-center font-bold text-white w-full mt-6 rounded-md duration-100 hover:opacity-80 bg-primary py-3 px-4">
          Reset Password
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
