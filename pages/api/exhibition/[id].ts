import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAvailableFile } from '../test';
import allExhibitionList from '../allExhibitionList.json';

type Data = {
    name: string
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const isAvailableFile: boolean | string = await checkAvailableFile('allExhibitionList.json');

    const { id } = req.query;
    const ex = allExhibitionList.find((exhibition) => exhibition.id === id);
    console.log("ex",ex)
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