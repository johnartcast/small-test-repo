"use client";

import { useState } from "react";

type WeatherResponse = {
  place: { name: string; country: string };
  current: {
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
  };
};

export function WeatherSearch() {
  const [city, setCity] = useState("");
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Request failed");
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City name…"
          className="flex-1 rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
        />
        <button
          disabled={loading || !city}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Loading…" : "Search"}
        </button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
      {data && (
        <div className="rounded border border-gray-200 p-4 dark:border-gray-800">
          <h2 className="text-xl font-semibold">
            {data.place.name}, {data.place.country}
          </h2>
          <p>Temperature: {data.current.temperature_2m}°C</p>
          <p>Wind: {data.current.wind_speed_10m} km/h</p>
          <p>Weather code: {data.current.weather_code}</p>
        </div>
      )}
    </div>
  );
}
