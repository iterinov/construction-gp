'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Page() {
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null)
    })
  }, [])

  async function signOut() {
    await supabase.auth.signOut()
    location.reload()
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Construction GP</h1>
      {email ? (
        <>
          <p className="mt-2">Connecté : {email}</p>
          <button className="mt-3 border rounded px-3 py-2" onClick={signOut}>
            Se déconnecter
          </button>
        </>
      ) : (
        <p className="mt-2">
          Non connecté — <a className="underline" href="/login">Se connecter</a>
        </p>
      )}
    </main>
  )
}
