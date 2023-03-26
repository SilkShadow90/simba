// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAvailableFile } from './utils';
import { users } from './mockData.json';
import { NextApiData } from '../../api/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NextApiData>
) {
  const isAvailableFile: boolean | string = await checkAvailableFile('mockData.json');

  if (isAvailableFile) {
    const ww = {
      name: 'users',
      url: req.url,
      data: Object.values(users),
    };
    res.status(200).json(ww);
  }

  res.status(404);
}
