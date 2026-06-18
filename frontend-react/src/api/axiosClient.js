export async function request(path, options = {}) {
  let token = null;
  try {
    const savedSession = localStorage.getItem("ecommerce-auth-session") ?? sessionStorage.getItem("ecommerce-auth-session");
    token = savedSession ? JSON.parse(savedSession).accessToken : null;
  } catch {
    token = null;
  }

  const response = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {})
    },
    ...options
  });

  if (!response.ok) {
    let message = `${response.status} ${response.statusText}`;

    try {
      const errorBody = await response.json();
      message = errorBody.message ?? message;
    } catch {
      // Keep the HTTP status message when the response has no JSON body.
    }

    throw new Error(message);
  }

  if (response.status === 204) return null;
  return response.json();
}

export function health(path) {
  return request(path);
}
