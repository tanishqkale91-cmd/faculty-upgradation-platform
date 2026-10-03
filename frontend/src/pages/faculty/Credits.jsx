/**
 * Credits.jsx — total credits and credit history (GET /api/credits/my-credits).
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../../components/common/AppLayout';
import { getMyCredits } from '../../api/creditApi';

function Credits() {
  const [data, setData] = useState({ totalCredits: 0, credits: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    getMyCredits()
      .then((res) => { if (!cancelled) setData({ totalCredits: res.data.totalCredits || 0, credits: res.data.credits || [] }); })
      .catch(() => { if (!cancelled) setError('Failed to load credits. Please refresh.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto animate-fadeIn">
        <div className="mb-6">
          <h1 className="text-2xl font-bold gradient-text">My Credits</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
            Credits earned from completed courses
          </p>
        </div>

        {error && (
          <div className="mb-5 p-4 rounded-lg text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}>
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Loading…</p>
        ) : (
          <>
            <div className="glass-card p-6 mb-6" style={{ borderLeft: '3px solid var(--color-accent)' }}>
              <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Total Credits</p>
              <p className="text-4xl font-bold" style={{ color: 'var(--color-accent)' }}>{data.totalCredits}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                {data.credits.length} credit record{data.credits.length !== 1 ? 's' : ''}
              </p>
            </div>

            {data.credits.length === 0 ? (
              <div className="glass-card p-10 text-center">
                <p className="text-4xl mb-3">🏅</p>
                <p className="font-semibold" style={{ color: 'var(--color-text)' }}>No credits earned yet</p>
                <p className="text-sm mt-1 mb-4" style={{ color: 'var(--color-text-muted)' }}>Complete a course to earn credits.</p>
                <Link to="/my-courses" className="btn-primary text-sm">Go to My Courses</Link>
              </div>
            ) : (
              <div className="glass-card p-2">
                {data.credits.map((c) => (
                  <div key={c._id} className="flex items-center gap-4 p-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                        {c.course?.title || 'Manual credit award'}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                        {c.course?.category ? `${c.course.category} · ` : ''}
                        {new Date(c.awardedAt).toLocaleDateString()}
                        {c.note ? ` · ${c.note}` : ''}
                      </p>
                    </div>
                    <span className="text-sm font-bold" style={{ color: 'var(--color-success)' }}>+{c.creditsEarned}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
}

export default Credits;
