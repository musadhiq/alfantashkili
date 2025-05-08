import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GoogleTranslate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [language, setLanguage] = useState("en");

  // Automatically detect language from the browser or fallback to 'en'
  useEffect(() => {
    const browserLang = navigator.language || navigator.userLanguage;
    const detectedLang = browserLang.startsWith("ar") ? "ar" : "en";
    setLanguage(detectedLang);

    // Set Google Translate script and configuration
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,ar",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    // Set Google Translate cookie to apply language
    document.cookie = `googtrans=/en/${detectedLang};path=/`;
  }, []);

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);

    // Set Google Translate cookie
    document.cookie = `googtrans=/en/${selectedLang};path=/`;

    // Navigate without changing language in the URL
    navigate(location.pathname, { replace: true });
  };

  return (
    <div className="items-center space-x-2 hidden">
      <div id="google_translate_element" className="hidden" />
      <select
        value={language}
        onChange={handleLanguageChange}
        className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        <option value="en">English</option>
        <option value="ar">العربية</option>
      </select>
    </div>
  );
};

export default GoogleTranslate;
