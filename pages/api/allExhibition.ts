import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAvailableFile } from './utils';
import { exhibitions } from './mockData.json';
import { NextApiData } from '../../api/types';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<NextApiData>
) {
    const isAvailableFile: boolean | string = await checkAvailableFile('mockData.json');

    const allExhibitionList = Object.values(exhibitions).sort((a:any, b:any) => Number(new Date(a.dateStart)) - Number(new Date(b.dateStart)));


    if (isAvailableFile) {
        const ww = {
            name: 'allExhibition',
            url: req.url,
            data: allExhibitionList,
        };
        res.status(200).json(ww);
    }

    res.status(404);
}
