import { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
      : 'http://localhost:8000/api/leaderboard/';

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => {
        const results = Array.isArray(payload) ? payload : payload?.data ?? [];
        setRows(results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Unable to load leaderboard.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-dark text-white">
        <h2 className="h4 mb-0">Leaderboard</h2>
      </div>
      <div className="card-body">
        <div className="list-group">
          {rows.map((entry) => (
            <div key={entry.rank ?? entry.user} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>#{entry.rank}</strong> {entry.user}
              </div>
              <div className="text-end">
                <div>{entry.points} pts</div>
                <small className="text-muted">{entry.streak} day streak</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
