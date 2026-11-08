'use client';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Delete this user?')) return;

    const res = await fetch(`http://localhost:8000/users/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.message || 'Failed to delete user');
      return;
    }
    router.refresh(); // list abar load hobe
  };

  return (
  <button
    onClick={handleDelete}
    className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-200"
  >
    Delete
  </button>
);
}