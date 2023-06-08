// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { URL_API } from "@/config";

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
      const response = await axios.post(`${URL_API}/forgotPass`, {
        email,
      });
      res.status(200).json(response?.data);
    } catch (error: any) {
      res.status(422).json(error?.response);
    }
  }
  res.status(200).json({ name: "John Doe" });
}
