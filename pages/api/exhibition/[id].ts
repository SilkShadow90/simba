import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAvailableFile } from '../utils';
import { exhibitions } from '../mockData.json';
import { NextApiData } from '../../../api/types';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<NextApiData>
) {
    const isAvailableFile: boolean | string = await checkAvailableFile('mockData.json');

    const { id } = req.query;
    // @ts-ignore
    const ex = exhibitions[id];

    if (isAvailableFile) {
        const ww = {
            name: 'exhibition',
            url: req.url,
            data: ex,
        };
        res.status(200).json(ww);
    }

    res.status(404);
}
