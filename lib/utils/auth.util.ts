import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"

export const isAuthenticated = async (): Promise<{ authenticated: boolean }> => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) return { authenticated: false }

    return { authenticated: true }
}