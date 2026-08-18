import { useEffect, useState } from 'react';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
      : 'http://localhost:8000/api/teams/';

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => {
        const results = Array.isArray(payload) ? payload : payload?.data ?? [];
        setTeams(results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Unable to load teams.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="alert alert-info">Loading teams...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-success text-white">
        <h2 className="h4 mb-0">Teams</h2>
      </div>
      <div className="card-body">
        <div className="row g-3">
          {teams.map((team) => (
            <div key={team.id ?? team._id ?? team.name} className="col-md-6 col-lg-4">
              <div className="border rounded p-3 h-100">
                <h3 className="h5">{team.name}</h3>
                <p className="mb-1"><strong>Members:</strong> {team.members}</p>
                <p className="mb-0"><strong>Focus:</strong> {team.focus}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
