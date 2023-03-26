// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAvailableFile } from '../utils';
import { users } from '../mockData.json';
import { User } from '../../../api/types';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const isAvailableFile: boolean | string = await checkAvailableFile('mockData.json');

  const { id } = req.query;

  // @ts-ignore
  const user = users[id];

  if (isAvailableFile && user) {
    const ww = {
      name: 'user',
      url: req.url,
      data: user,
    };
    res.status(200).json(ww);
  }

  res.status(404);
}
