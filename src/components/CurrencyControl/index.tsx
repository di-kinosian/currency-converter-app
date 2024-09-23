import React, { ChangeEvent, FocusEvent } from "react";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { Option } from "../../types";
import "./index.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  currencyOptions: Option[];
  currencyValue: string;
  onChangeCurrency: (value: string) => void;
};

export const CurrencyControl: React.FC<Props> = ({
  value,
  onChange,
  onBlur,
  currencyOptions: options,
  currencyValue: currency,
  onChangeCurrency,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    onBlur?.(e.target.value);
  };
  return (
    <div className="currency-control">
      <Input
        type="number"
        value={value}
        className="currency-input"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Select
        options={options}
        value={currency}
        onChange={onChangeCurrency}
        className="currency-select"
      />
    </div>
  );
};
