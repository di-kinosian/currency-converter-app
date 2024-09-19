import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Currency } from "../../types";
import "./index.css";

export const Header = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  useEffect(() => {
    axios
      .get("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
      .then((response) => {
        setCurrencies(response.data);
      });
  }, []);

  const currenciesMap = useMemo<Record<string, Currency>>(
    () =>
      currencies.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.cc]: curr,
        }),
        {},
      ),
    [currencies],
  );

  return (
    <div className="header">
      <div className="header-content">
        <img
          className="header-logo"
          src="https://usense.com.ua/assets/images/usense-logo.svg"
          alt=""
        />

        <div className="header-currencies">
          <div className="currency">
            USD <span className="currency-rate">{currenciesMap.USD?.rate}</span>
          </div>
          <div className="currency-separator"></div>
          <div className="currency">
            EUR <span className="currency-rate">{currenciesMap.EUR?.rate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
