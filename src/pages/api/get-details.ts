import type { NextApiRequest, NextApiResponse } from 'next';
import { type Plant } from '../../components/Plants';

type ResponseData = {
  results?: Plant[];
  error?: {
    code: string;
    message: string;
  };
};

const data: Plant[] = [
  {
    id: 'c7d22e72-5bc3-4efc-a0e3-045aed4123b8',
    name: 'Janet Craig',
    latinName: 'Dracaena deremensis',
    image: 'http://www.tropicopia.com/house-plant/thumbnails/5556.jpg',
    color: 'green',
    family: 'Liliaceae',
    height: 366,
    care: 'Water when soil is dry to the touch. Fertilize once a month during the growing season.',
  },
  {
    id: 'bce40aa3-4756-45a5-b3bd-6ba92b9907fd',
    name: 'Lady palm',
    latinName: 'Rhapis excelsa',
    image: 'http://www.tropicopia.com/house-plant/thumbnails/5725.jpg',
    color: 'pink',
    family: 'Arecaceae',
    height: 366,
    care: 'Water when soil is dry to the touch. Fertilize once a month during the growing season.',
  },
  {
    id: '5c944364-e8b1-4ff1-b291-3d6dee1349fc',
    name: 'Tailflower',
    latinName: 'Dracaena deremensis',
    image: 'http://www.tropicopia.com/house-plant/thumbnails/5491.jpg',
    color: 'lilac',
    family: 'Araceae',
    height: 61,
    care: 'Water when soil is dry to the touch. Fertilize once a month during the growing season.',
  },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'POST') {
    res.status(405).send({
      error: {
        code: 'INVALID_METHOD',
        message: 'Only POST requests are accepted',
      },
    });
    return;
  }

  if (!Array.isArray(req.body)) {
    res.status(400).json({
      error: {
        code: 'INVALID_BODY_TYPE',
        message: 'Request body must be a JSON array of strings.',
      },
    });
    return;
  }

  const LIMIT = 10;
  const ids = Array.from(new Set(req.body));

  const plants: Plant[] = ids
    .slice(0, LIMIT)
    .map((id) => {
      return data.find((p) => p.id === id);
    })
    .filter(Boolean) as Plant[];

  if (ids.length > LIMIT) {
    res.status(200).json({
      results: plants,
      error: {
        code: 'OVER_LIMIT',
        message: `More than ${LIMIT} IDs were provided, details for only the first ${LIMIT} ids are given`,
      },
    });
  }

  res.status(200).json({
    results: plants,
  });
}
