import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: ["/", "/search", "/category(.*)"],

  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: ["/api/webhook"],
})

export const config = {
  // Matcher ignoring _next/static, _next/image, favicon.ico, etc
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
