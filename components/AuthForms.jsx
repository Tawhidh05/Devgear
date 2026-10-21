"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertTriangle, Eye, EyeOff, Info, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { getAuthErrorMessage, useAuth } from "@/context/AuthContext";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59A14.5 14.5 0 0 1 9.5 24c0-1.59.28-3.14.76-4.59l-7.98-6.19A23.99 23.99 0 0 0 0 24c0 3.88.92 7.55 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function FirebaseNotice() {
  const { isFirebaseConfigured } = useAuth();
  if (isFirebaseConfigured) return null;
  return (
    <div className="mb-6 flex gap-3 rounded-lg border border-amber/60 bg-amber-soft p-4 text-sm text-slate-900" role="alert">
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <p>
        Firebase keys are missing. Copy <code className="font-mono">.env.example</code> to{" "}
        <code className="font-mono">.env.local</code>, add your Firebase web app config and restart the dev
        server.
      </p>
    </div>
  );
}

function PasswordInput({ id, value, onChange, onBlur, invalid, describedBy, autoComplete }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        placeholder="At least 6 characters"
        className="field-input pr-11"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-ink"
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

function AuthCard({ title, subtitle, children, footer }) {
  return (
    <div className="page-container flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className="surface p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-bold tracking-tightest">{title}</h1>
          <p className="mt-2 text-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
        <p className="mt-6 text-center text-sm text-muted">{footer}</p>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="my-6 flex items-center gap-4 text-sm text-muted">
      <span className="h-px flex-1 bg-line" />
      or
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

function GoogleButton({ onClick, disabled, loading }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className="btn btn-outline w-full py-3">
      {loading ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <GoogleIcon />}
      Continue with Google
    </button>
  );
}

/** Redirect to the home page if someone who is already logged in opens /login or /register. */
function useRedirectIfLoggedIn() {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && user) router.replace("/");
  }, [loading, user, router]);
}

