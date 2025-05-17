import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateFilters } from '../features/products/filtersSlice';
import apiClient from '../lib/apiService';
import { useTranslation } from 'react-i18next';


const priceOptions = [
    { label: 'Below 500', value: [0, 500] },
    { label: '500 – 1000', value: [500, 1000] },
    { label: '1000 – 5000', value: [1000, 5000] },
    { label: 'Above 5000', value: [5000, 100000] },
];


function AdvancedSearchFilter({ withClearButton = false }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { categories } = useSelector((state) => state.categories);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [varients, setVarients] = useState([]);
    // Local component state for form fields
    const [localCategory, setLocalCategory] = useState('');
    const [localBrand, setLocalBrand] = useState('');
    const [localModel, setLocalModel] = useState('');
    const [localVarient, setLocalVarient] = useState('');
    const [localYear, setLocalYear] = useState('');
    // const [localPriceRange, setLocalPriceRange] = useState([0, 1000]);

    // Initialize from URL on mount
    useEffect(() => {
        const params = new URLSearchParams(location.search);

        const initialCategory = params.get('category') || '';
        const initialBrand = params.get('brand') || '';
        const initialModel = params.get('model') || '';
        const initialVarient = params.get('varient') || '';
        const initialYear = params.get('year') || '';



        setLocalCategory(initialCategory);
        setLocalBrand(initialBrand);
        setLocalModel(initialModel);
        setLocalVarient(initialVarient);
        setLocalYear(initialYear);

        dispatch(updateFilters({
            category: initialCategory,
            brand: initialBrand,
            model: initialModel,
            variant: initialVarient,
            year: initialYear,
        }));
    }, [location.search, dispatch]);

    useEffect(() => {
        fetchBrands().then((data) => {
            setBrands(data);
        });
    }, []);

    useEffect(() => {
        if (!localBrand) {
            setModels([]);
            return;
        }
        fetchModels()
    }, [localBrand]);


    useEffect(() => {
        if (!localModel) {
            setVarients([]);
            return;
        }
        fetchVarients()
    }, [localModel]);



    const fetchBrands = async () => {
        try {
            const response = await apiClient.get(`/api/v1/brands`);
            const data = response.data.contents || [];
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const fetchModels = async () => {
        try {
            const query = `?groupBy=model&brand=${localBrand}`
            const data = await getProductGrouped(query)
            setModels(data.contents || [])
        } catch (error) {
            console.error(error);
            setModels([])
        }
    };

    const fetchVarients = async () => {
        try {
            const query = `?groupBy=variant&brand=${localBrand}&model=${localModel}`
            const data = await getProductGrouped(query)
            setVarients(data.contents || [])
        } catch (error) {
            console.error(error);
            setVarients([])
        }
    };

    const getProductGrouped = async (query) =>{
        try{
            const response = await apiClient.get(`/api/v1/products/grouped${query}&orderBy=createdAt`);
            return response.data;
        }catch(error){
            console.error(error)
            return [];
        }
    }

    const handleSearch = () => {
        const params = new URLSearchParams();

        if (localCategory) params.append('category', localCategory);
        if (localBrand) params.append('brand', localBrand);
        if (localModel) params.append('model', localModel);
        if (localVarient) params.append('varient', localVarient);
        if (localYear) params.append('year', localYear);

        // Dispatch to Redux
        dispatch(updateFilters({
            category: localCategory,
            brand: localBrand,
            model: localModel,
            variant: localVarient,
            year: localYear,
        }));

        // Navigate with URL params
        navigate(`/store?${params.toString()}`);
    };

    const handleClear = () => {
        setLocalCategory('');
        setLocalBrand('');
        setLocalModel('');
        setLocalVarient('');
        setLocalYear('');

        dispatch(updateFilters({
            category: '',
            brand: '',
            model: '',
            variant: '',
            year: '',
        }));
        navigate('/store');
    };


    return (
        <div className="bg-white border rounded-xl shadow-sm p-6 h-auto">
            <h3 className="text-lg font-semibold mb-2">{t('advancedFilter.title')}</h3>
            <p className="text-sm text-zinc-600 mb-6">
                {t('advancedFilter.subtitle')}
            </p>

            <div className="space-y-6 mb-8 mt-10">
                <select
                    value={localCategory}
                    onChange={(e) => setLocalCategory(e.target.value)}
                    className="w-full border border-zinc-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    <option value="">{t('category.label')}</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                </select>
                <select
                    value={localBrand}
                    onChange={(e) => setLocalBrand(e.target.value)}
                    className="w-full border border-zinc-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    <option value="">{t('brand.label')}</option>
                    {brands.map((b) => (
                        <option key={b.id} value={b.name} translate="no">{b.name}</option>
                    ))}
                </select>

                <select
                    value={localModel}
                    onChange={(e) => setLocalModel(e.target.value)}
                    className="w-full border border-zinc-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    <option value="">{t('model.label')}</option>
                    {models.map((m) => (
                        <option key={m} value={m} translate="no">{m}</option>
                    ))}
                </select>

                <div className="flex gap-1">

                <select
                    value={localVarient}
                    onChange={(e) => setLocalVarient(e.target.value)}
                    className="w-full border border-zinc-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    <option value="">{t('variant.label')}</option>
                    {varients.map((v) => (
                        <option key={v} value={v} translate="no">{v}</option>
                    ))}
                </select>
                    <input
                        type="text"
                        value={localYear}
                        onChange={(e) => setLocalYear(e.target.value)}
                        className="w-full border border-zinc-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder={t('year.label')}
                    />
                </div>


            </div>

            <button
                onClick={handleSearch}
                className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-3 rounded-md transition"
            >
                {t('search.button')}
            </button>
            {withClearButton && <button
                onClick={handleClear}
                className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-sm font-medium py-3 rounded-md transition"
            >
                Clear Filters
            </button>}
        </div>
    );
}

export default AdvancedSearchFilter;
