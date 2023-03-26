import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAvailableFile } from './utils';
import { exhibitions } from "./mockData.json";
import {earlyDate} from "../../utils";
import { NextApiData } from '../../api/types';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<NextApiData>
) {
    const isAvailableFile: boolean | string = await checkAvailableFile('mockData.json');

    const filteredLastExhibitionList = Object.values(exhibitions).sort((a:any, b:any) => Number(new Date(a.dateStart)) - Number(new Date(b.dateStart))).filter(ex => !earlyDate(ex.dateStart));

    if (isAvailableFile) {
        const ww = {
            name: 'nearexhibition',
            url: req.url,
            data: filteredLastExhibitionList,
        };
        res.status(200).json(ww);
    }

    res.status(404);
}
