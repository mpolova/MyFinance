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

// Requests AI categorization for a transaction description.
export async function categorizeTransaction(description) {
    const response = await axios.post(`${API_URL}/ai/categorize`, { description });
    return response.data;
}

// Fetches AI generated financial advice based on all transactions.
export async function getFinancialAdvice() {
    const response = await axios.get(`${API_URL}/ai/advice`);
    return response.data;
}

// Fetches anomaly detection results.
export async function getAnomalies() {
    const response = await axios.get(`${API_URL}/ai/anomalies`);
    return response.data;
}

// Fetches spending predictions for next month.
export async function getSpendingPrediction() {
    const response = await axios.get(`${API_URL}/ai/predict`);
    return response.data;
}