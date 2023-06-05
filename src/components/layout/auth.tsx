interface AuthLayoutProp {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProp) {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/4 py-6 max-w-[600px] text-white min-h-screen px-6 bg-primary">
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
        <div className="max-w-[1200px]">{children}</div>
      </div>
    </div>
  );
}
