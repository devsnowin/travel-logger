import type { NextApiRequest, NextApiResponse } from 'next';
import { TravelLogs } from '@/model/TravelLogs';
import { TravelLog } from '@/model/TravelLog';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'POST': {
        const validatedLog = await TravelLog.parseAsync(req.body);
        const log = await TravelLogs.insertOne(validatedLog);

        const data = {
          ...validatedLog,
          _id: log.insertedId,
        };

        return res.status(200).json({ data });
      }
      case 'GET': {
        const log = await TravelLogs.find().toArray();
        return res.status(200).json({ data: log });
      }
      default: {
        return res.status(405).json({ message: 'Method not allowed' });
      }
    }
  } catch (e) {
    const error = e as Error;
    return res.status(405).json({ message: error.message });
  }
}
