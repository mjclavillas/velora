"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Input,
  Checkbox,
  Separator,
} from "@velora/core";
import { Github, Mail } from "lucide-react";

export function AuthPreview() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <div className="mb-6 flex flex-col items-center gap-2 text-center">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg,#8060ff,#1ac8ed)" }}
        >
          V
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[var(--velora-text-primary)]">Welcome back</h2>
          <p className="text-xs text-[var(--velora-text-tertiary)]">Sign in to your Velora account</p>
        </div>
      </div>

      <Card variant="raised" padding="none">
        <CardContent className="pt-5">
          <div className="mb-3 flex flex-col gap-2">
            <Button variant="outline" className="w-full" size="sm" leadingIcon={<Github className="h-3.5 w-3.5" />}>
              Continue with GitHub
            </Button>
            <Button variant="outline" className="w-full" size="sm" leadingIcon={<Mail className="h-3.5 w-3.5" />}>
              Continue with Google
            </Button>
          </div>

          <Separator label="or" className="my-4" />

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--velora-text-primary)]">
                Email <span className="text-[var(--velora-state-danger)]">*</span>
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="text-xs font-medium text-[var(--velora-text-primary)]">
                  Password <span className="text-[var(--velora-state-danger)]">*</span>
                </label>
                <a href="#" className="text-[10px] text-[var(--velora-text-brand)] hover:underline">Forgot password?</a>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Checkbox
              checked={remember}
              onCheckedChange={(v) => setRemember(v === true)}
              label="Remember me for 30 days"
            />
            <Button type="submit" variant="gradient" className="w-full">
              Sign in
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center border-t border-[var(--velora-border-muted)] pt-3">
          <p className="text-xs text-[var(--velora-text-tertiary)]">
            Don&apos;t have an account?{" "}
            <a href="#" className="font-medium text-[var(--velora-text-brand)] hover:underline">Sign up</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
