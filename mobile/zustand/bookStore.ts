import axios from 'axios';
import { create } from 'zustand'

type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  description?: string;
  cover?: string;
  publishedDate?: string;
  pageCount?: number;
  isbn?: string;
  source?: string;
  publishYear?: number;
};

interface bookState {
  randomBooks: Book[];
  loading: boolean;
  error: string | null;
  getRandomBooks: () => Promise<void>;
}

export const useBookStore = create<bookState>((set, get) => ({
  randomBooks: [],
  loading: false,
  error: null,

    getRandomBooks: async () => {
        try {
            set({ loading: true, error: null });

            const response = await axios.get('http://10.85.210.138:3000/books/random');

            const data = response.data.data;
            set({ randomBooks: data });

        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to fetch random books' });
        } finally {
            set({ loading: false });
        }
    },

}));