import { Suspense } from 'react';

async function UsersList() {
    const res = await fetch('http://localhost:8000/users');
    if (!res.ok) throw new Error('Failed to load users');
    const users = await res.json();

    return (
        <div>
            <h2>Users: {users.length}</h2>
            <ul>
                {users.map((u) => (
                    <li key={u.id}>{u.name} ({u.email})</li>
                ))}
            </ul>
        </div>
    );
}

export default function UsersPage() {
    return (
        <Suspense fallback={<p>Loading users...</p>}>
            <UsersList />
        </Suspense>
    );
}