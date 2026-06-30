import { useState } from "react";
import { getFinancialAdvice, getAnomalies, getSpendingPrediction } from "../api";

// AI Insights component. Shows financial advice, anomalies and predictions.
function AIInsights({ transactions }) {
    const [advice, setAdvice] = useState("");
    const [anomalies, setAnomalies] = useState([]);
    const [predictions, setPredictions] = useState({});
    const [loadingAdvice, setLoadingAdvice] = useState(false);
    const [loadingAnomalies, setLoadingAnomalies] = useState(false);
    const [loadingPredictions, setLoadingPredictions] = useState(false);

    // Fetches AI financial advice and updates state.
    async function handleGetAdvice() {
        setLoadingAdvice(true);
        try {
            const data = await getFinancialAdvice();
            setAdvice(data.advice);
        } catch (error) {
            console.error("Failed to get advice:", error);
        }
        setLoadingAdvice(false);
    }

    // Fetches anomaly detection results and updates state.
    async function handleGetAnomalies() {
        setLoadingAnomalies(true);
        try {
            const data = await getAnomalies();
            setAnomalies(data.anomalies);
        } catch (error) {
            console.error("Failed to get anomalies:", error);
        }
        setLoadingAnomalies(false);
    }

    // Fetches spending predictions and updates state.
    async function handleGetPredictions() {
        setLoadingPredictions(true);
        try {
            const data = await getSpendingPrediction();
            setPredictions(data.predictions);
        } catch (error) {
            console.error("Failed to get predictions:", error);
        }
        setLoadingPredictions(false);
    }

    return (
        <section className="ai-section">
            <h3 className="ai-section__title">AI Insights</h3>

            {/* Financial Advice */}
            <div className="ai-card">
                <div className="ai-card__header">
                    <span className="ai-card__icon">🤖</span>
                    <h4 className="ai-card__title">Financial Advice</h4>
                </div>
                <button
                    className="ai-card__button"
                    onClick={handleGetAdvice}
                    disabled={loadingAdvice}
                >
                    {loadingAdvice ? "Analyzing..." : "Get Advice"}
                </button>
                {advice && (
                    <div className="ai-card__result">
                        <p>{advice}</p>
                    </div>
                )}
            </div>

            {/* Anomaly Detection */}
            <div className="ai-card">
                <div className="ai-card__header">
                    <span className="ai-card__icon">⚠️</span>
                    <h4 className="ai-card__title">Anomaly Detection</h4>
                </div>
                <button
                    className="ai-card__button"
                    onClick={handleGetAnomalies}
                    disabled={loadingAnomalies}
                >
                    {loadingAnomalies ? "Analyzing..." : "Check Anomalies"}
                </button>
                {anomalies.length > 0 ? (
                    <div className="ai-card__result">
                        {anomalies.map((a, i) => (
                            <p key={i} className="ai-card__anomaly">
                                ⚠️ {a.message}
                            </p>
                        ))}
                    </div>
                ) : anomalies.length === 0 && !loadingAnomalies && (
                    <p className="ai-card__empty">No anomalies detected.</p>
                )}
            </div>

            {/* Spending Prediction */}
            <div className="ai-card">
                <div className="ai-card__header">
                    <span className="ai-card__icon">📈</span>
                    <h4 className="ai-card__title">Next Month Prediction</h4>
                </div>
                <button
                    className="ai-card__button"
                    onClick={handleGetPredictions}
                    disabled={loadingPredictions}
                >
                    {loadingPredictions ? "Analyzing..." : "Predict Spending"}
                </button>
                {Object.keys(predictions).length > 0 && (
                    <div className="ai-card__result">
                        {Object.entries(predictions).map(([category, amount]) => (
                            <p key={category}>
                                {category}: <strong>€{amount}</strong>
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default AIInsights;