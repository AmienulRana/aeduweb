import { Loading } from "@/components/common/loading";
import { AuthLayout } from "@/components/layout";
import { URL_API } from "@/config";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function VerifySuccess() {
  const [time, setTime] = useState(5);
  const [loading, setLoading] = useState("");
  const router = useRouter();
  const handleVerifyEmail = async (token: any) => {
    try {
      setLoading("loading");
      const response = await axios.get(`${URL_API}/verify?token=${token}`);
      if (response.status === 200) {
        setLoading("success");
        setInterval(() => {
          setTime(time - 1);
        }, 1000);
        setTimeout(() => {
          router.push("/");
        }, 5000);
      }
      // setIsLoading(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log(router.query.token);

    if (router.query.token) {
      handleVerifyEmail(router?.query?.token);
    }
  }, [router.query]);
  return (
    <AuthLayout oAuth={false}>
      <div className="flex flex-col justify-center items-center">
        {loading === "loading" && (
          <>
            <Loading />
            <h1 className="text-primary mt-8 text-xl text-center">
              Please Wait...! <br /> Your verification account is proggress
            </h1>
            <p className="text-gray-400 mt-3">
              Please wait while we verify your account.
            </p>
          </>
        )}
        {loading === "success" && (
          <>
            <Image src="/check.svg" width={120} height={120} alt="check icon" />
            <h1 className="text-primary mt-8 text-xl text-center">
              Congratulations! <br /> Your account verification is complete
            </h1>
            <p className="text-gray-400 mt-3">
              You will be redirected to the Login page in{" "}
              <span className="text-primary">{time}</span> seconds
            </p>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
