const API_URL = 'http://localhost:3000/categorias';

export const getCategories = async () => {
    const res = await fetch(API_URL);
    return res.json();
};

export const getCategoriesByID = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    return res.json();
};

export const createCategories = async (userData) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    return res.json();
};

export const updateCategories = async (id, userData) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    return res.json();
};

export const deleteCategories = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    return res.ok;
};