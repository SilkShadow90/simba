// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAvailableFile } from './utils';
import { nurseries } from './mockData.json';
import { NextApiDataWithId } from '../../api/types';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<NextApiDataWithId>
) {
    const isAvailableFile: boolean | string = await checkAvailableFile('mockData.json');

    if (isAvailableFile) {
        const ww = {
            name: 'nurseries',
            url: req.url,
            data: Object.values(nurseries),
        };
        // @ts-ignore
        res.status(200).json(ww);
    }

    res.status(404);
}
