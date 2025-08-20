import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <Loader2 className="h-12 w-12 text-green-500 animate-spin mb-4" />
      <h2 className="text-xl font-medium text-white">Loading activities...</h2>
      <p className="text-white/60 mt-2">Please wait while we fetch the latest platform activities</p>
    </div>
  )
}
