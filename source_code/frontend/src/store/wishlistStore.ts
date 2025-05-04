import { create } from 'zustand';

interface WishlistItem {
  symbol: string;
  name: string;
}

interface WishlistStore {
  wishlist: WishlistItem[];
  addToWishlist: (company: WishlistItem) => void;
  removeFromWishlist: (symbol: string) => void;
  setWishlist: (wishlist: WishlistItem[]) => void;
}

const useWishlistStore = create<WishlistStore>((set) => ({
  wishlist: [], // Initial wishlist state

  // Add a company to the wishlist
  addToWishlist: (company) =>
    set((state) => {
      if (!state.wishlist.some((item) => item.symbol === company.symbol)) {
        return { wishlist: [...state.wishlist, company] };
      }
      return state; // Return the current state if the company is already in the wishlist
    }),

  // Remove a company from the wishlist
  removeFromWishlist: (symbol) =>
    set((state) => ({
      wishlist: state.wishlist.filter((item) => item.symbol !== symbol),
    })),

  // Set the entire wishlist (e.g., when fetching from the backend)
  setWishlist: (wishlist) => set({ wishlist }),
}));

export default useWishlistStore;

// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// interface WishlistItem {
//   symbol: string;
//   name: string;
// }

// interface WishlistStore {
//   wishlist: WishlistItem[];
//   addToWishlist: (company: WishlistItem) => void;
//   removeFromWishlist: (symbol: string) => void;
//   setWishlist: (wishlist: WishlistItem[]) => void;
// }

// // Create a persisted store that saves to localStorage
// const useWishlistStore = create<WishlistStore>()(
//   persist(
//     (set) => ({
//       wishlist: [], // Initial wishlist state

//       // Add a company to the wishlist
//       addToWishlist: (company) =>
//         set((state) => {
//           // Check if company is already in wishlist
//           if (!state.wishlist.some((item) => item.symbol === company.symbol)) {
//             return { wishlist: [...state.wishlist, company] };
//           }
//           return state; // Return current state if company already exists
//         }),

//       // Remove a company from the wishlist
//       removeFromWishlist: (symbol) =>
//         set((state) => ({
//           wishlist: state.wishlist.filter((item) => item.symbol !== symbol),
//         })),

//       // Set the entire wishlist (e.g., when fetching from the backend)
//       setWishlist: (wishlist) => set({ wishlist }),
//     }),
//     {
//       name: 'stock-wishlist', // Name for localStorage
//       partialize: (state) => ({ wishlist: state.wishlist }), // Only persist wishlist array
//     }
//   )
// );

// export default useWishlistStore;