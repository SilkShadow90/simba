// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAvailableFile } from './test';
import nurseriesList from './nurseriesList.json';


type Data = {
    name: string
}

export type Nurseries = {
    id: string
    name: string
    worked: string
    nameWork: string
    suite:string
    phone: string
    email: string
    image: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const isAvailableFile: boolean | string = await checkAvailableFile('nurseriesList.json');

    const { id } = req.query;

    const nurseries = nurseriesList.find((nurseries) => nurseries.id === id);

    if (isAvailableFile) {
        const ww = {
            name: 'nurseries',
            url: req.url,
            data: nurseries,
        };
        res.status(200).json(ww);
    }

    res.status(404);
}
