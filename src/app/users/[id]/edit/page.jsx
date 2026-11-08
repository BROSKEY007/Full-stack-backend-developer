'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      const res = await fetch(`http://localhost:8000/users/${id}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to load user');
        return;
      }
      setUser(data);
    }
    load();
  }, [id]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const formData = new FormData(event.target);
    const body = Object.fromEntries(formData.entries());

    const res = await fetch(`http://localhost:8000/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.message || 'Failed to update user');
      return;
    }
    router.push('/users');
  };

  if (error && !user) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <form onSubmit={onSubmit}>
      <h2>Edit user #{user.id}</h2>
      <div>
        <label>Name </label>
        <input name="name" defaultValue={user.name} required />
      </div>
      <div>
        <label>Email </label>
        <input name="email" type="email" defaultValue={user.email} required />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Save</button>
    </form>
  );
}