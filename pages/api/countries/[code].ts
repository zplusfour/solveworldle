import type { NextApiRequest, NextApiResponse } from "next";
import { CODES } from '../../codes'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;
  const rcode = code as string;
  const country = CODES[rcode];

  if (country) {
    res.status(200).send(country);
  } else {
    res.status(404).send('Not found.');
  }
}