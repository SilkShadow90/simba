// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAvailableFile } from './test';
import titulsList from './titulsList.json';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const isAvailableFile: boolean | string = await checkAvailableFile('titulsList.json');

  if (isAvailableFile) {
    const ww = {
      name: 'tituls',
      url: req.url,
      data: titulsList,
    };
    res.status(200).json(ww);
  }

  res.status(404);
}
