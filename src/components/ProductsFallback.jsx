
import NoStockImg from "../assets/no-stock.png"

const ProductFallBack = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20 text-gray-600">
            <img
                src={NoStockImg}
                alt="No Stock"
                className="w-32 h-32 mb-4 opacity-70"
            />
            <h2 className="text-xl font-semibold">We're updating our stocks</h2>
            <p className="mt-2 text-sm">
                Please check back later. New products will be available soon!
            </p>
        </div>
    )
}

export default ProductFallBack