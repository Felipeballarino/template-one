const API_URL = 'http://localhost:3000/productos';

export const getProduct = async () => {
    const res = await fetch(API_URL);
    return res.json();
};

export const getProductByID = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    return res.json();
};

export const createProduct = async (userData) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    return res.json();
};

export const updateProduct = async (id, userData) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    return res.json();
};

export const deleteProduct = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    return res.ok;
};