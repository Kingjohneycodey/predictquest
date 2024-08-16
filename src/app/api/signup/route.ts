import { NextResponse } from 'next/server';
import axios from 'axios';
import { api_url } from '@/utils/config';

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    // Basic validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required!' },
        { status: 400 }
      );
    }

    // Simulate sending data to an external API
    const apiResponse = await axios.post(`${api_url}/auth/signup`, {
      username,
      email,
      password,
    });

    console.log('Received response from external API:', apiResponse);

    if (apiResponse.status === 201) {
      const { token, user } = apiResponse.data;
      return NextResponse.json(
        { message: 'User created successfully!', token, user },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: 'Failed to create user' },
        { status: apiResponse.status }
      );
    }
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
