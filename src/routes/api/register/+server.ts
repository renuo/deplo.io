import type { RequestHandler } from './$types';
import { RECAPTCHA_SECRET_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

const RECAPTCHA_SCORE_THRESHOLD = 0.5;

export const POST: RequestHandler = async (event) => {
  const form = await event.request.formData();
  const email = form.get('email');
  const captchaToken = form.get('token');

  if (!email || !captchaToken) {
    return json({ success: false, message: 'Email and reCAPTCHA token are required' }, { status: 400 });
  }

  const captchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
  });
  const captchaJson = await captchaResponse.json();

  if (!captchaResponse.ok || !captchaJson.success || captchaJson.score < RECAPTCHA_SCORE_THRESHOLD) {
    return json({ success: false, message: 'Failed to verify reCAPTCHA' }, { status: 500 });
  }

  const sheetForm = new FormData();
  sheetForm.set('Email', email);
  const sheetResponse = await fetch(
    'https://script.google.com/macros/s/AKfycbwT1lwiqSW1clYKkuHFrjcXYyjpZD-mreglv8ZvKqP7e-HrTPE3YPPno6zEOtuKAysKbw/exec',
    {
      method: 'POST',
      body: sheetForm,
    },
  );

  if (!sheetResponse.ok) {
    return json({ success: false, message: 'Failed to register' }, { status: 500 });
  }

  return json({ success: true });
};
