
const getToken = (): string => localStorage.getItem('token') || '';

interface FetchWithAuthOptions extends RequestInit {
    headers?: Record<string, string>;
}

const fetchWithAuth = async <T>(url: string, options: FetchWithAuthOptions = {}): Promise<T> => {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
        Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: T = await response.json();
    return data;
};

export default fetchWithAuth;