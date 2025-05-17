import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="flex items-center space-x-2">
      <select
        id="lang-select"
        value={i18n.language}
        onChange={handleChange}
        className="px-2 py-1 text-xs rounded-md border border-gray-300 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        <option value="en">English</option>
        <option value="ar">العربية</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
