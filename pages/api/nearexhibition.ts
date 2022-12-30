import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAvailableFile } from './test';
import nearexhibitionList from './nearexhibitionList.json';

type Data = {
    name: string
}

export type Nearexhibition = {
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
    const isAvailableFile: boolean | string = await checkAvailableFile('nearexhibitionList.json');

    if (isAvailableFile) {
        const ww = {
            name: 'nearexhibition',
            url: req.url,
            data: nearexhibitionList,
        };
        res.status(200).json(ww);
    }

    res.status(404);
}
