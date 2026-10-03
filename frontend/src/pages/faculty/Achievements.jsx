/**
 * Achievements.jsx — earned badges (GET /api/achievements/my-achievements).
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../../components/common/AppLayout';
import { getMyAchievements } from '../../api/achievementApi';

function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    getMyAchievements()
      .then((res) => { if (!cancelled) setAchievements(res.data.achievements || []); })
      .catch(() => { if (!cancelled) setError('Failed to load achievements. Please refresh.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto animate-fadeIn">
        <div className="mb-6">
          <h1 className="text-2xl font-bold gradient-text">Achievements</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
            Milestones you have earned
          </p>
        </div>

        {error && (
          <div className="mb-5 p-4 rounded-lg text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}>
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Loading…</p>
        ) : !error && achievements.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-5xl mb-4">🏆</p>
            <p className="font-semibold" style={{ color: 'var(--color-text)' }}>No achievements yet</p>
            <p className="text-sm mt-1 mb-4" style={{ color: 'var(--color-text-muted)' }}>
              Complete courses and earn credits to unlock achievements.
            </p>
            <Link to="/courses" className="btn-primary text-sm">Browse Courses</Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {achievements.map((a) => (
              <div key={a._id} className="glass-card p-5 flex gap-4" style={{ borderTop: '3px solid var(--color-warning)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0" style={{ background: 'rgba(245,158,11,0.15)' }}>
                  🏆
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{a.title}</p>
                  {a.description && (
                    <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{a.description}</p>
                  )}
                  <p className="text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>
                    Earned {new Date(a.awardedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default Achievements;
