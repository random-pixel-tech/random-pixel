import React, { useState } from 'react';
import { Text, VStack } from '@gluestack-ui/themed';

interface DropdownOption {
  label: string;
  value: string;
}

const SelectDropdown: React.FC<{
  label: string;
  options: DropdownOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}> = ({ label, options, defaultValue, onChange }) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue || '');

  const handleValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <VStack mb="$2">
      <Text mb="$0.5" fontSize="$xs">{label}</Text>
      <select
        value={selectedValue}
        onChange={handleValueChange}
        style={{ width: 'full', backgroundColor: '##9F83EB' }}
      >
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </VStack>
  );
};

export default SelectDropdown;