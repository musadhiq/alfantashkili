import React, { useState, useEffect, useMemo } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import debounce from 'lodash/debounce';
import apiClient from "../lib/apiService";

const CreateSelector = ({ onChange, value: selectedValue, name, label, api, query = null, disabled = false }) => {
    const [options, setOptions] = useState([]);

    const formattedValue = useMemo(() => {
        if (!selectedValue) return null;
        const matched = options.find((opt) => opt.value === selectedValue);
        return matched || { label: selectedValue, value: selectedValue };
      }, [selectedValue, options]);
      

    useEffect(() => {
        if (disabled) {
            setOptions([]);
            return;
        }
        const fetchInitialOptions = async () => {
            try {
                const res = await apiClient.get(`${api}${query ? '?' + query : ''}`);
                const data = res.data.contents || [];
                const options = data.map(item => ({
                    label: item.name,
                    value: item.name,
                }));
                setOptions(options);
            } catch (error) {
                console.error('Failed to load initial options', error);
            }
        };
    
        fetchInitialOptions();
    }, [disabled, query, api]);
    

    // Debounced async loader
    const loadOptions = async (inputValue) => {
        try {
            let q = inputValue ? `?search=${inputValue}` : '';
            if (query) {
                q = inputValue ? `?search=${inputValue}&${query}` : `?${query}`;
            }

            const res = await apiClient.get(`${api}${q}`);
            const data = res.data.contents || [];

            return data.map(item => ({
                label: item.name,
                value: item.name,
            }));
        } catch (error) {
            console.error('Failed to load options', error);
            return [];
        }
    };

    const debouncedLoadOptions = useMemo(
        () => debounce(loadOptions, 200),
        [api, query]
      );

    const handleCreate = async (inputValue) => {
        const trimmedValue = inputValue?.trim();
        if (!trimmedValue) return;
      
        const newOption = {
          label: trimmedValue,
          value: trimmedValue,
        };
      
        // Append the new option to the existing options
        setOptions((prev) => [...prev, newOption]);
      
        // Trigger the onChange with the new value
        onChange({
          target: {
            name,
            value: trimmedValue,
          },
        });
      };
      

    const handleChange = (selectedOption) => {
        onChange({
            target: {
                name,
                value: selectedOption?.value || null,
            }
        });
    };

    return (
        <div className='input-field'>
            {label && <label htmlFor={name}>{label}</label>}
            <AsyncCreatableSelect
                cacheOptions
                defaultOptions={options}
                loadOptions={debouncedLoadOptions}
                onCreateOption={handleCreate}
                onChange={handleChange}
                value={formattedValue}
                name={name}
                isDisabled={disabled}
                placeholder="Select or create"
                styles={{
                    input: (base) => ({
                      ...base,
                      fontSize: '13px',
                    })
                }}
            />
            <p className="info text-xs text-gray-500">to create a new {label} type it and enter space to see create option</p>
        </div>
    );
};

export default CreateSelector;
