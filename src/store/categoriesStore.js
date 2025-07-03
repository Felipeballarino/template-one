import { create } from "zustand"
import { getCategories } from "../features/categories/services/categoriesServices"

export const useCategoriesStore = create((set, get) => ({
    categories: [],
    loading: true,
    loaded: false,
    loadCategories: async () => {
        if (get().loaded) return;
        try {
            const data = await getCategories();
            set({ categories: data, loaded: true });
        } catch (error) {
            console.error("Error al cargar categorias:", error);
        } finally {
            set({ loading: false });
        }
    },
    setLoading: (estado) => set({ loading: estado })
}))