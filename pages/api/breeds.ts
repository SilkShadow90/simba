// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAvailableFile } from './utils';
import { breeds } from './mockData.json';
import { NextApiData } from '../../api/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NextApiData>
) {
  const isAvailableFile: boolean | string = await checkAvailableFile('mockData.json');

  if (isAvailableFile) {
    const ee = {
      name: 'breeds',
      url: req.url,
      data: Object.values(breeds),
    };
    res.status(200).json(ee);
  }

  res.status(404);
}
