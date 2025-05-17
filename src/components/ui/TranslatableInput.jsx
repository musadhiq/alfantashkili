import React, { useEffect, useState } from 'react';

function TranslatableInput({
  label,
  name,
  value = { en: '', ar: '' },
  onChange,
  required = false,
  translateFn, // async (text, from, to) => translatedText
}) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = async (lang, text) => {
    const updated = { ...localValue, [lang]: text };

    // Auto-translate only if the other field is empty
    if (translateFn && text && !localValue[lang === 'en' ? 'ar' : 'en']) {
      const translated = await translateFn(text, lang, lang === 'en' ? 'ar' : 'en');
      updated[lang === 'en' ? 'ar' : 'en'] = translated;
    }

    setLocalValue(updated);
    onChange({ target: { name, value: updated } });
  };

  return (
    <div className="input-field">
      {label && <label className="block mb-1">{label} {required && <span className="text-red-600">*</span>}</label>}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            id={`${name}-en`}
            type="text"
            value={localValue.en}
            required={required}
            onChange={(e) => handleChange('en', e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="English"
          />
        </div>

        <div className="flex-1">
          <input
            id={`${name}-ar`}
            type="text"
            dir="rtl"
            value={localValue.ar}
            required={required}
            onChange={(e) => handleChange('ar', e.target.value)}
            className="w-full border px-3 py-2 rounded text-right"
            placeholder="أدخل بالعربية"
          />
        </div>
      </div>
    </div>
  );
}

export default TranslatableInput;
