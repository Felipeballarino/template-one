const API_URL = 'http://localhost:3000/settings';

export const getInfo = async () => {
    const res = await fetch(API_URL);
    return res.json();
};
export const updateInfo = async (id, userData) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    return res.json();
};
