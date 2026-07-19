import { API_URL } from "../constants/api";
import { getToken } from "./storage";

// ─────────────────────────────────────────
// GET ALL CONSTRUCTIONS
// Thinking: no token needed, everyone can browse
// ─────────────────────────────────────────
export const getAllConstructions = async () => {
  const response = await fetch(`${API_URL}/constructions`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch constructions");
  }

  return data;
};

// ─────────────────────────────────────────
// GET ONE CONSTRUCTION
// Thinking: no token needed, everyone can view details
// ─────────────────────────────────────────
export const getConstructionById = async (id: string) => {
  const response = await fetch(`${API_URL}/constructions/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch construction");
  }

  return data;
};

// ─────────────────────────────────────────
// CREATE CONSTRUCTION PROFILE
// Thinking: owner only, needs token
// ─────────────────────────────────────────
export const createConstruction = async (constructionData: object) => {
  const token = await getToken();

  const response = await fetch(`${API_URL}/constructions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // attach token
    },
    body: JSON.stringify(constructionData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create construction");
  }

  return data;
};

// ─────────────────────────────────────────
// UPDATE CONSTRUCTION PROFILE
// Thinking: owner only, needs token
// ─────────────────────────────────────────
export const updateConstruction = async (id: string, updateData: object) => {
  const token = await getToken();

  const response = await fetch(`${API_URL}/constructions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update construction");
  }

  return data;
};

// ─────────────────────────────────────────
// ADD PROJECT
// Thinking: owner only, needs token
// ─────────────────────────────────────────
export const addProject = async (
  constructionId: string,
  projectData: object,
) => {
  const token = await getToken();

  const response = await fetch(
    `${API_URL}/constructions/${constructionId}/projects`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(projectData),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add project");
  }

  return data;
};

// ─────────────────────────────────────────
// GET OWNER'S OWN CONSTRUCTION PROFILE
// Thinking: owner needs to see their own profile
// ─────────────────────────────────────────
export const getMyConstruction = async () => {
  const token = await getToken();

  const response = await fetch(`${API_URL}/constructions/my-profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch profile");
  }

  return data;
};
