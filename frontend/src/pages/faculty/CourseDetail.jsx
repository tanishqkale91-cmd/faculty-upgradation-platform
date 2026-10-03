/**
 * CourseDetail.jsx
 *
 * Fetches a single course by ID and allows the faculty to:
 *   - View course info and modules
 *   - Enroll in the course (POST /api/enrollments/:courseId)
 *
 * If the faculty is already enrolled, the enroll button is replaced
 * with a "Go to My Courses" link.
 */

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AppLayout from '../../components/common/AppLayout';
import { getCourseById } from '../../api/courseApi';
import { enrollInCourse, getMyEnrollments } from '../../api/enrollmentApi';

const DIFFICULTY_COLOR = {
  beginner: 'var(--color-success)',
  intermediate: 'var(--color-warning)',
  advanced: 'var(--color-error)',
};

function ModuleItem({ mod, index }) {
  return (
    <div
      className="flex items-start gap-4 p-4 rounded-lg"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)' }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
        style={{ background: 'rgba(99,102,241,0.2)', color: 'var(--color-primary-light)' }}
      >
        {index + 1}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{mod.title}</p>
        {mod.description && (
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{mod.description}</p>
        )}
        {mod.duration > 0 && (
          <p className="text-xs mt-1 flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {mod.duration} min
          </p>
        )}
      </div>
      {mod.resourceUrl && (
        <a
          href={mod.resourceUrl}
          target="_blank"
          rel="noreferrer"
          className="text-xs shrink-0 px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(6,182,212,0.15)', color: 'var(--color-accent)', textDecoration: 'none' }}
        >
          Resource ↗
        </a>
      )}
    </div>
  );
}

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [enrollmentId, setEnrollmentId] = useState(null); // existing enrollment _id
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        // Fetch course and existing enrollments in parallel
        const [courseRes, enrollRes] = await Promise.all([
          getCourseById(id),
          getMyEnrollments(),
        ]);

        if (!cancelled) {
          setCourse(courseRes.data.course);

          const existingEnrollments = enrollRes.data.enrollments || [];
          const found = existingEnrollments.find(
            (e) => (e.course?._id || e.course) === id || (e.course?._id || e.course)?.toString() === id
          );
          if (found) {
            setAlreadyEnrolled(true);
            setEnrollmentId(found._id);
          }
        }
      } catch {
        if (!cancelled) setError('Failed to load course. Please go back and try again.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [id]);

  const handleEnroll = async () => {
    setError('');
    setSuccessMsg('');
    setEnrolling(true);

    try {
      const res = await enrollInCourse(id);
      setAlreadyEnrolled(true);
      setEnrollmentId(res.data.enrollment?._id);
      setSuccessMsg(res.data.message || 'Successfully enrolled!');
    } catch (err) {
      const status = err.response?.status;
      const msg = err.response?.data?.message;

      if (status === 409) {
        // Already enrolled (race condition)
        setAlreadyEnrolled(true);
        setSuccessMsg('You are already enrolled in this course.');
      } else {
        setError(msg || 'Enrollment failed. Please try again.');
      }
    } finally {
      setEnrolling(false);
    }
  };

  const diffColor = DIFFICULTY_COLOR[course?.difficulty] || 'var(--color-text-muted)';

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto animate-fadeIn">

        {/* Back link */}
        <Link
          to="/courses"
          className="inline-flex items-center gap-1.5 text-sm mb-6"
          style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Courses
        </Link>

        {/* Error */}
        {error && (
          <div
            className="mb-5 p-4 rounded-lg text-sm"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}
          >
            {error}
          </div>
        )}

        {/* Success */}
        {successMsg && (
          <div
            className="mb-5 p-4 rounded-lg text-sm"
            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#86efac' }}
          >
            ✅ {successMsg}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <svg className="w-8 h-8 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{ color: 'var(--color-primary-light)' }}>
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          </div>
        ) : !course ? (
          <div className="glass-card p-12 text-center">
            <p className="text-4xl mb-3">❌</p>
            <p className="font-semibold" style={{ color: 'var(--color-text)' }}>Course not found</p>
          </div>
        ) : (
          <div className="space-y-6">

            {/* ── Course header card ── */}
            <div className="glass-card p-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--color-primary-light)' }}
                >
                  {course.category || 'General'}
                </span>
                <span
                  className="text-xs font-semibold capitalize px-2.5 py-1 rounded-full"
                  style={{ background: `${diffColor}20`, color: diffColor }}
                >
                  {course.difficulty}
                </span>
                {course.provider && (
                  <span
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--color-text-muted)' }}
                  >
                    {course.provider}
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                {course.title}
              </h1>

              {course.instructor && (
                <p className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>
                  Instructor: <span style={{ color: 'var(--color-text)' }}>{course.instructor}</span>
                </p>
              )}

              {course.description && (
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {course.description}
                </p>
              )}

              {/* Meta row */}
              <div className="flex flex-wrap gap-6 mt-5 pt-5" style={{ borderTop: '1px solid var(--color-border)' }}>
                {course.modules?.length > 0 && (
                  <div>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Modules</p>
                    <p className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>{course.modules.length}</p>
                  </div>
                )}
                {course.duration > 0 && (
                  <div>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Duration</p>
                    <p className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>{course.duration}h</p>
                  </div>
                )}
                {course.credits > 0 && (
                  <div>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Credits</p>
                    <p className="text-lg font-bold" style={{ color: 'var(--color-accent)' }}>{course.credits}</p>
                  </div>
                )}
                {course.tags?.length > 0 && (
                  <div>
                    <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {course.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: 'var(--color-surface-2)', color: 'var(--color-text-muted)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* External link */}
              {course.externalUrl && (
                <div className="mt-4">
                  <a
                    href={course.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm"
                    style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
                  >
                    View External Resource ↗
                  </a>
                </div>
              )}

              {/* ── Enroll / Already Enrolled ── */}
              <div className="mt-6">
                {alreadyEnrolled ? (
                  <div className="flex items-center gap-4">
                    <div
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
                      style={{ background: 'rgba(34,197,94,0.1)', color: 'var(--color-success)', border: '1px solid rgba(34,197,94,0.3)' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Enrolled
                    </div>
                    <Link to="/my-courses" className="btn-primary text-sm">
                      Go to My Courses →
                    </Link>
                  </div>
                ) : (
                  <button
                    id="enroll-btn"
                    className="btn-primary"
                    onClick={handleEnroll}
                    disabled={enrolling}
                    style={{ opacity: enrolling ? 0.7 : 1 }}
                  >
                    {enrolling ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Enrolling…
                      </>
                    ) : (
                      'Enroll in this Course'
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* ── Modules ── */}
            {course.modules?.length > 0 && (
              <div className="glass-card p-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--color-text-muted)' }}>
                  Course Modules ({course.modules.length})
                </h2>
                <div className="space-y-3">
                  {[...course.modules]
                    .sort((a, b) => a.order - b.order)
                    .map((mod, idx) => (
                      <ModuleItem key={mod._id} mod={mod} index={idx} />
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default CourseDetail;
