import { NextRequest, NextResponse } from 'next/server'
import { createAdminSupabase } from '@/lib/supabase/admin'
import { getAdminTokenFromRequest, verifyAdminSessionToken } from '@/lib/admin-session'
import { LEAD_INTENTS, LEAD_PRIORITIES, LEAD_SOURCES, LEAD_STATUSES, rowsToLeads, type LeadRow } from '@/lib/leads'

function unauthorized() {
  return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
}

async function sendLeadEmailNotification(payload: {
  fullName: string
  phone: string
  email?: string
  source: string
  intent: string
  notes?: string
}) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.LEADS_NOTIFICATION_EMAIL
  const from = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
  if (!apiKey || !to) return

  const text = [
    'Nuevo lead recibido',
    '',
    `Nombre: ${payload.fullName}`,
    `Telefono: ${payload.phone}`,
    `Email: ${payload.email || 'No indicado'}`,
    `Origen: ${payload.source}`,
    `Interes: ${payload.intent}`,
    `Notas: ${payload.notes || 'No indicado'}`,
  ].join('\n')

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Nuevo lead: ${payload.fullName}`,
      text,
    }),
  }).catch(() => null)
}

export async function GET(request: NextRequest) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }

  try {
    const supabase = createAdminSupabase()
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500)

    if (error) throw error
    return NextResponse.json(rowsToLeads(data as LeadRow[] | null))
  } catch {
    return NextResponse.json({ error: 'Error al obtener leads' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // #region agent log
    fetch('http://127.0.0.1:7499/ingest/0c6d3681-619e-41fd-9119-2e1b47ea3ed5',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'6f5192'},body:JSON.stringify({sessionId:'6f5192',runId:'pre-fix',hypothesisId:'H3',location:'src/app/api/leads/route.ts:POST:afterJson',message:'Parsed /api/leads request body',data:{hasFullName:Boolean(body?.fullName),hasPhone:Boolean(body?.phone),hasEmail:Boolean(body?.email),source:body?.source ?? null,intent:body?.intent ?? null,priority:body?.priority ?? null},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    const fullName = String(body.fullName || '').trim()
    const phone = String(body.phone || '').trim()
    const email = String(body.email || '').trim() || null
    const notes = String(body.notes || '').trim() || null
    const source = String(body.source || 'web_contacto')
    const intent = String(body.intent || 'otro')
    const priority = String(body.priority || 'media')
    const propertyRef = String(body.propertyRef || '').trim() || null
    const saleTimeline = String(body.saleTimeline || '').trim() || null

    if (!fullName || !phone) {
      return NextResponse.json({ error: 'Nombre y telefono son obligatorios' }, { status: 400 })
    }
    if (!LEAD_SOURCES.includes(source as (typeof LEAD_SOURCES)[number])) {
      return NextResponse.json({ error: 'Origen de lead no valido' }, { status: 400 })
    }
    if (!LEAD_INTENTS.includes(intent as (typeof LEAD_INTENTS)[number])) {
      return NextResponse.json({ error: 'Tipo de interes no valido' }, { status: 400 })
    }
    if (!LEAD_PRIORITIES.includes(priority as (typeof LEAD_PRIORITIES)[number])) {
      return NextResponse.json({ error: 'Prioridad no valida' }, { status: 400 })
    }

    const supabase = createAdminSupabase()
    // #region agent log
    fetch('http://127.0.0.1:7499/ingest/0c6d3681-619e-41fd-9119-2e1b47ea3ed5',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'6f5192'},body:JSON.stringify({sessionId:'6f5192',runId:'pre-fix',hypothesisId:'H4',location:'src/app/api/leads/route.ts:POST:beforeInsert',message:'Attempting Supabase lead insert',data:{hasResendApiKey:Boolean(process.env.RESEND_API_KEY),hasLeadsNotificationEmail:Boolean(process.env.LEADS_NOTIFICATION_EMAIL),hasResendFromEmail:Boolean(process.env.RESEND_FROM_EMAIL),fullNameLength:fullName.length,hasPhone:Boolean(phone),hasEmail:Boolean(email),source,intent,priority,hasPropertyRef:Boolean(propertyRef),hasSaleTimeline:Boolean(saleTimeline)},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    const { data, error } = await supabase
      .from('leads')
      .insert({
        full_name: fullName,
        phone,
        email,
        notes,
        source,
        intent,
        priority,
        property_ref: propertyRef,
        sale_timeline: saleTimeline,
        status: 'nuevo',
      })
      .select('*')
      .single()

    if (error) throw error
    // #region agent log
    fetch('http://127.0.0.1:7499/ingest/0c6d3681-619e-41fd-9119-2e1b47ea3ed5',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'6f5192'},body:JSON.stringify({sessionId:'6f5192',runId:'pre-fix',hypothesisId:'H1',location:'src/app/api/leads/route.ts:POST:afterInsert',message:'Supabase lead insert succeeded',data:{leadId:(data as LeadRow | null)?.id ?? null},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    await sendLeadEmailNotification({
      fullName,
      phone,
      email: email || undefined,
      source,
      intent,
      notes: notes || undefined,
    })

    return NextResponse.json(rowsToLeads([data as LeadRow])[0], { status: 201 })
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7499/ingest/0c6d3681-619e-41fd-9119-2e1b47ea3ed5',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'6f5192'},body:JSON.stringify({sessionId:'6f5192',runId:'pre-fix',hypothesisId:'H1',location:'src/app/api/leads/route.ts:POST:catch',message:'Unhandled error creating lead',data:{errorName:error instanceof Error ? error.name : 'unknown',errorMessage:error instanceof Error ? error.message : String(error)},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    return NextResponse.json({ error: 'Error al crear lead' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }

  try {
    const body = await request.json()
    const id = String(body.id || '').trim()
    if (!id) return NextResponse.json({ error: 'ID no valido' }, { status: 400 })

    const updates: Record<string, string | null> = {}
    if (body.status) {
      const status = String(body.status)
      if (!LEAD_STATUSES.includes(status as (typeof LEAD_STATUSES)[number])) {
        return NextResponse.json({ error: 'Estado no valido' }, { status: 400 })
      }
      updates.status = status
      if (status === 'contactado' && !body.firstResponseAt) {
        updates.first_response_at = new Date().toISOString()
      }
    }
    if (body.priority) {
      const priority = String(body.priority)
      if (!LEAD_PRIORITIES.includes(priority as (typeof LEAD_PRIORITIES)[number])) {
        return NextResponse.json({ error: 'Prioridad no valida' }, { status: 400 })
      }
      updates.priority = priority
    }
    if (body.notes !== undefined) updates.notes = String(body.notes || '').trim() || null
    if (body.assignedTo !== undefined) updates.assigned_to = String(body.assignedTo || '').trim() || null
    if (body.lastContactAt) updates.last_contact_at = new Date(body.lastContactAt).toISOString()
    updates.updated_at = new Date().toISOString()

    const supabase = createAdminSupabase()
    const { data, error } = await supabase
      .from('leads')
      .update(updates)
      .eq('id', id)
      .select('*')
      .single()

    if (error) throw error
    return NextResponse.json(rowsToLeads([data as LeadRow])[0])
  } catch {
    return NextResponse.json({ error: 'Error al actualizar lead' }, { status: 500 })
  }
}

