import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAvailableFile } from './test';
import allExhibition from './allExhibitionList.json';
import { earlyDate } from '../../utils';

type Data = {
    name: string
}

export type Exhibition = {
    id: string
    location: string,
    type?: string,
    club?: string,
    image: string
    csssrc: string
    dateStart: string
    dateEnd: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const isAvailableFile: boolean | string = await checkAvailableFile('allExhibitionList.json');

    const allExhibitionList = allExhibition.sort((a:any, b:any) => Number(new Date(a.dateStart)) - Number(new Date(b.dateStart)));


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
