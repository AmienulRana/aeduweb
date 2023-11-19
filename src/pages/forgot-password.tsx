import { AuthLayout } from "@/components/layout";
import { Input } from "@/components/common/inputs";
import Link from "next/link";
import { useState } from "react";
import { FiMail } from "react-icons/fi";
import { TYPOGRAPHY } from "@/data/typhography";
import axios from "axios";
import { URL_API, URL_LEARNING_AEDU } from "@/config";
import { useRouter } from "next/router";
import { useLanguageContext } from "@/context/LanguageContext";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [success, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { language } = useLanguageContext();

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
        // router.push(`/reset-password?token=${response?.data?.token}`);
        setIsSuccess(true);
      }
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error?.response?.data?.message || "Failed to sent link!");
      setIsLoading(false);
    }
  };
  return (
    <>
      {success ? (
        <AuthLayout
          title={language === "EN" ? "Forgot Password?" : "Lupa Kata Sandi?"}
          subTitle={
            language === "EN"
              ? "Verify your account by checking your email"
              : "Verifikasi akun Anda dengan memeriksa email Anda"
          }
          oAuth={false}
        >
          <div className="md:w-[450px] md:px-4">
            <p className="text-center border border-primary rounded-md mt-3 text-sm text-primary py-2.5">
              {language === "EN"
                ? "Please check your email to verify reset your account."
                : "Silakan periksa email Anda untuk memverifikasi pengaturan ulang akun Anda."}{" "}
              <a
                href="https://gmail.com" // Ganti dengan URL yang sesuai
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                {language === "EN" ? "your email" : "email Anda"}
              </a>
            </p>
          </div>
        </AuthLayout>
      ) : (
        <AuthLayout
          oAuth={false}
          title={language === "EN" ? "Forgot Password?" : "Lupa Kata Sandi?"}
          subTitle={
            language === "EN"
              ? "No worries, we'll send you reset instructions."
              : "Tidak perlu khawatir, kami akan mengirimkan petunjuk pengaturan ulang."
          }
        >
          <div className="md:w-[450px] px-4">
            <div className="relative">
              <Input
                label="Email"
                placeholder={
                  language === "EN"
                    ? "Input your email here"
                    : "Masukkan alamat email Anda di sini"
                }
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
                {language === "EN"
                  ? "Please enter a valid email with allowed domains such as .com, .id, .co.id, or .io"
                  : "Harap masukkan alamat email yang valid dengan domain yang diperbolehkan seperti .com, .id, .co.id, atau .io"}
              </p>
            )}
            <div className="flex mt-1.5 justify-end">
              <Link
                href="/"
                className="text-primary underline cursor-pointer text-sm"
              >
                {language === "EN" ? "Back to login" : "Kembali ke login"}
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
                {language === "EN" ? "Reset Password" : "Atur Ulang Kata Sandi"}
              </button>
            ) : (
              <button
                disabled
                className="text-center opacity-70 font-bold text-white w-full mt-6 rounded-md duration-100 bg-primary py-3 px-4"
              >
                {language === "EN" ? "Reset Password" : "Atur Ulang Kata Sandi"}
              </button>
            )}
            {errorMessage && (
              <p className="text-red-500 text-xs mt-2 mb-3">{errorMessage}!</p>
            )}
            <p className="text-gray-400 mt-3">
              {language === "EN"
                ? "Don't have an account?"
                : "Belum memiliki akun?"}{" "}
              <Link href="/sign-up" className="text-primary underline">
                {language === "EN" ? "Create new Account" : "Buat Akun Baru"}
              </Link>
            </p>
          </div>
        </AuthLayout>
      )}
    </>
  );
}
