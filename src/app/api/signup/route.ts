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
    const apiResponse = await axios.post(`${api_url}/user/signup`, {
      username,
      email,
      password,
    });

    if (apiResponse.status === 201) {
      return NextResponse.json(
        { message: 'User created successfully!' },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: 'Failed to create user' },
        { status: apiResponse.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
