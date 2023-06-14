import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { destroyCookie } from "nookies";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Hapus cookie1
  const cookiesToRemove = [
    "__Secure-next-auth.callback-url",
    "__Host-next-auth.csrf-token",
    "__Secure-next-auth.session-token",
  ];
  res.setHeader(
    "Set-Cookie",
    serialize("__Secure-next-auth.session-token", "", {
      domain: ".aedu.id",
      path: "/",
      httpOnly: true,
      maxAge: 1,
    })
  );

  //   cookiesToRemove.forEach((cookieName) => {
  //     destroyCookie({ res }, cookieName, {
  //       path: "/",
  //       domain: ".aedu.id", // Ganti dengan domain yang sesuai
  //     });
  //   });
  return res.status(200).json({ message: "success" });
  // Menanggapi permintaan API lainnya
  // ...
}
