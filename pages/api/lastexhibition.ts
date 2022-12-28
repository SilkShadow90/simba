import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAvailableFile } from './test';
import lastexhibitionList from './lastexhibitionList.json';

type Data = {
    name: string
}

export type Lastexhibition = {
    id: string
    name: string
    time: string
    image: string
    csssrc: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const isAvailableFile: boolean | string = await checkAvailableFile('lastexhibitionList.json');

    if (isAvailableFile) {
        const ww = {
            name: 'lastexhibition',
            url: req.url,
            data: lastexhibitionList,
        };
        res.status(200).json(ww);
    }

    res.status(404);
}