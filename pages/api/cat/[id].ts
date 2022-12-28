// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAvailableFile } from '../test';
import catsList from '../catsList.json';
import { Cats } from '../cats';

type Data = {
    name: string
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const isAvailableFile: boolean | string = await checkAvailableFile('catsList.json');

    const { id } = req.query;

    const cat = catsList.find((cats: Cats) => cats.id === id);

    if (isAvailableFile && cat) {
        const ww = {
            name: 'cat',
            url: req.url,
            data: cat,
        };
        res.status(200).json(ww);
    }

    res.status(404);
}
