// src/app/api/predictions/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';
import { api_url } from '@/utils/config';

export async function GET() {
  try {
    const response = await axios.get(`${api_url}/predictions`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching predictions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, details } = await request.json();
    const response = await axios.post(`${api_url}/predictions`, { title, details });
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ message: 'Error adding prediction' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await axios.delete(`${api_url}/predictions/${id}`);
    return NextResponse.json({ message: 'Prediction deleted' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting prediction' }, { status: 500 });
  }
}
