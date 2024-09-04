import type { NextApiRequest, NextApiResponse } from 'next';
import { type Plant } from '../../components/Plants';

type ResponseData = {
  results?: Plant[];
  error?: {
    code: string;
    message: string;
  };
};

const pageSize = 10;
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
  if (req.method !== 'GET') {
    res.status(405).send({
      error: {
        code: 'INVALID_METHOD',
        message: 'Only GET requests are accepted',
      },
    });
    return;
  }

  const page = typeof req.query.page === 'string' ? Number.parseInt(req.query.page) : 0;

  if (isNaN(page) || page < 0) {
    res.status(405).send({
      error: {
        code: 'INVALID_QUERY',
        message: 'Page parameter must be a positive integer',
      },
    });
    return;
  }

  res.status(200).json({
    results: data.slice(page * pageSize, (page + 1) * pageSize),
  });
}