export function LoginForm() {
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  useRedirectIfLoggedIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const errors = {};
  if (!email.trim()) errors.email = "Enter your email address.";
  else if (!EMAIL_RE.test(email.trim())) errors.email = "Enter a valid email address.";
  if (!password) errors.password = "Enter your password.";

  const showError = (name) => (touched[name] ? errors[name] : undefined);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setFormError("");
    if (Object.keys(errors).length) return;

    setSubmitting(true);
    try {
      await login({ email: email.trim(), password });
      toast.success("Welcome back!");
      router.push("/");
    } catch (err) {
      setFormError(getAuthErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setFormError("");
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Signed in with Google.");
      router.push("/");
    } catch (err) {
      setFormError(getAuthErrorMessage(err));
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <AuthCard
      title="Log in"
      subtitle="Welcome back. Log in to add and manage products."
      footer={
        <>
          New to DevGear?{" "}
          <Link href="/register" className="font-semibold text-cobalt hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      {searchParams.get("protected") && (
        <div className="mb-6 flex gap-3 rounded-lg border border-cobalt/20 bg-cobalt-soft p-4 text-sm text-cobalt-dark" role="status">
          <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>That page is for logged-in users. Log in to continue.</p>
        </div>
      )}
      <FirebaseNotice />

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label htmlFor="email" className="field-label">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            aria-invalid={Boolean(showError("email"))}
            aria-describedby={showError("email") ? "email-error" : undefined}
            placeholder="you@example.com"
            className="field-input"
          />
          {showError("email") && <p id="email-error" className="field-error" role="alert">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="field-label">Password</label>
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            invalid={Boolean(showError("password"))}
            describedBy={showError("password") ? "password-error" : undefined}
            autoComplete="current-password"
          />
          {showError("password") && <p id="password-error" className="field-error" role="alert">{errors.password}</p>}
        </div>

        {formError && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
            {formError}
          </p>
        )}

        <button type="submit" disabled={submitting || googleLoading} className="btn btn-primary w-full py-3">
          {submitting && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
          {submitting ? "Logging in" : "Log in"}
        </button>
      </form>

      <Divider />
      <GoogleButton onClick={handleGoogle} disabled={submitting || googleLoading} loading={googleLoading} />
    </AuthCard>
  );
}

export function RegisterForm() {
  const { register, loginWithGoogle } = useAuth();
  const router = useRouter();
  useRedirectIfLoggedIn();

  const [values, setValues] = useState({ name: "", email: "", password: "", photoURL: "" });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));
  const blur = (key) => () => setTouched((t) => ({ ...t, [key]: true }));

  const errors = {};
  if (values.name.trim().length < 2) errors.name = "Enter your name (at least 2 characters).";
  if (!values.email.trim()) errors.email = "Enter your email address.";
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (values.password.length < 6) errors.password = "Password must be at least 6 characters.";
  else if (!/[A-Za-z]/.test(values.password) || !/\d/.test(values.password))
    errors.password = "Use at least one letter and one number.";
  if (values.photoURL.trim()) {
    try {
      new URL(values.photoURL.trim());
    } catch {
      errors.photoURL = "Enter a full URL starting with https://";
    }
  }

  const showError = (name) => (touched[name] ? errors[name] : undefined);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, photoURL: true });
    setFormError("");
    if (Object.keys(errors).length) return;

    setSubmitting(true);
    try {
      await register({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
        photoURL: values.photoURL.trim(),
      });
      toast.success("Account created. Welcome to DevGear!");
      router.push("/");
    } catch (err) {
      setFormError(getAuthErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setFormError("");
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Signed in with Google.");
      router.push("/");
    } catch (err) {
      setFormError(getAuthErrorMessage(err));
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <AuthCard
      title="Create your account"
      subtitle="Register to add products and manage the catalogue."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-cobalt hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <FirebaseNotice />

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label htmlFor="name" className="field-label">Full name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={set("name")}
            onBlur={blur("name")}
            aria-invalid={Boolean(showError("name"))}
            aria-describedby={showError("name") ? "name-error" : undefined}
            placeholder="Ada Lovelace"
            className="field-input"
          />
          {showError("name") && <p id="name-error" className="field-error" role="alert">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="reg-email" className="field-label">Email</label>
          <input
            id="reg-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={set("email")}
            onBlur={blur("email")}
            aria-invalid={Boolean(showError("email"))}
            aria-describedby={showError("email") ? "reg-email-error" : undefined}
            placeholder="you@example.com"
            className="field-input"
          />
          {showError("email") && <p id="reg-email-error" className="field-error" role="alert">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="reg-password" className="field-label">Password</label>
          <PasswordInput
            id="reg-password"
            value={values.password}
            onChange={set("password")}
            onBlur={blur("password")}
            invalid={Boolean(showError("password"))}
            describedBy={showError("password") ? "reg-password-error" : undefined}
            autoComplete="new-password"
          />
          {showError("password") ? (
            <p id="reg-password-error" className="field-error" role="alert">{errors.password}</p>
          ) : (
            <p className="field-hint">At least 6 characters, with a letter and a number.</p>
          )}
        </div>

        <div>
          <label htmlFor="photoURL" className="field-label">
            Photo URL <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="photoURL"
            name="photoURL"
            type="url"
            value={values.photoURL}
            onChange={set("photoURL")}
            onBlur={blur("photoURL")}
            aria-invalid={Boolean(showError("photoURL"))}
            aria-describedby={showError("photoURL") ? "photoURL-error" : undefined}
            placeholder="https://example.com/me.jpg"
            className="field-input"
          />
          {showError("photoURL") && <p id="photoURL-error" className="field-error" role="alert">{errors.photoURL}</p>}
        </div>

        {formError && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
            {formError}
          </p>
        )}

        <button type="submit" disabled={submitting || googleLoading} className="btn btn-primary w-full py-3">
          {submitting && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
          {submitting ? "Creating account" : "Create account"}
        </button>
      </form>

      <Divider />
      <GoogleButton onClick={handleGoogle} disabled={submitting || googleLoading} loading={googleLoading} />
    </AuthCard>
  );
}
