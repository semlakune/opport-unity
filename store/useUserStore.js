import { create } from 'zustand'

const useUserStore = create(set => ({
  userDetails: null,
  setUserDetails: (details) => set({ userDetails: details })
}))

export default useUserStore