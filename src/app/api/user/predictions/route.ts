// src/app/api/predictions/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';
import { api_url, getToken, } from '@/utils/config';
import axiosInstance from '@/utils/apiClient';
import { getTokenFromRequest } from '@/utils/auth';




export async function GET(request: Request) {
  const token = getTokenFromRequest(request)
 
  try {
    console.log(token)

    const response = await axios.get(`${api_url}/user/predictions`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    } );
    return NextResponse.json(response.data);
  } catch (error: any) {
    const statusCode = error?.response?.status || 500;

    // Log the error for debugging
    console.error('Error:', error?.response?.data?.error);

    return NextResponse.json(
      { message: error?.response?.data?.error || error?.message || 'Internal Server Error' },
      { status: statusCode }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, details } = await request.json();
    const response = await axios.post(`${api_url}/user/predictions`, { title, details });
    return NextResponse.json(response.data);
  } catch (error: any) {

    const statusCode = error?.response?.status || 500;

    // Log the error for debugging
    console.error('Error:', error?.response?.data?.error);

    return NextResponse.json(
      { message: error?.response?.data?.error || error?.message || 'Internal Server Error' },
      { status: statusCode }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await axios.delete(`${api_url}/user/predictions/${id}`);
    return NextResponse.json({ message: 'Prediction deleted' });
  } catch (error: any) {

    const statusCode = error?.response?.status || 500;

    // Log the error for debugging
    console.error('Error:', error?.response?.data?.error);

    return NextResponse.json(
      { message: error?.response?.data?.error || error?.message || 'Internal Server Error' },
      { status: statusCode }
    );
  }
}
