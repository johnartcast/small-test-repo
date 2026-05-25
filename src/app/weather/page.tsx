import { WeatherSearch } from "@/components/WeatherSearch";

export default function WeatherPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Weather</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Search any city. The form posts to <code>/api/weather</code>, which
        proxies Open-Meteo (geocoding + forecast) on the Node runtime.
      </p>
      <WeatherSearch />
    </div>
  );
}
