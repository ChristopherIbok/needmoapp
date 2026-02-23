"use client";

import { useState, useEffect } from "react";

interface LocationData {
  region: string;
  country: string;
  currency: string;
  currencySymbol: string;
  timezone: string;
  localTime: string;
}

const CURRENCY_MAP: Record<string, { currency: string; symbol: string }> = {
  US: { currency: "USD", symbol: "$" },
  GB: { currency: "GBP", symbol: "£" },
  EU: { currency: "EUR", symbol: "€" },
  DE: { currency: "EUR", symbol: "€" },
  FR: { currency: "EUR", symbol: "€" },
  IT: { currency: "EUR", symbol: "€" },
  ES: { currency: "EUR", symbol: "€" },
  NL: { currency: "EUR", symbol: "€" },
  CA: { currency: "CAD", symbol: "CA$" },
  AU: { currency: "AUD", symbol: "A$" },
  NZ: { currency: "NZD", symbol: "NZ$" },
  JP: { currency: "JPY", symbol: "¥" },
  CN: { currency: "CNY", symbol: "¥" },
  IN: { currency: "INR", symbol: "₹" },
  BR: { currency: "BRL", symbol: "R$" },
  MX: { currency: "MXN", symbol: "MX$" },
  ZA: { currency: "ZAR", symbol: "R" },
  NG: { currency: "NGN", symbol: "₦" },
  GH: { currency: "GHS", symbol: "₵" },
  KE: { currency: "KES", symbol: "KSh" },
  AE: { currency: "AED", symbol: "AED" },
  SA: { currency: "SAR", symbol: "SAR" },
  SG: { currency: "SGD", symbol: "S$" },
  HK: { currency: "HKD", symbol: "HK$" },
};

// Approximate exchange rates (USD base)
const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  GBP: 0.79,
  EUR: 0.92,
  CAD: 1.36,
  AUD: 1.53,
  NZD: 1.63,
  JPY: 149.5,
  CNY: 7.24,
  INR: 83.1,
  BRL: 4.97,
  MXN: 17.2,
  ZAR: 18.6,
  NGN: 1580,
  GHS: 12.5,
  KES: 130,
  AED: 3.67,
  SAR: 3.75,
  SGD: 1.34,
  HKD: 7.82,
};

const REGION_NAMES: Record<string, string> = {
  US: "North America",
  CA: "North America",
  GB: "the United Kingdom",
  AU: "Australia",
  NZ: "New Zealand",
  DE: "Germany",
  FR: "France",
  IT: "Italy",
  ES: "Spain",
  NL: "the Netherlands",
  JP: "Japan",
  CN: "China",
  IN: "India",
  BR: "Brazil",
  MX: "Mexico",
  ZA: "South Africa",
  NG: "Nigeria",
  GH: "Ghana",
  KE: "Kenya",
  AE: "the UAE",
  SA: "Saudi Arabia",
  SG: "Singapore",
  HK: "Hong Kong",
};

function getLocalTime(timezone: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
    }).format(new Date());
  } catch {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
    }).format(new Date());
  }
}

function detectCountryFromTimezone(timezone: string): string {
  if (timezone.includes("London") || timezone.includes("Dublin")) return "GB";
  if (timezone.includes("Paris") || timezone.includes("Berlin") || timezone.includes("Rome") || timezone.includes("Madrid")) return "EU";
  if (timezone.includes("Sydney") || timezone.includes("Melbourne")) return "AU";
  if (timezone.includes("Toronto") || timezone.includes("Vancouver")) return "CA";
  if (timezone.includes("Tokyo")) return "JP";
  if (timezone.includes("Shanghai") || timezone.includes("Beijing")) return "CN";
  if (timezone.includes("Kolkata") || timezone.includes("Mumbai")) return "IN";
  if (timezone.includes("Sao_Paulo")) return "BR";
  if (timezone.includes("Mexico_City")) return "MX";
  if (timezone.includes("Johannesburg")) return "ZA";
  if (timezone.includes("Lagos") || timezone.includes("Abuja")) return "NG";
  if (timezone.includes("Accra")) return "GH";
  if (timezone.includes("Nairobi")) return "KE";
  if (timezone.includes("Dubai")) return "AE";
  if (timezone.includes("Riyadh")) return "SA";
  if (timezone.includes("Singapore")) return "SG";
  if (timezone.includes("Hong_Kong")) return "HK";
  if (timezone.includes("Auckland")) return "NZ";
  return "US";
}

function buildLocationData(timezone: string): LocationData {
  const detectedCountry = detectCountryFromTimezone(timezone);
  const currencyInfo = CURRENCY_MAP[detectedCountry] || { currency: "USD", symbol: "$" };
  const region = REGION_NAMES[detectedCountry] || "your area";
  const localTime = getLocalTime(timezone);

  return {
    region,
    country: detectedCountry,
    currency: currencyInfo.currency,
    currencySymbol: currencyInfo.symbol,
    timezone,
    localTime,
  };
}

export function useLocation() {
  const [locationData, setLocationData] = useState<LocationData>(() => ({
    region: "your area",
    country: "US",
    currency: "USD",
    currencySymbol: "$",
    timezone: "UTC",
    localTime: "",
  }));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const data = buildLocationData(timezone);

    setLocationData(data);
    setLoading(false);

    // Update time every minute
    const interval = setInterval(() => {
      setLocationData((prev) => ({
        ...prev,
        localTime: getLocalTime(timezone),
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const convertPrice = (usdPrice: number): string => {
    const rate = EXCHANGE_RATES[locationData.currency] || 1;
    const converted = Math.round(usdPrice * rate);

    if (locationData.currency === "JPY" || locationData.currency === "KES" || locationData.currency === "NGN") {
      return `${locationData.currencySymbol}${converted.toLocaleString()}`;
    }

    return `${locationData.currencySymbol}${converted.toLocaleString()}`;
  };

  return { locationData, loading, convertPrice };
}
