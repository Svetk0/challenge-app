import { NextResponse } from 'next/server';

const API_BASE_URL = 'http://193.164.150.86:8098';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit') || '100';

  try {
    const response = await fetch(`${API_BASE_URL}/challenges/in-progress/?limit=${limit}`, {
      headers: {
        Authorization: request.headers.get('Authorization') || '',
      },
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch challenges' + e }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await fetch(`${API_BASE_URL}/challenges/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: request.headers.get('Authorization') || '',
      },
      body: JSON.stringify(body.dataAdd),
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create challenge' + e }, { status: 500 });
  }
}
