import { type NextApiRequest, type NextApiResponse } from "next";
import main from "../../utils/getTransactions";
import { saveData } from "@/utils/saveWithKey";

interface Request extends NextApiRequest {
  body: {
    address: string;
  };
}

export default async function handler(req: Request, res: NextApiResponse) {
  try {
    const result = await main(req.body.address);
    await saveData(result, req.body.address);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}
