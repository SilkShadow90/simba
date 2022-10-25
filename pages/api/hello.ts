// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { checkAvailableFile } from './test';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  console.log(req.url);
  const isAvailableFile: boolean | string = await checkAvailableFile('components.json')
    // console.log('isAvailableFile', isAvailableFile);
  const ww = {
    name: 'John Doe',
    file: isAvailableFile,
    url: req.url,
  }

  res.status(200).json(ww)
}
