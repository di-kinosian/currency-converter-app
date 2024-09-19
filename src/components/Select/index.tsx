import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./index.css";
import { Option } from "../../types";
import { Input } from "../Input/index";
import classNames from "classnames";
import ChevronDownIcon from "../../icons/ChevronIcon";

export interface SelectProps {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  invalid?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value = "UAH",
  onChange,
  className,
  placeholder,
  invalid,
}) => {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [selectedOptionValue, setSelectedOptionValue] = useState(value || null);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedOptionValue(value);
    }
  }, [value]);

  const openSelect = useCallback(() => {
    setIsSelectOpen(true);
  }, []);

  const onSelectItem = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      const newValue = e.currentTarget.dataset.itemValue || "";
      onChange?.(newValue);
      setSelectedOptionValue(newValue);
      setIsSelectOpen(false);
    },
    [onChange],
  );

  const selectedOptionLabel = useMemo(() => {
    const selectedOption = options.find((el) => {
      return el.value === selectedOptionValue;
    });
    return selectedOption?.label || "";
  }, [options, selectedOptionValue]);

  const getListItemClasses = useCallback(
    (value: string) => {
      return classNames("selectListItem", {
        "selectListItem-isChosen": selectedOptionValue === value,
      });
    },
    [selectedOptionValue],
  );

  const wrapperClasses = classNames(
    "componentWrapper",
    {
      "componentWrapper-selectOpen": isSelectOpen,
      "componentWrapper-selectClose": !isSelectOpen,
    },
    className,
  );

  return (
    <div className={wrapperClasses} ref={ref}>
      <Input
        className="inputWrapper"
        placeholder={placeholder}
        onFocus={openSelect}
        value={selectedOptionLabel}
        readOnly
        invalid={invalid}
        icon={<ChevronDownIcon />}
      />
      {isSelectOpen ? (
        <ul className="optionsList">
          {options.map((el) => (
            <li
              className={getListItemClasses(el.value)}
              data-item-value={el.value}
              key={el.value}
              onClick={onSelectItem}
            >
              {el.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
