const getBaseUrl = () => {
  const isBrowser = typeof window !== 'undefined';
  if (isBrowser) {
    return process.env.NEXT_PUBLIC_API_URL || '';
  }
  return (
    process.env.INTERNAL_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    'http://localhost:3001'
  );
};

const resolveUrl = (url: string) => {
  if (url.startsWith('http')) {
    return url;
  }
  const base = getBaseUrl();
  return base ? `${base}${url}` : url;
};

export async function fetcher(url: string) {
  const fullUrl = resolveUrl(url);
  const res = await fetch(fullUrl, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('API request failed');
  }
  return res.json();
}

export async function apiPost(url: string, data: any) {
  const fullUrl = resolveUrl(url);
  const res = await fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    cache: 'no-store',
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
  const fullUrl = resolveUrl(url);
  const res = await fetch(fullUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    cache: 'no-store',
  });
  
  if (!res.ok) {
    throw new Error('API request failed');
  }
  
  return res.json();
}
