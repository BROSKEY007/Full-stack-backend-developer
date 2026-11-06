import React from 'react';

const Userspage = async () => {
    const res = await fetch('http://localhost:8000/users');
    const users = await res.json(); 
    console.log(users);
    return (
        <div>
           <h2>Users Page: {users.length}</h2> 
        </div>
    );
};

export default Userspage;<h2>Users Page:</h2>