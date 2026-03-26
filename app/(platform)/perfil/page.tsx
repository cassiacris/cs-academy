'use client'

import { useState } from 'react'
import { User, Mail, Calendar, Lock, Eye, EyeOff, Save } from 'lucide-react'
import { mockCourses } from '@/lib/mock-data'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import Link from 'next/link'

export default function PerfilPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError('')
    setPasswordSuccess(false)

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Preencha todos os campos')
      return
    }
    if (newPassword.length < 8) {
      setPasswordError('A nova senha deve ter pelo menos 8 caracteres')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('As senhas não coincidem')
      return
    }

    setSavingPassword(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSavingPassword(false)
    setPasswordSuccess(true)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setTimeout(() => setPasswordSuccess(false), 3000)
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-cs-white">Meu Perfil</h1>
        <p className="text-sm text-cs-white-muted mt-1">
          Gerencie suas informações e preferências de conta.
        </p>
      </div>

      {/* Profile card */}
      <div className="bg-cs-black-surface border border-cs-border rounded-xl p-6">
        <div className="flex items-center gap-5 mb-6">
          {/* Avatar */}
          <div className="relative">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #3D2F0A, #8B6F1E)',
                border: '2px solid #C9A435',
                boxShadow: '0 0 20px rgba(201, 164, 53, 0.2)',
              }}
            >
              <span className="text-2xl font-black text-cs-gold">A</span>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-cs-white">Aluna CS Academy</h2>
            <p className="text-sm text-cs-white-muted">aluna@email.com</p>
            <Badge variant="gold" className="mt-1.5">
              Aluna ativa
            </Badge>
          </div>
        </div>

        {/* Info items */}
        <div className="space-y-4 border-t border-cs-border pt-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cs-black-subtle border border-cs-border flex items-center justify-center">
              <User className="w-4 h-4 text-cs-white-muted" />
            </div>
            <div>
              <p className="text-xs text-cs-white-dim">Nome</p>
              <p className="text-sm text-cs-white font-medium">Aluna CS Academy</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cs-black-subtle border border-cs-border flex items-center justify-center">
              <Mail className="w-4 h-4 text-cs-white-muted" />
            </div>
            <div>
              <p className="text-xs text-cs-white-dim">E-mail</p>
              <p className="text-sm text-cs-white font-medium">aluna@email.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cs-black-subtle border border-cs-border flex items-center justify-center">
              <Calendar className="w-4 h-4 text-cs-white-muted" />
            </div>
            <div>
              <p className="text-xs text-cs-white-dim">Membro desde</p>
              <p className="text-sm text-cs-white font-medium">Março de 2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enrolled courses */}
      <div className="bg-cs-black-surface border border-cs-border rounded-xl p-6">
        <h3 className="text-base font-semibold text-cs-white mb-4">
          Cursos matriculados
        </h3>
        <div className="space-y-3">
          {mockCourses.map((course) => (
            <Link
              key={course.id}
              href={`/cursos/${course.slug}`}
              className="flex items-center gap-4 p-4 rounded-xl bg-cs-black border border-cs-border hover:border-cs-gold/30 transition-all group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background:
                    course.slug === 'box-magnetize'
                      ? 'linear-gradient(135deg, #3D2F0A, #8B6F1E)'
                      : 'linear-gradient(135deg, #0A1628, #1E3560)',
                }}
              >
                <span className="text-sm">
                  {course.slug === 'box-magnetize' ? '✦' : '◈'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-cs-white group-hover:text-cs-gold transition-colors">
                  {course.title}
                </p>
                <p className="text-xs text-cs-white-dim mt-0.5">
                  {course.total_lessons} aulas · {course.progress || 0}% concluído
                </p>
              </div>
              <div className="h-1.5 w-20 bg-cs-black-subtle rounded-full overflow-hidden">
                <div
                  className="h-full bg-cs-gold rounded-full"
                  style={{ width: `${course.progress || 0}%` }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Change password */}
      <div className="bg-cs-black-surface border border-cs-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-cs-black-subtle border border-cs-border flex items-center justify-center">
            <Lock className="w-4 h-4 text-cs-white-muted" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-cs-white">Alterar senha</h3>
            <p className="text-xs text-cs-white-dim">
              Use uma senha forte com pelo menos 8 caracteres
            </p>
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <Input
            label="Senha atual"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            icon={<Lock className="w-4 h-4" />}
          />
          <Input
            label="Nova senha"
            type={showPassword ? 'text' : 'password'}
            placeholder="Mínimo 8 caracteres"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            icon={<Lock className="w-4 h-4" />}
          />
          <Input
            label="Confirmar nova senha"
            type={showPassword ? 'text' : 'password'}
            placeholder="Repita a nova senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={<Lock className="w-4 h-4" />}
          />

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="w-4 h-4 rounded accent-cs-gold"
            />
            <span className="text-xs text-cs-white-muted">Mostrar senhas</span>
          </label>

          {passwordError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
              <p className="text-sm text-red-400">{passwordError}</p>
            </div>
          )}

          {passwordSuccess && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3">
              <p className="text-sm text-green-400">
                Senha alterada com sucesso!
              </p>
            </div>
          )}

          <Button
            type="submit"
            variant="gold"
            loading={savingPassword}
            icon={<Save className="w-4 h-4" />}
          >
            Salvar nova senha
          </Button>
        </form>
      </div>
    </div>
  )
}
