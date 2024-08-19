import type { NextApiRequest, NextApiResponse } from 'next';
import { Plant } from '../../components/Plants';

export default function handler(req: NextApiRequest, res: NextApiResponse<Plant[]>) {
  res.status(200).json([]);
}
