import { type NextApiRequest, type NextApiResponse } from "next";
import main from "../../utils/getTransactions";
import { saveData } from "@/utils/saveWithKey";

interface Request extends NextApiRequest {
  body: {
    address: string;
  };
}

export default async function handler(_req: Request, res: NextApiResponse) {
  try {
    const result = await main("0x514E3B94F0287cAf77009039B72C321Ef5F016E6");
    await saveData(result, "0x514E3B94F0287cAf77009039B72C321Ef5F016E6");
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}
