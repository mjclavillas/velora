"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Checkbox,
  Separator,
  Badge,
  useToast,
} from "@velora/core";
import { Github, Mail, Eye, EyeOff, Sparkles } from "lucide-react";

interface SignInFormData {
  email: string;
  password: string;
  remember: boolean;
}

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

function SignInForm() {
  const { success, error } = useToast();
  const form = useForm<SignInFormData>({
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = async (data: SignInFormData) => {
    await new Promise((r) => setTimeout(r, 1500));
    if (data.email === "fail@test.com") {
      error("Sign in failed", { description: "Invalid email or password." });
      form.setError("email", { message: "Invalid credentials" });
    } else {
      success("Welcome back!", { description: `Signed in as ${data.email}` });
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[var(--velora-bg-base)] p-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg,#8060ff,#1ac8ed)" }}
          >
            V
          </div>
          <div>
            <h1 className="text-xl font-semibold text-[var(--velora-text-primary)]">Welcome back</h1>
            <p className="text-sm text-[var(--velora-text-tertiary)]">Sign in to your Velora account</p>
          </div>
        </div>

        <Card variant="raised" padding="none">
          <CardContent className="pt-6">
            <div className="mb-4 flex flex-col gap-2">
              <Button variant="outline" className="w-full" leadingIcon={<Github className="h-4 w-4" />} type="button">
                Continue with GitHub
              </Button>
              <Button variant="outline" className="w-full" leadingIcon={<Mail className="h-4 w-4" />} type="button">
                Continue with Google
              </Button>
            </div>

            <Separator label="or" className="my-5" />

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                  }}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel required>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="you@example.com" autoComplete="email" state={fieldState.error ? "error" : "default"} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  rules={{ required: "Password is required" }}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel required>Password</FormLabel>
                        <a href="/forgot-password" className="text-xs text-[var(--velora-text-brand)] hover:underline">Forgot password?</a>
                      </div>
                      <FormControl>
                        <Input {...field} type="password" placeholder="••••••••" autoComplete="current-password" state={fieldState.error ? "error" : "default"} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="remember"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} label="Remember me for 30 days" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit" variant="gradient" className="w-full" loading={form.formState.isSubmitting}>
                  Sign in
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="justify-center border-t border-[var(--velora-border-muted)] pt-4">
            <p className="text-sm text-[var(--velora-text-tertiary)]">
              Don{"'"}t have an account?{" "}
              <a href="/sign-up" className="font-medium text-[var(--velora-text-brand)] hover:underline">Sign up</a>
            </p>
          </CardFooter>
        </Card>

        <p className="mt-6 text-center text-xs text-[var(--velora-text-tertiary)]">
          By signing in you agree to our{" "}
          <a href="/terms" className="hover:underline">Terms</a> and{" "}
          <a href="/privacy" className="hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}

function SignUpForm() {
  const { success } = useToast();
  const form = useForm<SignUpFormData>({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "", terms: false },
  });

  const password = form.watch("password");

  const onSubmit = async (data: SignUpFormData) => {
    await new Promise((r) => setTimeout(r, 1800));
    success("Account created!", { description: `Welcome to Velora, ${data.name}!` });
  };

  const getPasswordStrength = (p: string) => {
    if (!p) return null;
    if (p.length < 6) return { label: "Too short", value: 20, variant: "danger" as const };
    if (p.length < 8) return { label: "Weak", value: 40, variant: "warning" as const };
    if (!/[A-Z]/.test(p) || !/[0-9]/.test(p)) return { label: "Fair", value: 60, variant: "warning" as const };
    if (p.length >= 12 && /[^a-zA-Z0-9]/.test(p)) return { label: "Strong", value: 100, variant: "success" as const };
    return { label: "Good", value: 80, variant: "success" as const };
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[var(--velora-bg-base)] p-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Badge variant="gradient" icon={<Sparkles className="h-3 w-3" />}>Free forever on Starter</Badge>
          <div>
            <h1 className="text-xl font-semibold text-[var(--velora-text-primary)]">Create your account</h1>
            <p className="text-sm text-[var(--velora-text-tertiary)]">Start building in minutes</p>
          </div>
        </div>

        <Card variant="raised" padding="none">
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
                <FormField
                  control={form.control}
                  name="name"
                  rules={{ required: "Name is required" }}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel required>Full name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Jane Doe" autoComplete="name" state={fieldState.error ? "error" : "default"} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                  }}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel required>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="you@example.com" autoComplete="email" state={fieldState.error ? "error" : "default"} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  rules={{ required: "Password is required", minLength: { value: 8, message: "At least 8 characters" } }}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel required>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="••••••••" autoComplete="new-password" state={fieldState.error ? "error" : "default"} />
                      </FormControl>
                      {strength && !fieldState.error && (
                        <div className="flex items-center gap-2">
                          <div className="flex-1">
                            <div className="h-1 overflow-hidden rounded-full bg-[var(--velora-bg-muted)]">
                              <div
                                className="h-full rounded-full transition-all duration-300"
                                style={{
                                  width: `${strength.value}%`,
                                  background:
                                    strength.variant === "success"
                                      ? "var(--velora-state-success)"
                                      : strength.variant === "warning"
                                      ? "var(--velora-state-warning)"
                                      : "var(--velora-state-danger)",
                                }}
                              />
                            </div>
                          </div>
                          <span className="text-xs text-[var(--velora-text-tertiary)]">{strength.label}</span>
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  rules={{ required: "Please confirm your password", validate: (v) => v === password || "Passwords do not match" }}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel required>Confirm password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="••••••••"
                          autoComplete="new-password"
                          state={fieldState.error ? "error" : field.value && field.value === password ? "success" : "default"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="terms"
                  rules={{ validate: (v) => v || "You must accept the terms" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} label="I agree to the Terms of Service and Privacy Policy" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" variant="gradient" className="w-full" loading={form.formState.isSubmitting}>
                  Create account
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="justify-center border-t border-[var(--velora-border-muted)] pt-4">
            <p className="text-sm text-[var(--velora-text-tertiary)]">
              Already have an account?{" "}
              <a href="/sign-in" className="font-medium text-[var(--velora-text-brand)] hover:underline">Sign in</a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default function AuthPage() {
  const [mode, setMode] = React.useState<"signin" | "signup">("signin");

  return (
    <div className="min-h-dvh bg-[var(--velora-bg-base)]">
      <div className="fixed top-4 left-4 z-50 flex gap-1 rounded-lg border border-[var(--velora-border-muted)] bg-[var(--velora-bg-elevated)] p-1">
        <button
          onClick={() => setMode("signin")}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            mode === "signin"
              ? "bg-[var(--velora-brand-default)] text-white"
              : "text-[var(--velora-text-tertiary)] hover:text-[var(--velora-text-primary)]"
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setMode("signup")}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            mode === "signup"
              ? "bg-[var(--velora-brand-default)] text-white"
              : "text-[var(--velora-text-tertiary)] hover:text-[var(--velora-text-primary)]"
          }`}
        >
          Sign Up
        </button>
      </div>
      {mode === "signin" ? <SignInForm /> : <SignUpForm />}
    </div>
  );
}
