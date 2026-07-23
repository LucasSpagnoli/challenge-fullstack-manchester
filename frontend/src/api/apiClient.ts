const API_BASE_URL = import.meta.env.VITE_API_URL;
import { getAuthToken } from './cookies'

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = getAuthToken();

    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers
    });

    if (!response.ok) {
        let message = `Erro na requisição (${response.status})`;
        try {
            const data = await response.json();
            message = data?.message || message;
        } catch {
            // resposta sem corpo json
        }
        throw new ApiError(message, response.status);
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json() as Promise<T>;
}

export class ApiError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}