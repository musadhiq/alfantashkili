import {
    Wrench,
    ShieldCheck,
    Truck,
    Users,
    MapPin,
    Phone,
    Mail,
  } from "lucide-react";
import { useTranslation } from "react-i18next";
  
  const AboutUs = () => {
      const { t } = useTranslation();

    return (
      <div className="max-w-[1440px] mx-auto px-6 py-16 text-zinc-800">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{t("about.aboutTitle")} <span className="text-red-600">{t("common.brandName")}</span></h1>
        <p className="text-base text-zinc-600 max-w-3xl mb-12 leading-relaxed">
           <strong>{t("common.brandName")}</strong>, {t("about.aboutDescription")}
        </p>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div className="flex items-start gap-4">
            <Wrench className="w-6 h-6 text-red-500 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-1">{t("about.features.genuineParts.title")}</h3>
              <p className="text-sm text-zinc-600">
                {t("about.features.genuineParts.description")}
              </p>
            </div>
          </div>
  
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-red-500 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-1"> {t("about.features.trustedQuality.title")}</h3>
              <p className="text-sm text-zinc-600">
                 {t("about.features.trustedQuality.description")}
              </p>
            </div>
          </div>
  
          <div className="flex items-start gap-4">
            <Users className="w-6 h-6 text-red-500 mt-1" />
            <div>
               <h3 className="font-semibold text-lg mb-1"> {t("about.features.customerFirst.title")}</h3>
              <p className="text-sm text-zinc-600">
                 {t("about.features.customerFirst.description")}
              </p>
            </div>
          </div>
        </div>
  
        <div className="bg-zinc-100 p-6 rounded-md shadow-sm space-y-3">
          <h2 className="text-xl font-semibold mb-2">{t("about.visitWarehouse.title")}</h2>
          <div className="flex items-center gap-2 text-sm text-zinc-700">
            <MapPin className="w-4 h-4 text-red-500" />
            <span>{t("about.visitWarehouse.address")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-700">
            <Phone className="w-4 h-4 text-red-500" />
            <span>+968 9413 0119</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-700">
            <Mail className="w-4 h-4 text-red-500" />
            <span>alfantashkili@gmail.com</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default AboutUs;
  