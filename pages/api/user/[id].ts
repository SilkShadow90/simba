// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAvailableFile } from '../test';
import usersList from '../usersList.json';
import { User } from '../users';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const isAvailableFile: boolean | string = await checkAvailableFile('usersList.json');

  const { id } = req.query;

  const user = usersList.find((user: User) => user.id === id);

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
