const API_URL = 'http://localhost:3000/marcas';

export const getMarcas = async () => {
    const res = await fetch(API_URL);
    return res.json();
};

export const getMarcasByID = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    return res.json();
};

export const createMarcas = async (userData) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    return res.json();
};

export const updateMarcas = async (id, userData) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    return res.json();
};

export const deleteMarcas = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    return res.ok;
};