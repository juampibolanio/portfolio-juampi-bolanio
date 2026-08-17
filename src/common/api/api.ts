export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
  
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');

  if (typeof window !== 'undefined') {
    const cookies = document.cookie.split('; ');
    const authCookie = cookies.find(row => row.startsWith('portfolio_admin_auth='));
    
    if (authCookie) {
      const token = authCookie.split('=')[1];
      headers.set('Authorization', `Basic ${token}`);
    }
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `API Error: ${response.status}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}
