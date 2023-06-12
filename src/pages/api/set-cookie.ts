// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
axios.defaults.withCredentials = true;
import { MODE, URL_API } from "@/config";
import cookie from "cookie";

type Data = {
  name: string;
};

export default async function setCookie(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("jwtToken", req.body.token, {
          domain: MODE === "dev" ? "localhost" : ".aedu.id",
          path: "/",
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 1,
        })
      );
      return res.status(200).end();
    } catch (error: any) {
      return res.status(422).json({ message: "Incorrect Email or Password" });
    }
  }
}
