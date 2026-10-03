/**
 * Profile.jsx — view/update profile (GET/PUT /api/faculty/profile).
 * Only name, department and designation are editable. Email and role are read-only.
 */

import { useState, useEffect } from 'react';
import AppLayout from '../../components/common/AppLayout';
import { useAuth } from '../../context/AuthContext';
import { getProfile, updateProfile } from '../../api/facultyApi';

function Profile() {
  const { token, login } = useAuth();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: '', department: '', designation: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    let cancelled = false;
    getProfile()
      .then((res) => {
        if (cancelled) return;
        const p = res.data.profile;
        setProfile(p);
        setForm({ name: p.name || '', department: p.department || '', designation: p.designation || '' });
      })
      .catch(() => { if (!cancelled) setError('Failed to load profile.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const handleChange = (e) => {
    setError('');
    setSuccess('');
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.name.trim()) {
      setError('Name is required.');
      return;
    }
    setSaving(true);
    try {
      const res = await updateProfile({
        name: form.name.trim(),
        department: form.department.trim(),
        designation: form.designation.trim(),
      });
      const p = res.data.profile;
      setProfile(p);
      // Keep AuthContext (sidebar name etc.) in sync with the saved profile
      login({ ...JSON.parse(localStorage.getItem('user') || '{}'), name: p.name, department: p.department, designation: p.designation }, token);
      setSuccess(res.data.message || 'Profile updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-xl mx-auto animate-fadeIn">
        <div className="mb-6">
          <h1 className="text-2xl font-bold gradient-text">My Profile</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
            Update your personal details
          </p>
        </div>

        {error && (
          <div className="mb-5 p-4 rounded-lg text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}>
            {error}
          </div>
        )}
        {success && (
          <div className="mb-5 p-4 rounded-lg text-sm" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#86efac' }}>
            {success}
          </div>
        )}

        {loading ? (
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Loading…</p>
        ) : profile && (
          <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
            <div>
              <label htmlFor="profile-email" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Email</label>
              <input id="profile-email" className="input-field" value={profile.email} disabled readOnly style={{ opacity: 0.6 }} />
            </div>
            <div>
              <label htmlFor="profile-role" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Role</label>
              <input id="profile-role" className="input-field capitalize" value={profile.role} disabled readOnly style={{ opacity: 0.6 }} />
            </div>
            <div>
              <label htmlFor="profile-name" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Full name</label>
              <input id="profile-name" name="name" className="input-field" value={form.name} onChange={handleChange} disabled={saving} />
            </div>
            <div>
              <label htmlFor="profile-department" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Department</label>
              <input id="profile-department" name="department" className="input-field" value={form.department} onChange={handleChange} disabled={saving} placeholder="e.g. Computer Science" />
            </div>
            <div>
              <label htmlFor="profile-designation" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Designation</label>
              <input id="profile-designation" name="designation" className="input-field" value={form.designation} onChange={handleChange} disabled={saving} placeholder="e.g. Assistant Professor" />
            </div>
            <button id="profile-save" type="submit" className="btn-primary" disabled={saving} style={{ opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </form>
        )}
      </div>
    </AppLayout>
  );
}

export default Profile;
