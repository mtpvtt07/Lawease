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

const GoogleTranslate = {
  init: () => {
    if (googleTranslateElementInit || googleTranslateScriptAppended) return;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
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

        // Apply saved language if any (without cookies to avoid Chrome toolbar)
        const saved = localStorage.getItem(LS_KEY);
        if (saved && saved !== 'en') {
          await GoogleTranslate.setLanguage(saved);
        }
      } catch (e) {
        // no-op
      }
    };
    document.head.appendChild(script);
    googleTranslateScriptAppended = true;
  },

  setLanguage: async (code) => {
    // Persist selection locally; do NOT set googtrans cookie to prevent toolbar
    localStorage.setItem(LS_KEY, code);
    // If the combo exists, set its value and dispatch change
    const combo = await waitForTranslateCombo();
    if (combo) {
      combo.value = code;
      const event = new Event('change', { bubbles: true });
      combo.dispatchEvent(event);
    }
  },

  getLanguage: () => localStorage.getItem(LS_KEY) || 'en',

  cleanup: () => {
    const element = document.getElementById('google_translate_element');
    if (element) element.innerHTML = '';
  }
};

export default GoogleTranslate;