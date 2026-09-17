const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      name,
      email,
      phone,
      eventDate,
      venue,
      guests,
      eventType,
      budget,
      estimateRange,
      estimateDetail,
      message,
    } = await req.json();

    // Validation des champs requis
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured');
    }

    // Lignes "détails événement" (uniquement si renseignées)
    const detailRows: string[] = [];
    const addRow = (label: string, value?: string) => {
      if (value) {
        detailRows.push(
          `<tr>
            <td style="padding:6px 16px 6px 0;color:#8a7a6a;font-size:13px;white-space:nowrap;vertical-align:top;">${label}</td>
            <td style="padding:6px 0;color:#1d1812;font-size:13px;">${value}</td>
          </tr>`
        );
      }
    };

    addRow('Date', eventDate);
    addRow('Venue', venue);
    addRow('Guests', guests);
    addRow('Event type', eventType);
    addRow('Budget', budget);

    const estimateBlock =
      estimateRange
        ? `<div style="margin:20px 0;padding:14px 16px;border:1px solid #E36A2E;border-radius:4px;background:#fdf3ec;">
            <p style="margin:0 0 4px;color:#B5532A;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">Calculator estimate</p>
            <p style="margin:0 0 4px;color:#1d1812;font-size:22px;font-weight:600;">${estimateRange}</p>
            ${estimateDetail ? `<p style="margin:0;color:#8a7a6a;font-size:12px;">${estimateDetail}</p>` : ''}
          </div>`
        : '';

    const detailsTable =
      detailRows.length > 0
        ? `<table style="border-collapse:collapse;margin:20px 0;">${detailRows.join('')}</table>`
        : '';

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Orange Decibel <onboarding@resend.dev>',
        to: ['orangedecibelita@gmail.com'],
        reply_to: email,
        subject: `Nuovo contatto da ${name}${estimateRange ? ` — ${estimateRange}` : ''}`,
        html: `
          <h2 style="color:#1d1812;">Nuova richiesta dal sito</h2>
          <table style="border-collapse:collapse;margin:12px 0;">
            <tr><td style="padding:4px 16px 4px 0;color:#8a7a6a;font-size:13px;">Nome</td><td style="color:#1d1812;font-size:13px;">${name}</td></tr>
            <tr><td style="padding:4px 16px 4px 0;color:#8a7a6a;font-size:13px;">Email</td><td style="color:#1d1812;font-size:13px;">${email}</td></tr>
            <tr><td style="padding:4px 16px 4px 0;color:#8a7a6a;font-size:13px;">Telefono</td><td style="color:#1d1812;font-size:13px;">${phone || 'Non specificato'}</td></tr>
          </table>
          ${detailsTable}
          ${estimateBlock}
          <p style="color:#8a7a6a;font-size:13px;margin-bottom:4px;">Messaggio:</p>
          <p style="color:#1d1812;font-size:14px;line-height:1.5;">${message}</p>
        `,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Resend error:', data);
      return new Response(
        JSON.stringify({ error: 'Failed to send email' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
