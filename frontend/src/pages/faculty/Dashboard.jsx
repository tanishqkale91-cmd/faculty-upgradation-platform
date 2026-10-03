/**
 * Dashboard.jsx
 *
 * Faculty home screen. Fetches profile, enrollments, and credits
 * to show a meaningful overview of the faculty's learning progress.
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AppLayout from '../../components/common/AppLayout';
import { getProfile } from '../../api/facultyApi';
import { getMyEnrollments } from '../../api/enrollmentApi';
import { getMyCredits } from '../../api/creditApi';

// ── Small stat card ──────────────────────────────────────────────────────────
function StatCard({ label, value, sub, accent }) {
  return (
    <div
      className="glass-card p-5 flex flex-col gap-1"
      style={{ borderLeft: `3px solid ${accent}` }}
    >
      <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
        {label}
      </p>
      <p className="text-3xl font-bold" style={{ color: accent }}>
        {value}
      </p>
      {sub && (
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          {sub}
        </p>
      )}
    </div>
  );
}

// ── Enrollment row ───────────────────────────────────────────────────────────
function EnrollmentRow({ enrollment }) {
  const course = enrollment.course;
  const statusColor = {
    enrolled: 'var(--color-accent)',
    'in-progress': 'var(--color-warning)',
    completed: 'var(--color-success)',
    dropped: 'var(--color-error)',
  }[enrollment.status] || 'var(--color-text-muted)';

  return (
    <Link
      to={`/my-courses`}
      className="flex items-center gap-4 p-4 rounded-lg transition-colors duration-150 hover:bg-white/5"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: 'rgba(99,102,241,0.15)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--color-primary-light)' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text)' }}>
          {course?.title || 'Untitled Course'}
        </p>
        <div className="flex items-center gap-3 mt-1">
          {/* Progress bar */}
          <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--color-surface-2)' }}>
            <div
              className="h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${enrollment.progress}%`, background: statusColor }}
            />
          </div>
          <span className="text-xs shrink-0" style={{ color: 'var(--color-text-muted)' }}>
            {enrollment.progress}%
          </span>
        </div>
      </div>

      {/* Status badge */}
      <span
        className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 capitalize"
        style={{ background: `${statusColor}20`, color: statusColor }}
      >
        {enrollment.status}
      </span>
    </Link>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
function Dashboard() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [totalCredits, setTotalCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      try {
        const [profileRes, enrollRes, creditsRes] = await Promise.all([
          getProfile(),
          getMyEnrollments(),
          getMyCredits(),
        ]);
        if (!cancelled) {
          setProfile(profileRes.data.profile);
          setEnrollments(enrollRes.data.enrollments || []);
          setTotalCredits(creditsRes.data.totalCredits || 0);
        }
      } catch {
        if (!cancelled) setError('Failed to load dashboard data. Please refresh.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchAll();
    return () => { cancelled = true; };
  }, []);

  // Derived stats
  const completed = enrollments.filter((e) => e.status === 'completed').length;
  const inProgress = enrollments.filter((e) => e.status === 'in-progress').length;
  const recentEnrollments = [...enrollments]
    .sort((a, b) => new Date(b.enrolledAt) - new Date(a.enrolledAt))
    .slice(0, 5);

  const displayName = profile?.name || user?.name || 'Faculty';
  const initials = displayName.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto animate-fadeIn">

        {/* ── Header ── */}
        <div className="flex items-center gap-4 mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-white shrink-0"
            style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' }}
          >
            {initials}
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
              Welcome back, {displayName.split(' ')[0]}!
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {profile?.designation || 'Faculty'}{profile?.department ? ` · ${profile.department}` : ''}
            </p>
          </div>
        </div>

        {/* ── Error ── */}
        {error && (
          <div
            className="mb-6 p-4 rounded-lg text-sm"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}
          >
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <svg className="w-8 h-8 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{ color: 'var(--color-primary-light)' }}>
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          </div>
        ) : (
          <>
            {/* ── Stats ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard
                label="Total Credits"
                value={totalCredits}
                sub="Credits earned"
                accent="var(--color-accent)"
              />
              <StatCard
                label="Enrolled"
                value={enrollments.length}
                sub="All courses"
                accent="var(--color-primary-light)"
              />
              <StatCard
                label="In Progress"
                value={inProgress}
                sub="Active courses"
                accent="var(--color-warning)"
              />
              <StatCard
                label="Completed"
                value={completed}
                sub="Finished courses"
                accent="var(--color-success)"
              />
            </div>

            {/* ── Two-column layout ── */}
            <div className="grid md:grid-cols-3 gap-6">

              {/* Recent Enrollments (wide column) */}
              <div className="md:col-span-2">
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                      Recent Courses
                    </h2>
                    <Link to="/my-courses" className="text-xs font-medium" style={{ color: 'var(--color-primary-light)', textDecoration: 'none' }}>
                      View all →
                    </Link>
                  </div>

                  {recentEnrollments.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="text-4xl mb-3">📚</p>
                      <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>No courses yet</p>
                      <p className="text-xs mt-1 mb-4" style={{ color: 'var(--color-text-muted)' }}>
                        Browse the course catalog to get started
                      </p>
                      <Link to="/courses" className="btn-primary text-xs">
                        Browse Courses
                      </Link>
                    </div>
                  ) : (
                    <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
                      {recentEnrollments.map((enr) => (
                        <EnrollmentRow key={enr._id} enrollment={enr} />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Links (narrow column) */}
              <div className="flex flex-col gap-4">
                <div className="glass-card p-5">
                  <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--color-text-muted)' }}>
                    Quick Links
                  </h2>
                  <nav className="flex flex-col gap-2">
                    {[
                      { to: '/courses', label: 'Browse Courses', emoji: '🔍' },
                      { to: '/my-courses', label: 'My Courses', emoji: '📋' },
                      { to: '/credits', label: 'My Credits', emoji: '🏅' },
                      { to: '/achievements', label: 'Achievements', emoji: '🏆' },
                      { to: '/profile', label: 'Edit Profile', emoji: '👤' },
                    ].map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-150 hover:bg-white/5"
                        style={{ color: 'var(--color-text)', textDecoration: 'none' }}
                      >
                        <span>{link.emoji}</span>
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* Profile summary card */}
                {profile && (
                  <div className="glass-card p-5">
                    <h2 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-muted)' }}>
                      Profile
                    </h2>
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Email</p>
                        <p className="truncate font-medium" style={{ color: 'var(--color-text)' }}>{profile.email}</p>
                      </div>
                      {profile.department && (
                        <div>
                          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Department</p>
                          <p className="font-medium" style={{ color: 'var(--color-text)' }}>{profile.department}</p>
                        </div>
                      )}
                      {profile.designation && (
                        <div>
                          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Designation</p>
                          <p className="font-medium" style={{ color: 'var(--color-text)' }}>{profile.designation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}

export default Dashboard;
