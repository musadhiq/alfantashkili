import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilters } from '../../features/products/filtersSlice';

const MIN_VISIBLE_ITEMS = 15;

const CategoryFilter = ({ type = 'chip', handleValueChange }) => {
  const { categories = [] } = useSelector((state) => state.categories);
  const { category } = useSelector((state) => state.filters);
  const [active, setActive] = useState('All');
  const scrollContainerRef = useRef(null);
  const dispatch = useDispatch()

  useEffect(() => {
    setActive(category || 'All')
  }, [category])

  const setFilter = (label) => () => {
    if (handleValueChange) {
      handleValueChange(label)
    }
    if (label == 'All') {
      dispatch(updateFilters({ category: '' }))
      setActive('All')
      return
    }
    dispatch(updateFilters({ category: label }))
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 200;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const renderCategoryButton = (label, isActive, key) => {
    return (
      <button
        key={key}
        onClick={setFilter(label)}
        className={`whitespace-nowrap px-5 py-2 transition-all duration-300 shrink-0 ${type === 'chip'
          ? `bg-gray-100 hover:bg-gray-200 rounded-full text-sm ${isActive ? 'bg-gray-300 font-medium' : ''
          }`
          : `relative text-sm font-medium ${isActive ? 'text-red-500' : 'text-gray-600 hover:text-gray-800'
          }`
          }`}
      >
        {label}
        {type === 'tab' && isActive && (
          <span className="absolute -bottom-[1px] left-0 right-0 h-0.5 bg-red-500 rounded-full"></span>
        )}
      </button>
    );
  };

  const renderPlaceholder = (key) => (
    <div
      key={`placeholder-${key}`}
      className="w-[80px] h-[36px] bg-gray-200 rounded-full animate-pulse shrink-0"
    />
  );

  const realItems = categories.map((cat, i) =>
    renderCategoryButton(cat.name, active === cat.name, i)
  );

  const placeholdersNeeded =
    categories.length < MIN_VISIBLE_ITEMS
      ? MIN_VISIBLE_ITEMS - categories.length
      : 0;

  const placeholders = Array.from({ length: placeholdersNeeded }).map((_, i) =>
    renderPlaceholder(i)
  );

  return (
    <div className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-4 py-3 relative">
        {/* Scroll buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white shadow-md rounded-full hidden md:flex"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide items-center px-6 md:px-10 scroll-smooth"
        >
          {renderCategoryButton('All', active === 'All', 'all')}
          {realItems}
          {placeholders}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white shadow-md rounded-full hidden md:flex"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CategoryFilter;
