import axios from "axios";

// Base URL of the FastAPI backend.
const API_URL = "http://127.0.0.1:8000";

// Fetches all transactions from the backend.
export async function getTransactions() {
    const response = await axios.get(`${API_URL}/transactions`);
    return response.data;
}

// Sends a new transaction to the backend.
export async function createTransaction(data) {
    const response = await axios.post(`${API_URL}/transactions`, data);
    return response.data;
}

// Deletes a transaction by id.
export async function deleteTransaction(id) {
    const response = await axios.delete(`${API_URL}/transactions/${id}`);
    return response.data;
}