const users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Doe", email: "jane@example.com" }
];

module.exports = {
    getAllUsers: () => users,
    getUserById: (id) => users.find(user => user.id === id),
    updateUser: (id, newUser) => {
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            users[index] = { ...users[index], ...newUser };
            return users[index];
        }
        return null;
    }
};