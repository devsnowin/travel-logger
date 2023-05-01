import TravelLogForm from '@/components/TravelLogForm';

export default async function Home() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="font-bold text-4xl py-8">Travel Logger 🏖️</h1>
      <TravelLogForm />
    </main>
  );
}
