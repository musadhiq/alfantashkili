import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateFilters } from '../features/products/filtersSlice';
import apiClient from '../lib/apiService';
import { useTranslation } from 'react-i18next';

function AdvancedSearchFilter({ withClearButton = false }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { categories } = useSelector((state) => state.categories);

    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [variants, setVariants] = useState([]);

    const [localCategory, setLocalCategory] = useState('');
    const [localBrand, setLocalBrand] = useState('');
    const [localModel, setLocalModel] = useState('');
    const [localVariant, setLocalVariant] = useState('');
    const [localYear, setLocalYear] = useState('');

    // Set filters from URL params
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const initial = {
            category: params.get('category') || '',
            brand: params.get('brand') || '',
            model: params.get('model') || '',
            variant: params.get('varient') || '',
            year: params.get('year') || ''
        };

        setLocalCategory(initial.category);
        setLocalBrand(initial.brand);
        setLocalModel(initial.model);
        setLocalVariant(initial.variant);
        setLocalYear(initial.year);

        dispatch(updateFilters(initial));
    }, [location.search, dispatch]);

    useEffect(() => {
        fetchBrands();
    }, []);

    useEffect(() => {
        if (localBrand) fetchModels();
        else setModels([]);
        setLocalModel('');
        setLocalVariant('');
        setVariants([]);
    }, [localBrand]);

    useEffect(() => {
        if (localModel) fetchVariants();
        else setVariants([]);
        setLocalVariant('');
    }, [localModel]);

    const fetchBrands = async () => {
        try {
            const res = await apiClient.get(`/api/v1/brands`);
            const data = [...new Set(res.data.contents)];
            setBrands(data || []);
        } catch (err) {
            console.error(err);
            setBrands([]);
        }
    };

    const fetchModels = async () => {
        try {
            const res = await apiClient.get(`/api/v1/products/grouped?groupBy=model&brand=${localBrand}&orderBy=createdAt`);
            const data = [...new Set(res.data.contents)];
            setModels(data || []);
        } catch (err) {
            console.error(err);
            setModels([]);
        }
    };

    const fetchVariants = async () => {
        try {
            const res = await apiClient.get(`/api/v1/products/grouped?groupBy=variant&brand=${localBrand}&model=${localModel}&orderBy=createdAt`);
            const data = [...new Set(res.data.contents)];
            setVariants(data || []);
        } catch (err) {
            console.error(err);
            setVariants([]);
        }
    };

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (localCategory) params.append('category', localCategory);
        if (localBrand) params.append('brand', localBrand);
        if (localModel) params.append('model', localModel);
        if (localVariant) params.append('varient', localVariant);
        if (localYear) params.append('year', localYear);

        dispatch(updateFilters({
            category: localCategory,
            brand: localBrand,
            model: localModel,
            variant: localVariant,
            year: localYear,
        }));

        navigate(`/store?${params.toString()}`);
    };

    const handleClear = () => {
        setLocalCategory('');
        setLocalBrand('');
        setLocalModel('');
        setLocalVariant('');
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
            <p className="text-sm text-zinc-600 mb-6">{t('advancedFilter.subtitle')}</p>

            <div className="space-y-6 mb-8 mt-10">
                <select
                    value={localCategory}
                    onChange={(e) => setLocalCategory(e.target.value)}
                    className="w-full border rounded-md px-3 py-3 text-sm focus:ring-2 focus:ring-red-500"
                >
                    <option value="">{t('category.label')}</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                </select>

                <select
                    value={localBrand}
                    onChange={(e) => setLocalBrand(e.target.value)}
                    className="w-full border rounded-md px-3 py-3 text-sm focus:ring-2 focus:ring-red-500"
                >
                    <option value="">{t('brand.label')}</option>
                    {brands.map((b) => (
                        <option key={b.id} value={b.name} translate="no">{b.name}</option>
                    ))}
                </select>

                <select
                    value={localModel}
                    onChange={(e) => {
                        if (!localBrand) {
                            alert(t('validation.selectBrand'));
                            return;
                        }
                        setLocalModel(e.target.value);
                    }}
                    className="w-full border rounded-md px-3 py-3 text-sm focus:ring-2 focus:ring-red-500"
                >
                    <option value="">{t('model.label')}</option>
                    {models.map((m) => (
                        <option key={m} value={m} translate="no">{m}</option>
                    ))}
                </select>

                <div className="flex gap-2">
                    <select
                        value={localVariant}
                        onChange={(e) => {
                            if (!localModel) {
                                alert(t('validation.selectModel'));
                                return;
                            }
                            setLocalVariant(e.target.value);
                        }}
                        className="w-full border rounded-md px-3 py-3 text-sm focus:ring-2 focus:ring-red-500"
                    >
                        <option value="">{t('variant.label')}</option>
                        {variants.map((v) => (
                            <option key={v} value={v} translate="no">{v}</option>
                        ))}
                    </select>

                    <input
                        type="text"
                        value={localYear}
                        onChange={(e) => setLocalYear(e.target.value)}
                        placeholder={t('year.label')}
                        className="w-full border rounded-md px-3 py-3 text-sm focus:ring-2 focus:ring-red-500"
                    />
                </div>
            </div>

            <button
                onClick={handleSearch}
                className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-3 rounded-md transition"
            >
                {t('search.button')}
            </button>

            {withClearButton && (
                <button
                    onClick={handleClear}
                    className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-sm font-medium py-3 rounded-md transition"
                >
                    {t('clear.button')}
                </button>
            )}
        </div>
    );
}

export default AdvancedSearchFilter;
