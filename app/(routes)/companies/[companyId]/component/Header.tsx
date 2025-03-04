'use client'
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export function Header() {
    const router = useRouter()
  return (
    <div className="flex items-center gap-2">
        <ArrowLeft className="cursor-pointer size-5" onClick={() => router.push("/companies")}/>
        <h1 className="font-semibold"> Edit Company</h1>
    </div>
  )
}
