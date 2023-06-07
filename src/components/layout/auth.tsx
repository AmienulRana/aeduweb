import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

interface AuthLayoutProp {
  children: React.ReactNode;
  title: string;
  subTitle: string;
  oAuth?: boolean;
}

export default function AuthLayout({
  children,
  title,
  subTitle,
  oAuth = true,
}: AuthLayoutProp) {
  const { data: session } = useSession();

  if (session) {
    window.open("https://learning.aedu.id");
  }
  return (
    <div className="flex min-h-screen">
      <div className="lg:w-[30%] md:w-[35%] relative md:block hidden justify-center py-6 max-w-[600px] text-white min-h-screen px-6 bg-primary">
        <Image
          src="/aedu-white.svg"
          alt="logo aedu white"
          width={80}
          height={80}
          className="absolute top-5 left-4"
        />
        <div className="md:flex flex-col justify-center h-full">
          <div className="lg:mt-[60px] mb-10">
            <h1 className="text-4xl">
              Start your professional journey with us.
            </h1>
            <p className="text-sm mt-5">
              discover tailored made courses and community of experts and
              learners to expand your learning experience
            </p>
          </div>

          <div className="relative">
            <Image
              src="/highlight.png"
              height={215}
              width={215}
              alt="highlight"
              style={{ width: "100%" }}
            />
            <span className="block absolute opacity-60 top-0 left-0 w-full h-full bg-primary" />
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="min-w-[80%] md:min-w-max max-w-[1200px]">
          <p className="font-medium text-lg">{title}</p>
          <p className="text-gray-400 text-sm mb-5">{subTitle}</p>
          {oAuth && (
            <>
              <button
                onClick={() => signIn()}
                className="flex border justify-center w-full rounded-md hover:opacity-80 duration-300 items-center bg-transparent py-2 px-4 border-primary"
              >
                <Image
                  src="/goggle.svg"
                  alt="goggle icon"
                  width={25}
                  height={25}
                />
                <p className="text-grey ml-3">Continue with goggle</p>
              </button>
              <div className="flex items-center gap-5 mt-5">
                <span className="w-[45%] border border-gray-300" />
                <p className="text-gray-400">OR</p>
                <span className="w-[45%] border border-gray-300" />
              </div>
            </>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
