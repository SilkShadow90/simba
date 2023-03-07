import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAvailableFile } from './test';
import catsList from './catsList.json';

type Data = {
    name: string
}

export type Cats = {
    id: string
    name: string
    breed: string
    image: string
    csssrc: string
    favorite: boolean
    club: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const isAvailableFile: boolean | string = await checkAvailableFile('catsList.json');

    if (isAvailableFile) {
        const ww = {
            name: 'cats',
            url: req.url,
            data: catsList,
        };
        res.status(200).json(ww);
    }

    res.status(404);
}