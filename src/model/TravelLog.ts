import { z } from 'zod';

const errors = {
  title: 'Title cannot be empty.',
  description: 'Description cannot be empty.',
  url: 'Image must be a valid URL.',
  numberError: 'Expected number, received string',
  apiKey: 'API Key cannot be empty.',
  visitDateString: 'Visit Date must be a valid date.',
  visitDateTimestamp: 'Visit Date must be a valid timestamp.',
};

export const TravelLog = z.object({
  title: z.string().trim().min(1, errors.title),
  description: z.string().trim().min(1, errors.description),
  image: z.string().url(errors.url),
  rating: z.coerce.number().min(0).max(5).default(0),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  visitDate: z.coerce.date(),
});

export const TravelLogProperties = TravelLog.keyof().Enum;
export type TravelLogProperty = keyof typeof TravelLogProperties;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type TravelLog = z.infer<typeof TravelLog>;
