// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAvailableFile } from './test';
import usersList from './usersList.json';

type Data = {
  name: string
}

export type User = {
  id: string
  name: string
  catName: string
  breed: string
  phone: string
  email: string
  prizes?: string[]
  image: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const isAvailableFile: boolean | string = await checkAvailableFile('usersList.json');

  if (isAvailableFile) {
    const ww = {
      name: 'users',
      url: req.url,
      data: usersList,
    };
    res.status(200).json(ww);
  }

  res.status(404);
}
