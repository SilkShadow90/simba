import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAvailableFile } from './test';
import lastexhibitionList from "./allExhibitionList.json";
import {earlyDate} from "../../utils";

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
    const isAvailableFile: boolean | string = await checkAvailableFile('allExhibitionList.json');

    const filteredLastexhibitionList = lastexhibitionList.sort((a:any, b:any) => Number(new Date(a.dateStart)) - Number(new Date(b.dateStart))).filter(ex => !earlyDate(ex.dateStart));

    if (isAvailableFile) {
        const ww = {
            name: 'nearexhibition',
            url: req.url,
            data: filteredLastexhibitionList,
        };
        res.status(200).json(ww);
    }

    res.status(404);
}
