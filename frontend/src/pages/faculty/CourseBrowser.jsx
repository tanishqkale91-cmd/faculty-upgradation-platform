/**
 * CourseBrowser.jsx
 *
 * Lists all published courses from GET /api/courses.
 * Supports simple text search (client-side) and category filter.
 */

import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../../components/common/AppLayout';
import { getCourses } from '../../api/courseApi';

const DIFFICULTY_COLOR = {
  beginner: 'var(--color-success)',
  intermediate: 'var(--color-warning)',
  advanced: 'var(--color-error)',
};

function CourseCard({ course }) {
  const diffColor = DIFFICULTY_COLOR[course.difficulty] || 'var(--color-text-muted)';

  return (
    <Link
      to={`/courses/${course._id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div
        className="glass-card p-5 flex flex-col gap-3 h-full transition-transform duration-200 hover:-translate-y-1 cursor-pointer"
        style={{ borderTop: `3px solid var(--color-primary)` }}
      >
        {/* Category + difficulty row */}
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--color-primary-light)' }}
          >
            {course.category || 'General'}
          </span>
          <span
            className="text-xs font-semibold capitalize px-2 py-0.5 rounded-full"
            style={{ background: `${diffColor}20`, color: diffColor }}
          >
            {course.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold leading-snug" style={{ color: 'var(--color-text)' }}>
          {course.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm flex-1 line-clamp-3"
          style={{ color: 'var(--color-text-muted)', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}
        >
          {course.description || 'No description available.'}
        </p>

        {/* Footer meta */}
        <div className="flex items-center gap-4 pt-2 text-xs" style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
          {course.instructor && (
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {course.instructor}
            </span>
          )}
          {course.modules?.length > 0 && (
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {course.modules.length} module{course.modules.length !== 1 ? 's' : ''}
            </span>
          )}
          {course.credits > 0 && (
            <span className="flex items-center gap-1 ml-auto font-semibold" style={{ color: 'var(--color-accent)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {course.credits} credits
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

function CourseBrowser() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    let cancelled = false;
    async function fetchCourses() {
      try {
        const res = await getCourses();
        if (!cancelled) setCourses(res.data.courses || []);
      } catch {
        if (!cancelled) setError('Failed to load courses. Please refresh.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchCourses();
    return () => { cancelled = true; };
  }, []);

  // Unique categories for filter
  const categories = useMemo(() => {
    const cats = [...new Set(courses.map((c) => c.category || 'General'))];
    return ['All', ...cats.sort()];
  }, [courses]);

  // Client-side filtering
  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesSearch =
        !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        (c.description || '').toLowerCase().includes(search.toLowerCase()) ||
        (c.instructor || '').toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === 'All' || (c.category || 'General') === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [courses, search, categoryFilter]);

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto animate-fadeIn">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold gradient-text">Browse Courses</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
            Explore available professional development courses
          </p>
        </div>

        {/* Search + Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              style={{ color: 'var(--color-text-muted)' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              id="course-search"
              type="text"
              placeholder="Search courses…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '2.25rem' }}
            />
          </div>

          <select
            id="course-category-filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="input-field sm:w-48"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Error */}
        {error && (
          <div
            className="mb-6 p-4 rounded-lg text-sm"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}
          >
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <svg className="w-8 h-8 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{ color: 'var(--color-primary-light)' }}>
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          </div>
        ) : filtered.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-5xl mb-4">🔍</p>
            <p className="font-semibold" style={{ color: 'var(--color-text)' }}>
              {courses.length === 0 ? 'No courses available yet' : 'No courses match your search'}
            </p>
            <p className="text-sm mt-2" style={{ color: 'var(--color-text-muted)' }}>
              {courses.length === 0
                ? 'Check back later or contact an admin to add courses.'
                : 'Try a different search term or category.'}
            </p>
            {search || categoryFilter !== 'All' ? (
              <button
                className="btn-secondary mt-4 text-xs"
                onClick={() => { setSearch(''); setCategoryFilter('All'); }}
              >
                Clear filters
              </button>
            ) : null}
          </div>
        ) : (
          <>
            <p className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>
              Showing {filtered.length} of {courses.length} course{courses.length !== 1 ? 's' : ''}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}

export default CourseBrowser;
