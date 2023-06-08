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
      const { token, newPass, confirmnewPass } = req.body;
      const response = await axios.post(
        `${URL_API}/changePass`,
        {
          token,
          newPass,
          confirmnewPass,
        },
        {
          timeout: 3000,
        }
      );
      res.status(200).json(response?.data);
    } catch (error: any) {
      if (error.code === "ECONNABORTED") {
        // Request timed out
        res.status(500).json({
          response: {
            data: { message: "Request timed out | Internal Server error" },
          },
        });
      } else {
        // Other error occurred
        res.status(422).json(error.response.data);
      }
    }
  }
}
