import { Suspense } from 'react';
import Link from 'next/link';
import DeleteButton from '../components/DeleteButton';

async function UsersTable() {
  const res = await fetch('http://localhost:8000/users');
  if (!res.ok) throw new Error('Failed to load users');
  const users = await res.json();

  return (
    <div className="overflow-hidden rounded-xl ring-1 ring-gray-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-4 py-3 font-semibold">ID</th>
            <th className="px-4 py-3 font-semibold">Name</th>
            <th className="px-4 py-3 font-semibold">Email</th>
            <th className="px-4 py-3 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {users.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                No users yet. Add your first user.
              </td>
            </tr>
          )}
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-indigo-50/50">
              <td className="px-4 py-3 text-gray-500">{u.id}</td>
              <td className="px-4 py-3 font-medium text-gray-900">{u.name}</td>
              <td className="px-4 py-3 text-gray-600">{u.email}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/users/${u.id}/edit`}
                    className="rounded-lg bg-indigo-100 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-200"
                  >
                    Edit
                  </Link>
                  <DeleteButton id={u.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function UsersPage() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-gradient-to-br from-indigo-50 via-white to-sky-100 p-4 pt-16">
      <div className="w-full max-w-3xl rounded-2xl bg-white p-8 shadow-xl ring-1 ring-black/5">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-indigo-900">Users</h1>
            <p className="text-sm text-gray-500">Manage all registered users.</p>
          </div>
          <Link
            href="/users/new"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            + Add user
          </Link>
        </div>

        <Suspense
          fallback={<p className="py-8 text-center text-gray-500">Loading users...</p>}
        >
          <UsersTable />
        </Suspense>
      </div>
    </div>
  );
}