import React from 'react';
import { useTranslation } from 'react-i18next';

import AutoPartsImg from '../assets/auto-parts.png';
import EngineImg from '../assets/engine.png';
import SteeringWheelsImg from '../assets/steering.png';

const CategoryCards = () => {
  const { t } = useTranslation();

  const categories = [
    {
      title: t('categoryCards.engine.title'),
      description: t('categoryCards.engine.description'),
      image: EngineImg,
    },
    {
      title: t('categoryCards.auto.title'),
      description: t('categoryCards.auto.description'),
      image: AutoPartsImg,
    },
    {
      title: t('categoryCards.steering.title'),
      description: t('categoryCards.steering.description'),
      image: SteeringWheelsImg,
    },
  ];

  return (
    <section className="py-10 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex flex-col-reverse py-2 md:flex-row bg-zinc-50 border rounded-xl overflow-hidden shadow-sm"
          >
            {/* Content Section */}
            <div className="flex-1 p-6 flex flex-col justify-center">
              <h3 className="text-xl font-semibold mb-2">{cat.title}</h3>
              <p className="text-sm text-zinc-600">{cat.description}</p>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-4/12 flex items-center justify-center">
              <img
                src={cat.image}
                alt={cat.title}
                className="object-contain w-[100px] h-full"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryCards;
