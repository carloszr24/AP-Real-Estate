import { NextResponse } from 'next/server'
import { ADMIN_COOKIE_NAME, createAdminSessionToken } from '@/lib/admin-session'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const password = typeof body?.password === 'string' ? body.password : ''
    const expected = process.env.ADMIN_PASSWORD || ''
    if (!expected || password !== expected) {
      return NextResponse.json({ ok: false }, { status: 401 })
    }
    const token = createAdminSessionToken()
    const res = NextResponse.json({ ok: true })
    res.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
    return res
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
