let googleTranslateElementInit = false;
let googleTranslateScriptAppended = false;
const LS_KEY = 'lawease-gt-lang';

async function waitForTranslateCombo(timeoutMs = 5000) {
  const start = Date.now();
  return new Promise((resolve) => {
    const check = () => {
      const combo = document.querySelector('.goog-te-combo');
      if (combo) return resolve(combo);
      if (Date.now() - start > timeoutMs) return resolve(null);
      requestAnimationFrame(check);
    };
    check();
  });
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name, value) {
  try {
    const expires = '; max-age=' + 60 * 60 * 24 * 365; // 1 year
    const path = '; path=/';
    // Set cookie for current host
    document.cookie = `${name}=${encodeURIComponent(value)}${expires}${path}`;
    // Also attempt setting on top-level domain (except localhost)
    const host = window.location.hostname;
    if (host && host.indexOf('.') !== -1 && host !== 'localhost') {
      document.cookie = `${name}=${encodeURIComponent(value)}${expires}${path}; domain=.${host}`;
    }
  } catch (_) {
    // ignore cookie errors
  }
}

function getCookieLang() {
  const val = getCookie('googtrans');
  // expected format: "/auto/hi"
  if (!val) return null;
  const parts = val.split('/');
  return parts[parts.length - 1] || null;
}

const GoogleTranslate = {
  init: () => {
    if (googleTranslateElementInit || googleTranslateScriptAppended) return;
  const script = document.createElement('script');
    script.type = 'text/javascript';
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;

    window.googleTranslateElementInit = async () => {
      if (googleTranslateElementInit) return; // guard against multiple callbacks
      googleTranslateElementInit = true;
      try {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
          multilanguagePage: true
        }, 'google_translate_element');
        // If there is a saved language and the cookie doesn't match, set cookie and reload ONCE.
        const saved = localStorage.getItem(LS_KEY);
        const cookieLang = getCookieLang();
        if (saved && saved !== 'en' && saved !== cookieLang && !sessionStorage.getItem('lawease-gt-init-reloaded')) {
          setCookie('googtrans', `/auto/${saved}`);
          sessionStorage.setItem('lawease-gt-init-reloaded', '1');
          window.location.reload();
          return;
        }
      } catch (e) {
        // no-op
      }
    };
    document.head.appendChild(script);
    googleTranslateScriptAppended = true;
  },

  setLanguage: async (code) => {
    // Persist selection locally
    localStorage.setItem(LS_KEY, code);
    // Robust path: set cookie and perform a single reload; banner stays hidden via CSS.
    const cookieLang = getCookieLang();
    if (cookieLang !== code) {
      setCookie('googtrans', `/auto/${code}`);
      sessionStorage.setItem('lawease-gt-user-reload', '1');
      window.location.reload();
      return;
    }
    // Fallback: try programmatic change without reload
    const combo = await waitForTranslateCombo();
    if (combo) {
      combo.value = code;
      combo.dispatchEvent(new Event('change', { bubbles: true }));
    }
  },

  getLanguage: () => localStorage.getItem(LS_KEY) || 'en',

  cleanup: () => {
    const element = document.getElementById('google_translate_element');
    if (element) element.innerHTML = '';
  }
};

export default GoogleTranslate;