//Screen → calls service function → service calls API → returns data

import { API_URL } from "../constants/api";

// ─────────────────────────────────────────
// REGISTER
// Thinking: send name, email, password, role to backend
// get back token and user info
// ─────────────────────────────────────────
export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: string,
) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // tell server we're sending JSON
    },
    body: JSON.stringify({ name, email, password, role }), // convert JS object to JSON string
  });

  const data = await response.json(); // convert response to JS object

  // If server returned an error status code
  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data; // { token, user }
};

// ─────────────────────────────────────────
// LOGIN
// Thinking: send email, password
// get back token and user info
// ─────────────────────────────────────────
export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data; // { token, user }
};
