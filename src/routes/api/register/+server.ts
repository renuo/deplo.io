import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async (event) => {
  const form = await event.request.formData();
  const email = form.get('email') || form.get('Email');

  if (!email) {
    return json({ success: false, message: 'Email is required' }, { status: 400 });
  }

  form.set('Email', email);

  // TODO: Verify reCAPTCHA token
  // const token = form.get('token');
  // fetch('https://www.google.com/recaptcha/api/siteverify', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   body: `secret=${import.meta.env.VITE_RECAPTCHA_SECRET}&response=${token}`,
  // })

  const response = await fetch('https://script.google.com/macros/s/AKfycbwT1lwiqSW1clYKkuHFrjcXYyjpZD-mreglv8ZvKqP7e-HrTPE3YPPno6zEOtuKAysKbw/exec', {
    method: 'POST',
    body: form,
  });

  if (!response.ok) {
    return json({ success: false, message: 'Failed to register' }, { status: 500 });
  }

  return json({ success: true });
}

