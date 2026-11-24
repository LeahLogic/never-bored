import { useState, useEffect } from 'react';
import './App.css';

function App() {

    const [activity, setActivity] = useState(null);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {

        const getActivity = async () => {
            setLoading(true);
            setError(false);

            try {
                const response = await fetch(
                    "https://bored.api.lewagon.com/api/activity"
                );

                if (!response.ok) {
                    throw new Error("Unable to load activity");
                }

                const data = await response.json();
                setActivity(data);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        getActivity();

    }, [count]);

    const changeActivity = () => {
        setCount(count + 1);
    }

    return (
        <div className="App">

            <header className="header">
                <span className="logo">never<span>bored.</span></span>
                <span className="header-text">Make today different.</span>
            </header>

            <main className="main">

                <div className="intro">
                    <span className="subtitle">A LITTLE DAILY INSPIRATION</span>

                    <h1>Bored?<br />
                        <span>Let's change that.</span>
                    </h1>

                    <p>
                        Discover something new, try something different
                        and make the most of your free time.
                    </p>
                </div>

                <div className="activity-card">

                    <div className="activity-icon">💡</div>

                    <span className="card-label">YOUR NEXT ADVENTURE</span>

                    {loading ? (
                        <h2>Finding something fun...</h2>
                    ) : error ? (
                        <h2>Something went wrong. Try again!</h2>
                    ) : activity && (
                        <>
                            <h2>{activity.activity}</h2>

                            <div className="activity-info">

                                <div className="info-item">
                                    <span className="info-icon">🎯</span>
                                    <span className="info-label">Category</span>
                                    <span className="info-value">
                                        {activity.type}
                                    </span>
                                </div>

                                <div className="info-item">
                                    <span className="info-icon">👥</span>
                                    <span className="info-label">Participants</span>
                                    <span className="info-value">
                                        {activity.participants}
                                    </span>
                                </div>

                                <div className="info-item">
                                    <span className="info-icon">💰</span>
                                    <span className="info-label">Budget</span>
                                    <span className="info-value">
                                        {activity.price === 0
                                            ? "Free"
                                            : activity.price <= 0.3
                                                ? "Low"
                                                : activity.price <= 0.6
                                                    ? "Medium"
                                                    : "High"}
                                    </span>
                                </div>

                            </div>
                        </>
                    )}

                    <button
                        className="activity-btn"
                        onClick={changeActivity}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Give me another idea ↗"}
                    </button>

                </div>

                <p className="bottom-text">
                    Small adventures make great memories.
                </p>

            </main>

            <footer className="footer">
                <p>Made for curious minds ✦ Never Bored</p>
                <a
                    href="https://bored.api.lewagon.com/"
                    target="_blank"
                    rel="noreferrer"
                >
                    Powered by Bored API
                </a>
            </footer>

        </div>
    );
}

export default App;