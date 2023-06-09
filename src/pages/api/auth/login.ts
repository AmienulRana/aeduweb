// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { URL_API } from "@/config";
import cookie from "cookie";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const response = await axios.post(`${URL_API}/login`, {
        email,
        password,
      });
      if (
        response?.status == 200 &&
        response?.data?.msg !== "Incorrect Email or Password"
      ) {
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("jwtToken", response?.data?.token, {
            domain: ".aedu.id",
            path: "/",
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 1,
          })
        );
        return res.status(200).json(response?.data);
      }
      if (response?.data?.msg === "Incorrect Email or Password") {
        throw Error(response?.data?.msg);
      }
      throw Error();
    } catch (error: any) {
      return res.status(422).json({ message: "Incorrect Email or Password" });
    }
  }
  res.status(200).json({ name: "John Doe" });
}
