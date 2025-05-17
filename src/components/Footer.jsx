import { useTranslation } from "react-i18next";
import FacebookIcon from "../assets/social/facebook.svg";
import InstagramIcon from "../assets/social/instagram.svg";
import TwitterIcon from "../assets/social/x.svg";
import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-zinc-900 text-white text-sm">
      <div className="max-w-[1440px] mx-auto px-6 py-10 flex flex-col lg:flex-row justify-around gap-10">
        {/* Company Info */}
        <div className="lg:w-3/4">
          <h4 className="text-base font-semibold mb-3">{t("common.brandName")}</h4>
          <p className="text-xs leading-relaxed mb-2">{t("footer.description")}</p>
          <p className="text-xs" translate="no">© {new Date().getFullYear()} {t("footer.copyright")}</p>
        </div>

        {/* Contact Info */}
        <div className="lg:w-1/3">
          <h4 className="text-base font-semibold mb-3">{t("footer.contactUs")}</h4>
          <div className="text-xs space-y-3">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-red-400 mt-[2px]" />
              <p translate="no">{t("footer.address")}</p>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-red-400" />
              <span translate="no">{t("footer.phone")}</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-red-400" />
              <span translate="no">{t("footer.email")}</span>
            </div>
          </div>
        </div>

        {/* Quick Links & Social */}
        <div className="lg:w-1/3">
          <div className="space-y-3">
            <h4 className="text-base font-semibold mb-3">{t("footer.quickLinks")}</h4>
            <ul className="space-y-1 text-xs mb-4">
              <li><Link to="/store" className="hover:underline">{t("footer.store")}</Link></li>
              <li><Link to="/about-us" className="hover:underline">{t("footer.aboutUs")}</Link></li>
              <li><Link to="/contact-us" className="hover:underline">{t("footer.contact")}</Link></li>
            </ul>
          </div>

          <div className="flex gap-4 items-center mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <img src={FacebookIcon} alt="Facebook" className="w-4 h-4 filter invert hover:opacity-80 transition" />
            </a>
            <a href="https://www.instagram.com/t_shakili" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src={InstagramIcon} alt="Instagram" className="w-4 h-4 filter invert hover:opacity-80 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <img src={TwitterIcon} alt="Twitter" className="w-4 h-4 filter invert hover:opacity-80 transition" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
