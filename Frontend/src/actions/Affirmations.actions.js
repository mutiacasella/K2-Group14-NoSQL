// src/actions/affirmation.actions.js
import axios from 'axios';
const API = import.meta.env.VITE_API_URL;

// Helper buat standar response
const baseApiResponse = (data, isSuccess) => ({
    success: isSuccess,
    data: data || null,
});

// Create Affirmation
export const createAffirmation = async (input) => {
    try {
        const response = await axios.post(`${API}/affirmations`, input);
        return baseApiResponse(response.data.payload, true);
    } catch (error) {
        console.error("Create Affirmation Error:", error);
        return baseApiResponse(null, false);
    }
};

// Get All Affirmations
export const getAllAffirmations = async () => {
    try {
        const response = await axios.get(`${API}/affirmations`);
        return baseApiResponse(response.data.payload, true);
    } catch (error) {
        console.error("Get All Affirmations Error:", error);
        return baseApiResponse(null, false);
    }
};


// Delete Affirmation
export const deleteAffirmation = async (id) => {
    try {
        const response = await axios.delete(`${API}/affirmations/${id}`);
        return baseApiResponse(response.data.payload, true);
    } catch (error) {
        console.error("Delete Affirmation Error:", error);
        return baseApiResponse(null, false);
    }
};
