import React, {
  ChangeEvent,
  FocusEvent,
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import cn from "classnames";
import "./index.css";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  disabled?: boolean;
  invalid?: boolean;
  clearable?: boolean;
  width?: string;
  icon?: ReactNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      disabled,
      invalid,
      className,
      clearable,
      width,
      onClear,
      onChange,
      onBlur,
      icon,
      ...props
    },
    outerRef,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const ref = useMemo<React.RefObject<HTMLInputElement>>(
      () => (outerRef as React.RefObject<HTMLInputElement>) || inputRef,
      [outerRef, inputRef],
    );

    const InputClasses = useMemo(
      () =>
        cn("Input", {
          "Input-disabled": disabled,
          "Input-invalid": invalid,
          "Input-clearable": clearable,
        }),
      [disabled, invalid, clearable],
    );

    const onIconClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        ref.current?.focus();
      },
      [ref],
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
    };

    const handleBlure = (e: FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        onBlur(e);
      }
    };

    return (
      <div className={cn("input-wrapper", className)} style={{ width }}>
        <input
          {...props}
          className={InputClasses}
          disabled={disabled}
          style={{ width }}
          ref={ref}
          onChange={handleChange}
          onBlur={handleBlure}
        />
        <div className={"icon"} onClick={onIconClick}>
          {icon ? icon : null}
        </div>
      </div>
    );
  },
);
