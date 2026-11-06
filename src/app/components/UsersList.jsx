import React from 'react';

const UsersList = ({ usersPromise }) => {
    const users = use(usersPromise);
    return (
        <div>
            <h2>Users List: {users.length}</h2> 
        </div>
    );
};

export default UsersList;