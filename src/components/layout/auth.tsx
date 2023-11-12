import Image from "next/image";

import { useSession, signIn, signOut } from "next-auth/react";

import { TYPOGRAPHY } from "@/data/typhography";
import { useEffect, useState } from "react";
import axios from "axios";
import { MODE, URL_API, URL_LEARNING_AEDU } from "@/config";
import { useRouter } from "next/router";

interface AuthLayoutProp {
  children: React.ReactNode;
  title?: string;
  subTitle?: string;
  oAuth?: boolean;
}

export default function AuthLayout({
  children,
  title,
  subTitle,
  oAuth = true,
}: AuthLayoutProp) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // if (session) {
  //   window.location.href =
  //     MODE === "dev" ? "http://localhost:3001" : "https://learning.aedu.id";
  // }
  console.log(session);
  useEffect(() => {
    const handleRegister = async () => {
      setIsLoading(true);
      try {
        const payload = {
          email: session?.user?.email,
          password: session?.user?.name,
          passConfirm: session?.user?.name,
        };
        const response = await axios.post(`${URL_API}/goog_reg`, {
          ...payload,
        });
        console.log(response);
        if (response.status === 200) {
          handleLogin({
            email: session?.user?.email,
            password: session?.user?.name,
          });
        }
        setIsLoading(false);
      } catch (error) {
        handleLogin({
          email: session?.user?.email,
          password: session?.user?.name,
        });
        console.log(error);
        setIsLoading(false);
      }
    };

    const handleLogin = async ({ email, password }: any) => {
      setIsLoading(true);
      try {
        const payload = {
          email,
          password,
        };
        const response = await axios.post(`${URL_API}/login`, { ...payload });
        if (response.status === 200) {
          window.location.href = `${URL_LEARNING_AEDU}/${
            router.query["prev-page"] || "/"
          }`;
        }
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
      }
    };
    if (session?.user?.email) {
      handleRegister();
    }
  }, [session]);
  useEffect(() => {
    const handleCheckLogin = async () => {
      try {
        const response = await axios.get(`${URL_API}/getToken`);
        console.log(response);
        if (response.data.token) {
          window.location.href =
            MODE === "dev"
              ? "http://localhost:3001"
              : "https://learning.aedu.id";
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleCheckLogin();
  }, [session]);
  return (
    <div className="flex min-h-screen">
      <div className="lg:w-[30%] md:w-[35%] relative md:block hidden justify-center py-6 max-w-[600px] text-white min-h-screen px-6 bg-primary">
        <Image
          src="/aedu-white.png"
          alt="logo aedu white"
          width={80}
          height={80}
          className="absolute top-5 left-4"
        />
        <div className="md:flex flex-col justify-center h-full">
          <div className="lg:mt-[60px] mb-10">
            <h1 className="lg:text-4xl md:text-2xl">
              {TYPOGRAPHY.INTRODUCTION_TITLE}
            </h1>
            <p className="mt-5">{TYPOGRAPHY.INTRODUCTION_DESC}</p>
          </div>

          <div className="relative">
            <img
              src="/highlight-2.png"
              alt="highlight"
              className="object-cover md:h-[210px] rounded-xl"
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
                onClick={() => signIn().then((res) => console.log(res))}
                className="flex border justify-center w-full rounded-md hover:opacity-80 duration-300 items-center bg-transparent py-2 px-4 border-primary"
              >
                <Image
                  src="/goggle.svg"
                  alt="goggle icon"
                  width={25}
                  height={25}
                />
                <p className="text-grey ml-3">{TYPOGRAPHY.GOOGLE_SIGNIN}</p>
              </button>
              <div className="flex items-center gap-5 mt-5">
                <span className="w-[45%] border border-gray-300" />
                <p className="text-gray-400">{TYPOGRAPHY.OR}</p>
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
