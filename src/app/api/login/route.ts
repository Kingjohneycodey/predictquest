import { NextResponse } from 'next/server';
import axios from 'axios';
import { api_url } from '@/utils/config';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { message: 'All fields are required!' },
        { status: 400 }
      );
    }

    // Simulate sending data to an external API
    const apiResponse = await axios.post(`${api_url}/auth/login`, {
      email,
      password,
    });

    if (apiResponse.status === 201) {
      return NextResponse.json(
        { message: 'Login successful!' },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: 'Failed to login user' },
        { status: apiResponse.status }
      );
    }
  } catch (error: any) {
    const statusCode = error.response?.status || 500;

    // Log the error for debugging
    console.error('Error:', error.response.data.error);

    return NextResponse.json(
      { message: error.response?.data?.error || error.message || 'Internal Server Error' },
      { status: statusCode }
    );
  }
}
