'use client'

import { useState } from 'react'
import { useAuth } from '@logiteria/commerce-sdk/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const { register, loading } = useAuth()
  const router = useRouter()

  const [form, setForm] = useState({ email: '', password: '', first_name: '', last_name: '' })
  const [error, setError] = useState('')

  function updateField(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const success = await register(form)
    if (success) {
      router.push('/account')
    } else {
      setError('Registration failed. Please try again.')
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Create Account</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-[var(--color-error)] rounded-[var(--radius)] text-sm text-[var(--color-error)]">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium mb-1">First Name</label>
            <input
              id="first_name"
              type="text"
              value={form.first_name}
              onChange={(e) => updateField('first_name', e.target.value)}
              required
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded-[var(--radius)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label htmlFor="last_name" className="block text-sm font-medium mb-1">Last Name</label>
            <input
              id="last_name"
              type="text"
              value={form.last_name}
              onChange={(e) => updateField('last_name', e.target.value)}
              required
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded-[var(--radius)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            required
            className="w-full px-4 py-2 border border-[var(--color-border)] rounded-[var(--radius)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => updateField('password', e.target.value)}
            required
            minLength={8}
            className="w-full px-4 py-2 border border-[var(--color-border)] rounded-[var(--radius)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--color-primary)] text-white py-3 rounded-[var(--radius)] font-medium hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

        <p className="text-sm text-center text-[var(--color-text-muted)]">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[var(--color-primary)] hover:underline">Sign in</Link>
        </p>
      </form>
    </div>
  )
}
