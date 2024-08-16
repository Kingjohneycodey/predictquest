import { NextResponse } from 'next/server';
import axios from 'axios';
import { api_url, token } from '@/utils/config';

export async function GET(request: Request) {
  try {
    // Fetch user profile from external API
    const apiResponse = await axios.get(`${api_url}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (apiResponse.status === 200) {
      return NextResponse.json(apiResponse.data, { status: 200 });
    } else {
      return NextResponse.json(
        { message: 'Failed to fetch user profile' },
        { status: apiResponse.status }
      );
    }
  } catch (error: any) {
    console.error('Error fetching user profile:', error);

    return NextResponse.json(
      { message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
