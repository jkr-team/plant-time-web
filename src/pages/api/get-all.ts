import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<string[]>) {
  if (req.method !== 'GET') {
    res.status(405).send([]);
  }

  res
    .status(200)
    .json([
      'c7d22e72-5bc3-4efc-a0e3-045aed4123b8',
      'bce40aa3-4756-45a5-b3bd-6ba92b9907fd',
      '5c944364-e8b1-4ff1-b291-3d6dee1349fc',
    ]);
}
