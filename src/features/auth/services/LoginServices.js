const API_URL = 'http://localhost:3000/usuarios';

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
