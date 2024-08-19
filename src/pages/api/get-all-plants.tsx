import type { NextApiRequest, NextApiResponse } from 'next';
import { Plant } from '../../components/Plants';

export default function handler(req: NextApiRequest, res: NextApiResponse<Plant[]>) {
  res.status(200).json([
    {
      name: 'Janet Craig',
      latinName: 'Dracaena deremensis',
      image: 'http://www.tropicopia.com/house-plant/thumbnails/5556.jpg',
      color: 'green',
      family: 'Liliaceae',
      height: 366,
      care: 'Water when soil is dry to the touch. Fertilize once a month during the growing season.',
    },
    {
      name: 'Lady palm',
      latinName: 'Rhapis excelsa',
      image: 'http://www.tropicopia.com/house-plant/thumbnails/5725.jpg',
      color: 'pink',
      family: 'Arecaceae',
      height: 366,
      care: 'Water when soil is dry to the touch. Fertilize once a month during the growing season.',
    },
    {
      name: 'Tailflower',
      latinName: 'Dracaena deremensis',
      image: 'http://www.tropicopia.com/house-plant/thumbnails/5491.jpg',
      color: 'lilac',
      family: 'Araceae',
      height: 61,
      care: 'Water when soil is dry to the touch. Fertilize once a month during the growing season.',
    },
  ]);
}
