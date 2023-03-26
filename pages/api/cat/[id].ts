// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAvailableFile } from '../utils';
import { cats } from '../mockData.json';
import { Cat, NextApiData } from '../../../api/types';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<NextApiData>
) {
    const isAvailableFile: boolean | string = await checkAvailableFile('mockData.json');

    const { id } = req.query;

    // @ts-ignore
    const cat = cats[id];

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
