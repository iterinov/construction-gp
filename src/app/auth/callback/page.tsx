// src/app/auth/callback/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AuthCallback() {
  const router = useRouter()
  const [msg, setMsg] = useState('Connexion en cours...')

  useEffect(() => {
    async function run() {
      try {
        const { error } = await supabase.auth.exchangeCodeForSession(window.location.href)
        if (error) {
          setMsg(`❌ ${error.message}`)
          return
        }
        setMsg('✅ Connecté, redirection...')
        router.replace('/')
      } catch (e) {
        // e is unknown — narrow safely:
        const message = e instanceof Error ? e.message : 'Erreur inconnue'
        setMsg(`❌ ${message}`)
      }
    }
    run()
  }, [router])

  return <main className="p-6">{msg}</main>
}
