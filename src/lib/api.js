const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

export async function apiRequest(endpoint, method = 'GET', body, token) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    ...(body ? { body: JSON.stringify(body) } : {})
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro na requisição');
  return data;
}

export default API_URL; 