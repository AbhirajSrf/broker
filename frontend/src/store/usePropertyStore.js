import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const usePropertyStore = create((set) => ({
  properties: [],
  favouriteProperties: [],
  isLoading: false,

  fetchProperties: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/properties");
      const userId = useAuthStore.getState().authUser?._id;

      const properties = res.data.map((p) => ({
        ...p,
        _liked: p.likes?.some((id) => id?.toString() === userId?.toString()),
        _favourited: p.favourites?.some(
          (id) => id?.toString() === userId?.toString()
        ),
        propertyType: p.propertyType,
      }));

      set({ properties });
    } catch (error) {
      toast.error("Failed to fetch properties");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFavourites: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/properties/favourites");
      const userId = useAuthStore.getState().authUser?._id;

      const favouriteProperties = res.data.map((p) => ({
        ...p,
        _liked: p.likes?.some((id) => id?.toString() === userId?.toString()),
        _favourited: true,
        propertyType: p.propertyType,
      }));

      set({ favouriteProperties });
    } catch (error) {
      toast.error("Failed to fetch favourites");
    } finally {
      set({ isLoading: false });
    }
  },

  toggleLike: async (propertyId) => {
    try {
      const res = await axiosInstance.post(`/properties/${propertyId}/like`);
      const { likes, liked } = res.data;
      set((state) => ({
        properties: state.properties.map((p) =>
          p._id === propertyId
            ? { ...p, likes: Array(likes).fill(null), _liked: liked }
            : p
        ),
        favouriteProperties: state.favouriteProperties.map((p) =>
          p._id === propertyId
            ? { ...p, likes: Array(likes).fill(null), _liked: liked }
            : p
        ),
      }));
    } catch (error) {
      toast.error("Failed to like property");
    }
  },

  toggleFavourite: async (propertyId) => {
    set((state) => ({
      properties: state.properties.map((p) =>
        p._id === propertyId ? { ...p, _favourited: !p._favourited } : p
      ),
    }));

    try {
      const res = await axiosInstance.post(
        `/properties/${propertyId}/favourite`
      );
      const { favourited } = res.data;

      set((state) => ({
        properties: state.properties.map((p) =>
          p._id === propertyId ? { ...p, _favourited: favourited } : p
        ),
        favouriteProperties: favourited
          ? state.favouriteProperties.map((p) =>
              p._id === propertyId ? { ...p, _favourited: true } : p
            )
          : state.favouriteProperties.filter((p) => p._id !== propertyId),
      }));
    } catch (error) {
      set((state) => ({
        properties: state.properties.map((p) =>
          p._id === propertyId ? { ...p, _favourited: !p._favourited } : p
        ),
      }));
      toast.error("Failed to update favourite");
    }
  },
}));
