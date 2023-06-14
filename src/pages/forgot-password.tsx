import { AuthLayout } from "@/components/layout";
import { Input } from "@/components/common/inputs";
import Link from "next/link";
import { useState } from "react";
import { FiMail } from "react-icons/fi";
import { TYPOGRAPHY } from "@/data/typhography";
import axios from "axios";
import { URL_API, URL_LEARNING_AEDU } from "@/config";
import { useRouter } from "next/router";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    if (inputEmail !== "") {
      setIsValidEmail(validateEmail(inputEmail));
    } else {
      setIsValidEmail(true);
    }
  };
  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|id|co\.id|io|co)$/;
    return regex.test(email);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const payload = {
        email,
      };
      const response = await axios.post(`${URL_API}/forgotPass`, {
        ...payload,
      });
      setIsLoading(false);
      if (response.status === 200) {
        router.push(`/reset-password?token=${response?.data?.token}`);
      }
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error?.response?.data?.message || "Failed to sent link!");
      setIsLoading(false);
    }
  };
  return (
    <AuthLayout
      oAuth={false}
      title="Forgot Password?"
      subTitle="No worries, we'll send you reset insturctions"
    >
      <div className="md:w-[450px] px-4">
        <div className="relative">
          <Input
            label="Email"
            placeholder="Input your email here"
            className="pl-10"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleEmailChange(e)
            }
          />
          <FiMail className="text-gray-400 absolute bottom-3.5 left-4" />
        </div>
        {!isValidEmail && (
          <p className="text-red-500 text-xs mt-2 mb-3">
            {TYPOGRAPHY.INVALID_EMAIL}
          </p>
        )}
        <div className="flex mt-1.5 justify-end">
          <Link
            href="/"
            className="text-primary underline cursor-pointer text-sm"
          >
            {TYPOGRAPHY.BACK_TO_LOGIN}
          </Link>
        </div>
        {isValidEmail && email ? (
          <button
            className={`text-center font-bold text-white w-full mt-6 rounded-md duration-100 hover:opacity-70 bg-primary py-3 px-4 ${
              isLoading && "opacity-70"
            }`}
            disabled={isLoading}
            onClick={() => handleSubmit()}
          >
            {TYPOGRAPHY.RESET_PASSWORD}
          </button>
        ) : (
          <button
            disabled
            className="text-center opacity-70 font-bold text-white w-full mt-6 rounded-md duration-100 bg-primary py-3 px-4"
          >
            {TYPOGRAPHY.RESET_PASSWORD}
          </button>
        )}
        {errorMessage && (
          <p className="text-red-500 text-xs mt-2 mb-3">{errorMessage}!</p>
        )}
        <p className="text-gray-400 mt-3">
          {TYPOGRAPHY.NOT_HAVE_ACCOUNT}{" "}
          <Link href="/sign-up" className="text-primary underline">
            {TYPOGRAPHY.CREATE_NEW_ACCOUNT}
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
