'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TravelLog, type TravelLogProperty } from '@/model/TravelLog';
import { capitalize, getToday } from '@/lib/utils';
import fetcher from '@/lib/fetcher';

const travelLogInputs: Record<
  TravelLogProperty,
  { label?: string; type: 'text' | 'url' | 'textarea' | 'number' | 'date' }
> = {
  title: { type: 'text' },
  description: { type: 'textarea' },
  rating: { type: 'number' },
  image: { type: 'url' },
  latitude: { type: 'number' },
  longitude: { type: 'number' },
  visitDate: { label: 'Visit Date', type: 'date' },
};

export default function TravelLogForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TravelLog>({
    resolver: zodResolver(TravelLog),
    defaultValues: {
      rating: 0,
      latitude: 90,
      longitude: 180,
      // @ts-ignore
      visitDate: getToday(),
    },
  });

  const onSubmit: SubmitHandler<TravelLog> = async (data: TravelLog) => {
    const res = await fetcher('/log', data);
    console.log('Res', res);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded w-full max-w-4xl mx-auto p-8 grid md:grid-cols-2 gap-8"
    >
      {Object.entries(travelLogInputs).map(([name, value]) => {
        const property = name as TravelLogProperty;

        return (
          <div key={name} className="form-control w-full flex gap-2">
            <label className="label">
              <span className="label-text">
                {value.label ? value.label : capitalize(name)}
              </span>
            </label>
            {value.type === 'textarea' ? (
              <textarea
                className={`textarea textarea-bordered w-full ${
                  errors[property] ? 'textarea-error' : ''
                }`}
                {...register(property)}
              ></textarea>
            ) : (
              <input
                type={value.type}
                step={value.type === 'number' ? 'any' : 'false'}
                className={`input input-bordered w-full ${
                  errors[property] ? 'input-error' : ''
                }`}
                {...register(property)}
              />
            )}
            <p>{errors[property]?.message}</p>
          </div>
        );
      })}
      <input type="submit" className="btn btn-primary w-full" value="Log" />
    </form>
  );
}
