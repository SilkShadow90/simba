// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { checkAvailableFile } from './test';
import breedsList from './breedsList.json';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const isAvailableFile: boolean | string = await checkAvailableFile('breedsList.json')

  if (isAvailableFile) {
    const ee = {
      name: 'breeds',
      url: req.url,
      data: breedsList,
    }
    res.status(200).json(ee)
  }

  res.status(404)
}
