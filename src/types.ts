export interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

export type Currency = {
  cc: string;
  exchangedate: string;
  r030: number;
  rate: number;
  txt: string;
};
