// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  interface Window {
    gtag: (type: string, event: string, data: Record<string, unknown>) => void;
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (sitekey: string, options: { action: string }) => Promise<string>;
    };
  }

  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
