// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAvailableFile } from './test';
import nurseriesList from './nurseriesList.json';

export type Data = {
    name: string
    id: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const isAvailableFile: boolean | string = await checkAvailableFile('nurseriesList.json');

    if (isAvailableFile) {
        const ww = {
            name: 'nurseries',
            url: req.url,
            data: nurseriesList,
        };
        // @ts-ignore
        res.status(200).json(ww);
    }

    res.status(404);
}
