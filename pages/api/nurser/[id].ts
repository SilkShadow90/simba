// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAvailableFile } from '../utils';
import { nurseries } from '../mockData.json';
import { NextApiData, Nurser } from '../../../api/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NextApiData>
) {
  const isAvailableFile: boolean | string = await checkAvailableFile('mockData.json');

  const { id } = req.query;

  // @ts-ignore
  const nurser = nurseries[id] || null;

  if (isAvailableFile && nurser) {
    const ww = {
      name: 'nurser',
      url: req.url,
      data: nurser,
    };
    res.status(200).json(ww);
  }

  res.status(404);
}
