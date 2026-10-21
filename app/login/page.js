import { Suspense } from "react";
import { LoginForm } from "@/components/AuthForms";
import Spinner from "@/components/Spinner";

export const metadata = {
  title: "Log in",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<Spinner label="Loading" className="py-32" />}>
      <LoginForm />
    </Suspense>
  );
}
