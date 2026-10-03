/**
 * Register.jsx
 *
 * Faculty self-registration page.
 *
 * Flow:
 *   User fills name + email + password + confirm password
 *     → client-side validation
 *     → POST /api/auth/register
 *     → on success: call AuthContext.login(user, token)
 *     → navigate to /dashboard
 *
 * Edge cases handled:
 *   - Already authenticated users are redirected away.
 *   - Password confirmation mismatch caught client-side.
 *   - Duplicate email 409 error shown inline.
 *   - Button disabled and shows spinner while in-flight.
 *   - Password show/hide toggle.
 */

import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { registerApi } from '../../api/authApi';

function Register() {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Redirect already-authenticated users
  if (!loading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => {
    setError('');
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your full name.';
    if (!form.email.trim()) return 'Please enter your email address.';
    if (form.password.length < 6) return 'Password must be at least 6 characters.';
    if (form.password !== form.confirmPassword) return 'Passwords do not match.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    try {
      const res = await registerApi({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      const { token, user } = res.data;

      login(user, token);
      // Registration always creates a faculty account → /dashboard
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong. Please try again.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // Password strength indicator (simple 3-level)
  const getStrength = () => {
    const p = form.password;
    if (p.length === 0) return null;
    if (p.length < 6) return { level: 1, label: 'Weak', color: 'var(--color-error)' };
    if (p.length < 10 || !/[0-9]/.test(p)) return { level: 2, label: 'Fair', color: 'var(--color-warning)' };
    return { level: 3, label: 'Strong', color: 'var(--color-success)' };
  };
  const strength = getStrength();

  return (
    <div
      className="flex min-h-screen items-center justify-center p-4 animate-fadeIn"
      style={{ background: 'radial-gradient(ellipse at 40% 0%, rgba(6,182,212,0.12) 0%, var(--color-bg) 70%)' }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
            style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-primary))' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold gradient-text">Create Account</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
            Join the Faculty Upgradation Platform
          </p>
        </div>

        {/* Card */}
        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} noValidate>

            {/* Error banner */}
            {error && (
              <div
                className="flex items-center gap-2 rounded-lg p-3 mb-5 text-sm"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            {/* Full Name */}
            <div className="mb-4">
              <label
                htmlFor="register-name"
                className="block text-sm font-medium mb-1.5"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Full Name
              </label>
              <input
                id="register-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Dr. Firstname Lastname"
                value={form.name}
                onChange={handleChange}
                className="input-field"
                disabled={submitting}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="register-email"
                className="block text-sm font-medium mb-1.5"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Email address
              </label>
              <input
                id="register-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@university.edu"
                value={form.email}
                onChange={handleChange}
                className="input-field"
                disabled={submitting}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                htmlFor="register-password"
                className="block text-sm font-medium mb-1.5"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="register-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Minimum 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  className="input-field"
                  style={{ paddingRight: '2.75rem' }}
                  disabled={submitting}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7a9.77 9.77 0 012.05-3.95M6.3 6.3A9.77 9.77 0 0112 5c5 0 9 4 9 7a9.8 9.8 0 01-2.34 3.66M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Password strength bar */}
              {strength && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{
                          background: n <= strength.level ? strength.color : 'var(--color-surface-2)',
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: strength.color }}>
                    {strength.label}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label
                htmlFor="register-confirm"
                className="block text-sm font-medium mb-1.5"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Confirm Password
              </label>
              <input
                id="register-confirm"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="input-field"
                style={{
                  borderColor:
                    form.confirmPassword && form.confirmPassword !== form.password
                      ? 'var(--color-error)'
                      : undefined,
                }}
                disabled={submitting}
                required
              />
              {form.confirmPassword && form.confirmPassword !== form.password && (
                <p className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>
                  Passwords do not match
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              id="register-submit"
              type="submit"
              className="btn-primary w-full justify-center"
              disabled={submitting}
              style={{ opacity: submitting ? 0.7 : 1 }}
            >
              {submitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Creating account…
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Footer link */}
          <p className="text-center text-sm mt-6" style={{ color: 'var(--color-text-muted)' }}>
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold"
              style={{ color: 'var(--color-primary-light)' }}
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Role note */}
        <p className="text-center text-xs mt-4" style={{ color: 'var(--color-text-muted)' }}>
          Registering creates a <span style={{ color: 'var(--color-accent)' }}>Faculty</span> account.
          Admin accounts are issued by the institution.
        </p>
      </div>
    </div>
  );
}

export default Register;
