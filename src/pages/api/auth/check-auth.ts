// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
// import { URL_API } from "@/config";
import cookie from "cookie";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const jwtToken = cookie.parse(req.headers.cookie || "");
      res.status(200).json({ isLogged: jwtToken?.jwtToken ? true : false });
    } catch (error: any) {
      return res.status(422).json({ message: "Incorrect Email or Password" });
    }
  }
  //   res.status(200).json({ name: "John Doe" });
}
