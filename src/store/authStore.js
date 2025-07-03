import { create } from "zustand";
//persistir datos en el localstorage
import { persist } from "zustand/middleware"

export const useAuthStore = create(
    persist((set) => ({
        user: null,
        loading: true,
        login: (userData) => set({ user: userData }),
        logout: () => set({ user: null }),
        setLoading: (estado) => set({ loading: estado })
    }),
        {
            name: 'user_data',
            //forzamos guardar en el sessionStorage
            storage: {
                getItem: (name) => {
                    const stored = sessionStorage.getItem(name)
                    return stored ? JSON.parse(stored) : null
                },
                setItem: (name, value) => sessionStorage.setItem(name, JSON.stringify(value)),
                removeItem: (name) => sessionStorage.removeItem(name)
            },
            partialize: (state) => ({ user: state.user }) // solo persistimos users y  no el loading
        }
    ))