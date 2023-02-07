import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAvailableFile } from './test';
import lastexhibitionList from './allExhibitionList.json';
import { earlyDate } from '../../utils';

type Data = {
    name: string
}

export type Lastexhibition = {
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

    const filteredExhibitionList = lastexhibitionList.sort((a:any, b:any) => Number(new Date(a.dateStart)) - Number(new Date(b.dateStart))).filter(ex => earlyDate(ex.dateStart));

  // const filteredExhibitionListDate =  lastexhibitionList

    if (isAvailableFile) {
        const ww = {
            name: 'lastexhibition',
            url: req.url,
            data: filteredExhibitionList,
        };
        res.status(200).json(ww);
    }

    res.status(404);
}
