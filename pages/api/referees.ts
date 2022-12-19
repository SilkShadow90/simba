// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAvailableFile } from './test';
import usersList from './usersList.json';
import { User } from './users';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const isAvailableFile: boolean | string = await checkAvailableFile('usersList.json');

  const referees = usersList.filter((user: User) => user.isReferee);

  if (isAvailableFile) {
    const ww = {
      name: 'referees',
      url: req.url,
      data: referees,
    };
    res.status(200).json(ww);
  }

  res.status(404);
}
