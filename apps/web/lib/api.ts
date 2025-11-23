const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function fetcher(url: string) {
  const res = await fetch(`${API_URL}${url}`);
  if (!res.ok) {
    throw new Error('API request failed');
  }
  return res.json();
}

export async function apiPost(url: string, data: any) {
  const res = await fetch(`${API_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Request failed' }));
    const error: any = new Error(errorData.error || 'API request failed');
    error.details = errorData.details;
    throw error;
  }
  
  return res.json();
}

export async function apiPatch(url: string, data: any) {
  const res = await fetch(`${API_URL}${url}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!res.ok) {
    throw new Error('API request failed');
  }
  
  return res.json();
}
