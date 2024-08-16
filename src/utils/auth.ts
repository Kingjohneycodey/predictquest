// src/utils/auth.ts

export function getTokenFromRequest(request: Request): string | null {
    // Extract token from headers or cookies
    const headers = request.headers;
  
    // Option 1: Extract token from Authorization header
    const authHeader = headers.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7); // Remove 'Bearer ' prefix
    }
  
    // Option 2: Extract token from cookies (assuming cookies are available)
    // For Next.js 13.4 or later, you can use `cookies()` function from `next/headers`
    // const cookies = cookies();
    // const token = cookies.get('token');
    // if (token) {
    //   return token;
    // }
  
    return null;
  }
  