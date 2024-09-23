import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { CurrencyControl } from "../../components/CurrencyControl";
import axios from "axios";
import "./index.css";
import { Currency } from "../../types";

const selectOptions = [
  { label: "Українська гривня", value: "UAH" },
  { label: "Доллар США", value: "USD" },
  { label: "Євро", value: "EUR" },
];

const useCurrencyRate = (sourceCurrency: string, targetCurrency: string) => {
  const [rate, setRate] = useState<number>(0);
  const [UAHCurrencies, setUAHCurrencis] = useState<Currency[]>([]);

  useEffect(() => {
    axios
      .get("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
      .then((response) => {
        setUAHCurrencis(response.data);
      });
  }, []);

  useEffect(() => {
    if (sourceCurrency === targetCurrency) {
      setRate(1);
    } else if (sourceCurrency === "UAH") {
      const UAHRate = UAHCurrencies.find((item) => item.cc === targetCurrency);
      setRate(1 / Number(UAHRate?.rate));
    } else if (targetCurrency === "UAH") {
      const UAHRate = UAHCurrencies.find((item) => item.cc === sourceCurrency);
      setRate(Number(UAHRate?.rate));
    } else {
      axios
        .get(
          `https://api.frankfurter.app/latest?from=${sourceCurrency}&to=${targetCurrency}`,
        )
        .then((response) => {
          setRate(response.data.rates[targetCurrency]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [sourceCurrency, targetCurrency, UAHCurrencies]);
  return rate;
};

export const Main = () => {
  const [targetValue, setTargetValue] = useState<string>("");
  const [sourceValue, setSourceValue] = useState<string>("");
  const [sourceCurrency, setSourceCurrency] = useState("UAH");
  const [targetCurrency, setTargetCurrency] = useState("USD");

  const rate = useCurrencyRate(sourceCurrency, targetCurrency);

  useEffect(() => {
    setTargetValue(sourceValue ? (Number(sourceValue) * rate).toFixed(2) : "");
  }, [rate]);

  const changeSourceValue = (value: string) => {
    setSourceValue(value);
    const newValue = Number(value) * rate;
    setTargetValue(newValue ? newValue.toFixed(2) : "");
  };

  const changeTargetValue = (value: string) => {
    setTargetValue(value);
    const newValue = Number(value) / rate;
    setSourceValue(newValue ? newValue.toFixed(2) : "");
  };

  return (
    <Layout>
      <CurrencyControl
        value={sourceValue}
        onChange={changeSourceValue}
        currencyOptions={selectOptions}
        currencyValue={sourceCurrency}
        onChangeCurrency={setSourceCurrency}
      />
      <CurrencyControl
        value={targetValue}
        onChange={changeTargetValue}
        currencyOptions={selectOptions}
        currencyValue={targetCurrency}
        onChangeCurrency={setTargetCurrency}
      />
    </Layout>
  );
};
