
import { useTranslation } from "react-i18next"
import NoStockImg from "../assets/no-stock.png"

const ProductFallBack = () => {
    const{ t } = useTranslation()

    return (
        <div className="flex flex-col items-center justify-center text-center py-20 text-gray-600">
            <img
                src={NoStockImg}
                alt="No Stock"
                className="w-32 h-32 mb-4 opacity-70"
            />
            <h2 className="text-xl font-semibold"> {t('fallback.heading')} </h2>
            <p className="mt-2 text-sm">
                 {t('fallback.description')}
            </p>
        </div>
    )
}

export default ProductFallBack