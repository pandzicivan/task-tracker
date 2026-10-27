const BASE_URL = import.meta.env.VITE_BASE_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export async function http(path, method = "GET", payload) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_TOKEN}`
    },
    body: payload ? JSON.stringify(payload) : null,
  });

  if (!res.ok) {
    const text = await res.text();
    let message = text;
    try {
      const data = JSON.parse(text);
      message = data.message ?? data.error ?? text;
    } catch {
      // body is plain text, keep as is
    }
    throw new Error(message || res.statusText || `HTTP ${res.status}`);
  }

  return res.json();
}