import { AuthLayout } from "@/components/layout";
import { URL_API } from "@/config";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function VerifySuccess() {
  const [time, setTime] = useState(10);
  const router = useRouter();
  const handleVerifyEmail = async (token: any) => {
    try {
      const response = await axios.post(`${URL_API}/verify/${token}`);
      if (response.status === 200) {
        // setTimeout(() => {
        // router.push("/");
        // }, 3000);
      }
      // setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      // setError(error?.response?.data || "Failed to register account");
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(router.query.token);

    if (router.query) {
      handleVerifyEmail(router?.query?.token);
    }

    // setInterval(() => {
    //   setTime(time - 1);
    // }, 1000);
    setTimeout(() => {
      router.push("/");
    }, 10000);
  }, [router.query]);
  return (
    <AuthLayout oAuth={false}>
      <div className="flex flex-col justify-center items-center">
        <Image src="/check.svg" width={120} height={120} alt="check icon" />
        <h1 className="text-primary mt-8 text-xl text-center">
          Congratulations! <br /> Your account verification is complete
        </h1>
        <p className="text-gray-400 mt-3">
          You will be redirected to the Login page in{" "}
          <span className="text-primary">{time}</span> seconds
        </p>
      </div>
    </AuthLayout>
  );
}
