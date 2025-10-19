let googleTranslateElementInit = false;

const GoogleTranslate = {
  init: () => {
    if (googleTranslateElementInit) return;
    
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,hi,mr,sa,ta,te,kn,ml,gu,pa,bn,ur,or,as,ne,sd,si,fr,de,es,zh,ja,ru',
        layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
        autoDisplay: false
      }, 'google_translate_element');
      googleTranslateElementInit = true;
    };
    
    document.head.appendChild(script);
  },
  
  cleanup: () => {
    const element = document.getElementById('google_translate_element');
    if (element) element.innerHTML = '';
  }
};

export default GoogleTranslate;