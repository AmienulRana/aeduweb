import Image from "next/image";
import { Poppins } from "next/font/google";
import { AuthLayout } from "@/components/layout";
import { Input } from "@/components/common/inputs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMail, FiLock, FiEyeOff, FiEye, FiUser } from "react-icons/fi";
import axios from "axios";
axios.defaults.withCredentials = true;
import { URL_API } from "@/config";
import { useRouter } from "next/router";
import { useLanguageContext } from "@/context/LanguageContext";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { language } = useLanguageContext();

  const handleShowPassword = () => setShowPassword(!showPassword);
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

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");
    // setSuccess(true);
    try {
      const payload = {
        username,
        email,
        password,
        passConfirm: confirmPassword,
      };
      const response = await axios.post(`${URL_API}/register`, { ...payload });
      if (response.status === 200) {
        setSuccess(true);
        resetForm();
      }
      // console.log(response);
      // setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setError(error?.response?.data?.message || "Failed to register account");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        router.push("/");
      }, 5000);
    }
  }, [success]);

  return (
    <>
      {success ? (
        <AuthLayout
          title={language === "EN" ? "Register Progress" : "Proses Pendaftaran"}
          oAuth={false}
          subTitle={
            language === "EN"
              ? "Verify your account by checking your email"
              : "Verifikasi akun Anda dengan memeriksa email Anda"
          }
        >
          <div className="md:w-[450px] md:px-4">
            <p className="text-center border border-primary rounded-md mt-3 text-sm text-primary py-2.5">
              {language === "EN"
                ? "Please check your email to verify your account."
                : "Silakan cek email Anda untuk verifikasi akun."}{" "}
              <a
                href="https://gmail.com"
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
          title={language === "EN" ? "Sign up" : "Daftar"}
          subTitle={
            language === "EN"
              ? "Let's get started with us"
              : "Ayo mulai dengan kami"
          }
        >
          <div className="md:w-[450px] md:px-4">
            {/* <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-3">
              <div className="relative">
                <Input
                  label="First Name"
                  placeholder="Input your first name"
                  className="pl-10"
                  value={firstName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFirstName(e.target.value)
                  }
                />
                <FiUser className="text-gray-400 absolute bottom-3.5 left-4" />
              </div>
            </div> */}
            {/* <div className="relative">
              <Input
                label="Username"
                placeholder="Input your username"
                className="pl-10"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
              />
              <FiUser className="text-gray-400 absolute bottom-3.5 left-4" />
            </div> */}
            <div className="relative">
              <Input
                label={"Email"}
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
              <p className="text-red-500 text-xs px-4 mt-2">
                {language === "EN"
                  ? "Please enter a valid email with allowed domains such as .com, .id, .co.id, or .io"
                  : "Harap masukkan alamat email yang valid dengan domain yang diperbolehkan seperti .com, .id, .co.id, atau .io"}
              </p>
            )}

            <div className="relative">
              <Input
                label={language === "EN" ? "Password" : "Kata Sandi"}
                placeholder={
                  language === "EN"
                    ? "Input your password here"
                    : "Masukkan kata sandi anda disini"
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
                  language === "EN"
                    ? "Confirm Password"
                    : "Konfirmasi Kata Sandi"
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

            {error && <p className="text-red-500 text-xs mt-2 mb-2">{error}</p>}
            {isValidEmail && email && password && confirmPassword ? (
              <button
                className={`text-center font-bold text-white w-full mt-6 rounded-md duration-100 hover:opacity-80 bg-primary py-3 px-4 ${
                  isLoading && "opacity-70"
                }`}
                disabled={isLoading}
                onClick={() => handleSubmit()}
              >
                {language === "EN" ? "Sign up" : "Daftar"}
              </button>
            ) : (
              <button
                disabled
                className="text-center opacity-70 font-bold text-white w-full mt-6 rounded-md duration-100 bg-primary py-3 px-4"
              >
                {language === "EN" ? "Sign up" : "Daftar"}
              </button>
            )}
            <p className="text-gray-400 mt-3">
              {language === "EN"
                ? "Already have an account?"
                : "Sudah memiliki akun?"}{" "}
              <Link href="/" className="text-primary underline">
                {language === "EN" ? "Sign in" : "Masuk"}
              </Link>
            </p>
          </div>
        </AuthLayout>
      )}
    </>
  );
}
