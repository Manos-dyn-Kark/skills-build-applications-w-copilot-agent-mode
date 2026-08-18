import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeApiResponse } from '../utils/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const baseUrl = getApiBaseUrl();
    fetch(`${baseUrl}/api/workouts/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => {
        const results = normalizeApiResponse(payload);
        setWorkouts(results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Unable to load workouts.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="alert alert-info">Loading workouts...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-info text-white">
        <h2 className="h4 mb-0">Workouts</h2>
      </div>
      <div className="card-body">
        <div className="row g-3">
          {workouts.map((workout) => (
            <div key={workout.id ?? workout._id ?? workout.title} className="col-md-6">
              <div className="border rounded p-3 h-100">
                <h3 className="h5">{workout.title}</h3>
                <p className="mb-1"><strong>Goal:</strong> {workout.goal}</p>
                <p className="mb-1"><strong>Difficulty:</strong> {workout.difficulty}</p>
                <p className="mb-0"><strong>Duration:</strong> {workout.duration} min</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
