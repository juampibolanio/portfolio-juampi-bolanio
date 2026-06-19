const BASE_API_URL = process.env.NEXT_API_URL || 'http://localhost:8080/api';

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${BASE_API_URL}${endpoint}`;

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    try {
        const response = await fetch(url, {
            ...options,
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData.message || `Error en la petición: ${response.status}`);
        }

        if (response.status === 204) {
            return null as T;
        }

        return response.json();

    } catch (error) {
        console.error(`[API Client Error] en ${endpoint}:`, error);
        throw error;
    }
}
