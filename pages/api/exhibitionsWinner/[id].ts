// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAvailableFile } from '../utils';
import { users } from '../mockData.json';
import { NextApiData, User } from '../../../api/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NextApiData>
) {
  const isAvailableFile: boolean | string = await checkAvailableFile('mockData.json');

  const { id } = req.query;

  // @ts-ignore
  const referees = Object.values(users).filter((user: User) => user.exhibitionsWinner.includes(id as string));

  if (isAvailableFile) {
    const ww = {
      name: 'exhibitionsWinner',
      url: req.url,
      data: referees,
    };
    res.status(200).json(ww);
  }

  res.status(404);
}
