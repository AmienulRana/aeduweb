import Image from "next/image";

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
  return (
    <div className="flex min-h-screen">
      <div className="w-1/4 hidden md:block py-6 max-w-[600px] text-white min-h-screen px-6 bg-primary">
        <p className="text-sm font-semibold">AEDU</p>
        <div className="translate-y-[100px]">
          <h1 className="text-3xl">Start your professional journey with us.</h1>
          <p className="text-sm mt-5">
            discover tailored made courses and community of experts and learners
            to expand your learning experience
          </p>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="min-w-[80%] md:min-w-max max-w-[1200px]">
          <p className="font-medium text-lg">{title}</p>
          <p className="text-gray-400 text-sm mb-5">{subTitle}</p>
          {oAuth && (
            <>
              <button className="flex border justify-center w-full rounded-md hover:opacity-80 duration-300 items-center bg-transparent py-2 px-4 border-primary">
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
