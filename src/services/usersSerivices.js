const API_URL = 'http://localhost:3000/usuarios';

export const getUsers = async () => {
    const res = await fetch(API_URL);
    return res.json();
};

export const createUser = async (userData) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    return res.json();
};

export const updateUser = async (id, userData) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    return res.json();
};

export const deleteUser = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    return res.ok;
};


export const loginUser = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}?username=${username}&password=${password}`);
        const data = await response.json();

        if (!data || data.length === 0) return null;

        const user = data[0];

        if (!user.role) return null;

        sessionStorage.setItem('user_data', JSON.stringify(user));
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
};
