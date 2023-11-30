"use client"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {Toaster} from "sonner";

const queryClient = new QueryClient()
export default function RootTemplate({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors={true} />
      {children}
    </QueryClientProvider>
  )
}