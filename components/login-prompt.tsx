import { SignInButton, SignUpButton } from "@clerk/nextjs"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function LoginPrompt() {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create Your Library</CardTitle>
        <CardDescription>Sign in to like songs and create your personal music library</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <div className="relative w-24 h-24 flex items-center justify-center bg-muted rounded-full">
            <Heart className="h-12 w-12 text-primary" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <SignInButton mode="modal">
            <Button className="w-full">Sign In</Button>
          </SignInButton>

          <SignUpButton mode="modal">
            <Button variant="outline" className="w-full">
              Create Account
            </Button>
          </SignUpButton>
        </div>
      </CardContent>
    </Card>
  )
}
