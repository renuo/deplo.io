(() => {
  const links = Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]')).filter(
    (link) => link.hreflang !== 'x-default',
  );
  const languages = links.map((link) => link.hreflang);
  const hasLanguageInPath = languages.some(
    (language) => location.pathname === `/${language}` || location.pathname.startsWith(`/${language}/`),
  );

  if (hasLanguageInPath) return;

  const languageCookie = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith('paraglide_lang='))
    ?.split('=')[1];
  const preferredLanguage =
    (languageCookie && languages.includes(languageCookie) ? languageCookie : undefined) ||
    (navigator.languages ?? [navigator.language])
      .map((language) => language.toLowerCase().split('-')[0])
      .find((language) => languages.includes(language));
  const currentLanguage = document.documentElement.lang;

  if (!preferredLanguage || preferredLanguage === currentLanguage) return;

  const alternate = links.find((link) => link.hreflang === preferredLanguage);
  if (!alternate) return;

  const target = new URL(alternate.href);
  location.replace(`${target.pathname}${location.search}${location.hash}`);
})();
