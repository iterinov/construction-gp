'use client'
import { FormEvent, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErr(null)
    const email = new FormData(e.currentTarget).get('email') as string
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) setErr(error.message)
    else setSent(true)
  }

  return (
    <main className="p-6 max-w-sm space-y-3">
      <h1 className="text-2xl font-bold">Connexion</h1>
      {sent ? (
        <p>📬 Lien envoyé. Vérifie tes courriels.</p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-2">
          <input name="email" type="email" required placeholder="vous@exemple.com"
                 className="border rounded p-2 w-full" />
          <button className="border rounded px-4 py-2">Envoyer le lien</button>
          {err && <p className="text-red-600 text-sm">{err}</p>}
        </form>
      )}
    </main>
  )
}
