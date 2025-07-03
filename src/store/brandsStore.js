import { create } from "zustand";
import { getMarcas } from "../features/brands/services/marcasServices";

export const useBrandsStore = create((set, get) => ({
    brands: [],
    loading: true,
    loaded: false,
    setBrands: (newData) => set({ brands: newData }),
    loadBrands: async () => {
        if (get().loaded) return;
        try {
            const data = await getMarcas();
            set({ brands: data, loaded: true });
        } catch (error) {
            console.error("Error al cargar marcas:", error);
        } finally {
            set({ loading: false });
        }
    },
    setLoading: (estado) => set({ loading: estado })
}))