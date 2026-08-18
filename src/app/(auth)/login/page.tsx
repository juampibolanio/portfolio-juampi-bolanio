import { LoginForm } from "../../../features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl p-10 rounded-3xl border border-slate-800 shadow-2xl relative z-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-headline font-extrabold text-white tracking-tight mb-2">
            Panel de Control
          </h1>
          <p className="text-slate-400 text-sm">
            Ingresa tus credenciales para administrar el portfolio.
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
