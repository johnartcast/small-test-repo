import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  if (!city) {
    return NextResponse.json({ error: "Missing city" }, { status: 400 });
  }

  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city,
    )}&count=1`,
    { next: { revalidate: 3600 } },
  );
  if (!geoRes.ok) {
    return NextResponse.json({ error: "Geocoding failed" }, { status: 502 });
  }
  const geo = (await geoRes.json()) as {
    results?: { name: string; country: string; latitude: number; longitude: number }[];
  };
  const place = geo.results?.[0];
  if (!place) {
    return NextResponse.json({ error: "City not found" }, { status: 404 });
  }

  const wxRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,weather_code,wind_speed_10m`,
    { next: { revalidate: 300 } },
  );
  if (!wxRes.ok) {
    return NextResponse.json({ error: "Weather lookup failed" }, { status: 502 });
  }
  const wx = (await wxRes.json()) as {
    current: {
      temperature_2m: number;
      weather_code: number;
      wind_speed_10m: number;
    };
  };
  return NextResponse.json({
    place: { name: place.name, country: place.country },
    current: wx.current,
  });
}
