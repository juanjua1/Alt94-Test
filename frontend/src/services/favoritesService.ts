import api from './authService';

export const favoritesService = {
  async getFavorites(): Promise<string[]> {
    const response = await api.get('/users/favorites');
    return response.data;
  },

  async addFavorite(productId: string): Promise<void> {
    await api.post(`/users/favorites/${productId}`);
  },

  async removeFavorite(productId: string): Promise<void> {
    await api.delete(`/users/favorites/${productId}`);
  },

  isFavorite(productId: string, favorites: string[]): boolean {
    return favorites.includes(productId);
  },
};

export default favoritesService;
