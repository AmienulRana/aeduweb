import Image from "next/image";
import { Poppins } from "next/font/google";
import { AuthLayout } from "@/components/layout";
import { Input } from "@/components/common/inputs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMail, FiLock, FiEyeOff, FiEye } from "react-icons/fi";
import { TYPOGRAPHY } from "@/data/typhography";
import axios from "axios";
import { useRouter } from "next/router";
import { URL_API } from "@/config";
import { useLanguageContext } from "@/context/LanguageContext";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState("");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const { language } = useLanguageContext();

  useEffect(() => {
    const tokenLocal = localStorage.getItem("token") || "";
    setToken(tokenLocal);
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const token = router.query.token;
      const payload = {
        newPass: password,
        newPassConfirm: confirmPassword,
      };
      const response = await axios.post(
        `${URL_API}/changePassManual/${token}`,
        {
          ...payload,
        }
      );
      if (response.status === 200) {
        router.push("/");
      }
      // window.location.href = URL_LEARNING_AEDU;
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(
        error?.response?.data?.message || "Failed to reset your password"
      );
      setIsLoading(false);
    }
  };
  return (
    <AuthLayout
      title={
        language === "EN" ? "Reset your password" : "Atur Ulang Kata Sandi"
      }
      subTitle={
        language === "EN"
          ? "Don't worry, you can change the password"
          : "Jangan khawatir, Anda dapat mengubah kata sandi"
      }
      oAuth={false}
    >
      <div className="md:w-[450px]">
        <div className="relative">
          <Input
            label={language === "EN" ? "Password" : "Kata Sandi"}
            placeholder={
              language === "EN"
                ? "Input your new password here"
                : "Masukkan kata sandi baru Anda di sini"
            }
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
        <div className="relative">
          <Input
            label={
              language === "EN" ? "Confirm Password" : "Konfirmasi Kata Sandi"
            }
            placeholder={
              language === "EN"
                ? "Input your confirm password here"
                : "Masukkan kata sandi konfirmasi Anda di sini"
            }
            type={showPassword ? "text" : "password"}
            className="pl-10"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
        {confirmPassword && password !== confirmPassword && (
          <p className="text-red-500 text-xs mt-2 mb-2">
            {language === "EN"
              ? "Password and confirm password do not match"
              : "Kata sandi dan konfirmasi kata sandi tidak cocok"}
          </p>
        )}
        {confirmPassword && password === confirmPassword ? (
          <button
            className={`text-center font-bold text-white w-full mt-6 rounded-md duration-100 hover:opacity-70 bg-primary py-3 px-4 ${
              isLoading && "opacity-70"
            }`}
            disabled={isLoading}
            onClick={() => handleSubmit()}
          >
            {language === "EN" ? "Continue" : "Selanjutnya"}
          </button>
        ) : (
          <button
            disabled
            className="text-center opacity-70 font-bold text-white w-full mt-6 rounded-md duration-100 bg-primary py-3 px-4"
          >
            {language === "EN" ? "Continue" : "Selanjutnya"}
          </button>
        )}
        {errorMessage && (
          <p className="text-red-500 text-xs mt-2 mb-3">{errorMessage}!</p>
        )}
        <p className="text-gray-400 mt-3">
          {TYPOGRAPHY.REMEMBER_PASSWORD}{" "}
          <Link href="/" className="text-primary underline">
            {language === "EN" ? "Sign in" : "Masuk"}
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
