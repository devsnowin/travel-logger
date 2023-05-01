import { WithId } from 'mongodb';
import db from '@/lib/db';

import { TravelLog } from './TravelLog';

export type TravelLogWithId = WithId<TravelLog>;

export const TravelLogs = db.collection<TravelLog>('logs');
