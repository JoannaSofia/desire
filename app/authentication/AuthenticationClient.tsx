'use client'

import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client'
import { User, SupabaseClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

type Mode = 'signup' | 'signin'

export default function Authentication() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null)
 

  useEffect(() => {
    const client = getSupabaseBrowserClient()
    setSupabase(client)

    async function getInitialUser() {
      const { data } = await client.auth.getSession()
      setCurrentUser(data.session?.user ?? null)
    }

    getInitialUser()

    const { data: listener } = client.auth.onAuthStateChange(
      (_event, session) => {
        setCurrentUser(session?.user ?? null)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) return

    if (mode == "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/welcome`,
        }
      });
      if (error) {
        setStatus(error.message);
      } else {
        setStatus("Check your inbox to confirm the new account.");
      }
    } else {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setStatus(error.message)
      } else {
        router.push('/dashboard')
      }
    }
  }

  async function handleSignOut() {
    if (!supabase) return

    await supabase.auth.signOut()
    setCurrentUser(null)
    setStatus('Signed out successfully')
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="flex flex-col gap-6">
        {!currentUser && (
          <>
            <form
              className="relative mx-auto w-xl overflow-hidden border border-[#E6DCD8] rounded-xl p-8 text-stone-800"
              onSubmit={handleSubmit}
            >
              <div
                className="pointer-events-none absolute -left-4 -top-4 -z-10 h-20 w-28 "
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-10 right-2 -z-10 h-28 w-40"
                aria-hidden="true"
              />
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-stone-800">
                    {mode === "signup" ? "Create an account" : "Welcome back"}
                  </h3>
                </div>
                <div className="flex border border-[#E6DCD8] rounded-lg p-1 text-xs font-semibold text-stone-800">
                  {(["signup", "signin"] as Mode[]).map((option) => (
                    <Button
                      key={option}
                      type="button"
                      variant="default"                      aria-pressed={mode === option}
                      onClick={() => setMode(option)}
                      className={`px-4 py-1 rounded-lg transition ${mode === option
                        ? "bg-stone-600 text-white shadow shadow-stone-500/20"
                        : "text-slate-700"
                        }`}
                    >
                      {option === "signup" ? "Sign up" : "Sign in"}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <label className="block text-sm font-medium text-stone-800">
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    className="mt-2 w-full border border-[#E6DCD8] bg-stone-200 rounded-lg px-3 py-2.5 text-base text-stone-400 placeholder-stone-800 focus:border-[#D98D82] focus:outline-none focus:ring-2 focus:ring-[#D98D82]"
                    placeholder="you@email.com"
                  />
                </label>
                <label className="block text-sm font-medium text-stone-800">
                  Password
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    minLength={6}
                    className="mt-2 w-full border border-[#E6DCD8] rounded-lg bg-stone-200 px-3 py-2.5 text-base text-stone-800 placeholder-stone-500 focus:border-[#D98D82] focus:outline-none focus:ring-2 focus:ring-[#D98D82]"
                    placeholder="At least 6 characters"
                  />
                </label>
              </div>
              <div className='content-end'>
              <Button
                type="submit"
                className="mt-6 inline-flex w-24 rounded-lg items-center justify-center bg-stone-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-600 disabled:cursor-not-allowed disabled:bg-slate-600/40"
              >
                {mode === "signup" ? "Sign up" : "Sign in"}
              </Button>
              </div>
              {status && (
                <p className="mt-4 text-sm text-stone-800" role="status" aria-live="polite">
                  {status}
                </p>
              )}
            </form>
          </>
        )}
        {currentUser && (
          <section className="rounded-xl border border-[#E9E4DE] bg-white p-6">
            <h3 className="text-lg font-semibold text-stone-800">
              Welcome back!
            </h3>

            <p className="mt-2 text-sm text-stone-800">
              You are signed in as {currentUser.email}
            </p>

            <Button
              type="button"
              onClick={handleSignOut}
              className="mt-6 w-24 bg-[#45214F] text-white border px-4 py-3 text-sm font-semibold transition hover:bg-[#B86B61]"
            >
              Sign out
            </Button>
          </section>
        )}
      </div>
    </main>
  );
}