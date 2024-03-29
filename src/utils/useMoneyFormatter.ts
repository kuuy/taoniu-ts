import { map, active } from './currencies'
import BigNumber from 'bignumber.js'
import { toHumanNumber } from './strings'

export type MoneyFormatterOptions = {
  currency?: any;
  symbol?: string;
  compression?: number;
  decPlaces?: number;
  maxFractionDigits?: number;
  showCurrency?: boolean;
  toHumanNumber?: boolean;
};

export const toBigNumber = (
  inputNumber: BigNumber | number | string = 0,
  opts: MoneyFormatterOptions = {}
): BigNumber => {
  if (typeof inputNumber === "string") inputNumber = Number(inputNumber);
  if (typeof inputNumber === "number") {
    if (isNaN(inputNumber) || !isFinite(inputNumber)) return new BigNumber(0);
  }
  let number = new BigNumber(inputNumber);
  if (isNaN(number.toNumber())) number = new BigNumber(0);
  let {
    currency,
    symbol,
    compression = 0,
    decPlaces,
    maxFractionDigits = 2,
    showCurrency = false,
  } = opts;

  if (decPlaces === undefined) decPlaces = maxFractionDigits || 0;

  if (currency && !compression) {
    const defaultCurrency = active();
    const currencies = map();
    const currencyData = currencies[currency] || currencies[defaultCurrency];
    compression = currencyData.compression;
    symbol = currencyData.symbol;
  }
  number = number.shiftedBy(-compression);
  return number;
};

const formatter = (
  inputNumber: BigNumber | number | string = 0,
  opts: MoneyFormatterOptions = {}
): string => {
  if (typeof inputNumber === "string") inputNumber = Number(inputNumber);
  if (typeof inputNumber === "number") {
    if (isNaN(inputNumber) || !isFinite(inputNumber)) return `${inputNumber}`;
  }
  let number = new BigNumber(inputNumber);
  if (isNaN(number.toNumber())) number = new BigNumber(0);
  let {
    currency,
    symbol,
    compression = 0,
    decPlaces,
    maxFractionDigits = 2,
    showCurrency = false,
  } = opts;

  if (decPlaces === undefined) decPlaces = maxFractionDigits || 0;

  if (currency && !compression) {
    const defaultCurrency = active();
    const currencies = map();
    const currencyData = currencies[currency] || currencies[defaultCurrency];
    compression = currencyData.compression;
    symbol = currencyData.symbol;
  }
  number = number.shiftedBy(-compression);

  if (opts.toHumanNumber) {
    return `${toHumanNumber(number, decPlaces)}${
      showCurrency ? ` ${symbol ?? currency ?? ""}` : ""
    }`.trim();
  }

  if (decPlaces <= 2) {
    return number.toFixed(decPlaces).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  return number.toFixed(decPlaces);
};

export default function useMoneyFormatter(options: MoneyFormatterOptions = {}) {
  return (
    number: number | string | undefined | BigNumber,
    adhocOptions: MoneyFormatterOptions = {}
  ) => {
    return formatter(number, { ...options, ...adhocOptions });
  };
}
