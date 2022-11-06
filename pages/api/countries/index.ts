import type { NextApiRequest, NextApiResponse } from 'next'
import type { Codes } from '../../codes'
import { CODES } from '../../codes'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Codes>
) {
  res.status(200).json(CODES);
}
