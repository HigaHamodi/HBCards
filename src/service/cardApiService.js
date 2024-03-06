import axios from "axios";

const API_BASE_URL = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2";

// Fetch card details by ID
export const fetchCardDetailsById = async (cardId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cards/${cardId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching card details:", error);
    throw error;
  }
};

// Fetch all cards (with potential filters for liked cards)
export const fetchCards = async (userId) => {
  try {
    let url = `${API_BASE_URL}/cards`;
    if (userId) url += `?userId=${userId}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw error;
  }
};

// Update like status of a card
export const updateLikeStatus = async (cardId, likeStatus, authToken) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/cards/${cardId}`,
      { like: likeStatus },
      {
        headers: { "x-auth-token": authToken },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating like status:", error);
    throw error;
  }
};

// Delete a card by ID
export const deleteCardById = async (cardId, authToken) => {
  try {
    await axios.delete(`${API_BASE_URL}/cards/${cardId}`, {
      headers: { "x-auth-token": authToken },
    });
  } catch (error) {
    console.error("Error deleting card:", error);
    throw error;
  }
};

// Fetch user's liked cards
export const fetchLikedCards = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cards/`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching liked cards:", error);
    throw error;
  }
};

// Add or update a card
export const addOrUpdateCard = async (cardData, authToken) => {
  try {
    if (cardData._id) {
      // Update existing card
      const response = await axios.put(
        `${API_BASE_URL}/cards/${cardData._id}`,
        cardData,
        {
          headers: { "x-auth-token": authToken },
        }
      );
      return response.data;
    } else {
      // Add new card
      const response = await axios.post(`${API_BASE_URL}/cards`, cardData, {
        headers: { "x-auth-token": authToken },
      });
      return response.data;
    }
  } catch (error) {
    console.error("Error adding/updating card:", error);
    throw error;
  }
};

// Additional API operations can be added here as needed
