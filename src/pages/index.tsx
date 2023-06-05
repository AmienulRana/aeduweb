import Image from "next/image";
import { Poppins } from "next/font/google";
import { AuthLayout } from "@/components/layout";
import { Input } from "@/components/common/inputs";
import Link from "next/link";

export default function Home() {
  return (
    <AuthLayout>
      <div className="md:w-[450px] px-4">
        <p className="font-medium text-lg">Sign in</p>
        <p className="text-gray-400 text-sm mb-3.5">Login to your account</p>
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
          <Input label="Email" placeholder="Input your email here" value="" />
          <Input
            label="Password"
            placeholder="Input your password here"
            value=""
          />
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
