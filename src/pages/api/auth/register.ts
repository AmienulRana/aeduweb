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
      const { email, password, passConfirm } = req.body;
      const response = await axios.post(`${URL_API}/register`, {
        email,
        password,
        passConfirm,
      });
      res.status(200).json(response?.data);
    } catch (error) {
      res.status(422).json({ message: "Failed to register" });
      console.log(error);
    }
  }
  res.status(200).json({ name: "John Doe" });
}
