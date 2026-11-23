import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Weather API is not configured' },
      { status: 500 },
    );
  }

  const location = new URL(request.url).searchParams.get('q')?.trim();

  if (!location) {
    return NextResponse.json(
      { error: 'A location is required' },
      { status: 400 },
    );
  }

  const weatherUrl = new URL(
    'https://api.weatherapi.com/v1/forecast.json',
  );
  weatherUrl.searchParams.set('key', apiKey);
  weatherUrl.searchParams.set('q', location);
  weatherUrl.searchParams.set('days', '7');
  weatherUrl.searchParams.set('aqi', 'yes');
  weatherUrl.searchParams.set('alerts', 'yes');

  const weatherResponse = await fetch(weatherUrl, { cache: 'no-store' });
  const body = await weatherResponse.text();

  return new Response(body, {
    status: weatherResponse.status,
    headers: {
      'Content-Type':
        weatherResponse.headers.get('Content-Type') ?? 'application/json',
    },
  });
}
