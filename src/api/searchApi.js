// src/api/searchApi.js

// Adjust the URL if your API is deployed elsewhere
const API_BASE_URL = '/api';

export const searchProducts = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Search API Error:', error);
    // Return empty results or handle error gracefully
    return { results: [], suggestions: [], total: 0 };
  }
};