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
type ExchangeRates = Record<string, number>;
const EXCHANGE_RATES_DEFAULT: ExchangeRates = {
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

function readCachedRates(): ExchangeRates | null {
  try {
    const cached = localStorage.getItem("exchangeRates");
    const ts = localStorage.getItem("ratesLastUpdated");
    if (!cached || !ts) return null;
    const hours = (Date.now() - parseInt(ts, 10)) / (1000 * 60 * 60);
    if (hours < 24) return JSON.parse(cached) as ExchangeRates;
    return null;
  } catch {
    return null;
  }
}

async function fetchRatesUSDBase(): Promise<ExchangeRates> {
  const cached = readCachedRates();
  if (cached) return cached;
  try {
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD", { cache: "no-store" });
    const data = await response.json();
    if (data && data.rates) {
      localStorage.setItem("exchangeRates", JSON.stringify(data.rates));
      localStorage.setItem("ratesLastUpdated", Date.now().toString());
      return data.rates as ExchangeRates;
    }
  } catch {
    // ignore; will fall back
  }
  return { ...EXCHANGE_RATES_DEFAULT };
}

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
  const [rates, setRates] = useState<ExchangeRates>(() => {
    if (typeof window === "undefined") return { ...EXCHANGE_RATES_DEFAULT };
    return readCachedRates() || { ...EXCHANGE_RATES_DEFAULT };
  });
  const [preferredCurrency, setPreferredCurrencyState] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("preferredCurrency");
  });

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const cached = typeof window !== "undefined" ? sessionStorage.getItem("userLocation") : null;
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as any;
        const code = (parsed.countryCode || parsed.country || "US") as string;
        const upper = code.toUpperCase();
        const info = CURRENCY_MAP[upper] || { currency: "USD", symbol: "$" };
        const region =
          parsed.city && parsed.countryName
            ? `${parsed.city}, ${parsed.countryName}`
            : REGION_NAMES[upper] || "your area";
        setLocationData({
          region,
          country: upper,
          currency: preferredCurrency || info.currency,
          currencySymbol: info.symbol,
          timezone: parsed.timezone || timezone,
          localTime: getLocalTime(parsed.timezone || timezone),
        });
        setLoading(false);
      } catch {}
    } else {
      const initial = buildLocationData(timezone);
      setLocationData({
        ...initial,
        currency: preferredCurrency || initial.currency,
      });
      setLoading(false);
    }

    const geolocate = () => {
      if (!("geolocation" in navigator)) {
        detectByIP();
        return;
      }
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            const resp = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
              { cache: "no-store" }
            );
            const data = await resp.json();
            const countryCode = (data.countryCode || "US").toUpperCase();
            const countryName = data.countryName || countryCode;
            const city = data.city || data.locality || "";
            const info = CURRENCY_MAP[countryCode] || { currency: "USD", symbol: "$" };
            const region = city && countryName ? `${city}, ${countryName}` : REGION_NAMES[countryCode] || "your area";
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const payload = {
              city,
              regionName: data.principalSubdivision || "",
              countryName,
              countryCode,
              timezone: tz,
              lat,
              lon,
            };
            sessionStorage.setItem("userLocation", JSON.stringify(payload));
            setLocationData({
              region,
              country: countryCode,
              currency: preferredCurrency || info.currency,
              currencySymbol: info.symbol,
              timezone: tz,
              localTime: getLocalTime(tz),
            });
          } catch {
            detectByIP();
          }
        },
        () => {
          detectByIP();
        },
        { maximumAge: 600000, timeout: 8000 }
      );
    };

    const detectByIP = async () => {
      try {
        const r1 = await fetch("https://ipapi.co/json/", { cache: "no-store" });
        if (r1.ok) {
          const d = await r1.json();
          const countryCode = (d.country_code || "US").toUpperCase();
          const countryName = d.country_name || countryCode;
          const city = d.city || "";
          const info = CURRENCY_MAP[countryCode] || { currency: "USD", symbol: "$" };
          const tz = d.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
          const region = city && countryName ? `${city}, ${countryName}` : REGION_NAMES[countryCode] || "your area";
          const payload = {
            city,
            regionName: d.region || d.region_code || "",
            countryName,
            countryCode,
            timezone: tz,
            lat: d.latitude || d.lat || null,
            lon: d.longitude || d.lon || null,
          };
          sessionStorage.setItem("userLocation", JSON.stringify(payload));
          setLocationData({
            region,
            country: countryCode,
            currency: preferredCurrency || info.currency,
            currencySymbol: info.symbol,
            timezone: tz,
            localTime: getLocalTime(tz),
          });
          setLoading(false);
          return;
        }
        throw new Error("ipapi failed");
      } catch {
        if (window.location.protocol === "http:") {
          try {
            const r2 = await fetch("http://ip-api.com/json/", { cache: "no-store" } as any);
            if (r2.ok) {
              const d = await r2.json();
              if (d.status === "success") {
                const countryCode = (d.countryCode || "US").toUpperCase();
                const countryName = d.country || countryCode;
                const city = d.city || "";
                const info = CURRENCY_MAP[countryCode] || { currency: "USD", symbol: "$" };
                const tz = d.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
                const region =
                  city && countryName ? `${city}, ${countryName}` : REGION_NAMES[countryCode] || "your area";
                const payload = {
                  city,
                  regionName: d.regionName || d.region || "",
                  countryName,
                  countryCode,
                  timezone: tz,
                  lat: d.lat || null,
                  lon: d.lon || null,
                };
                sessionStorage.setItem("userLocation", JSON.stringify(payload));
                setLocationData({
                  region,
                  country: countryCode,
                  currency: preferredCurrency || info.currency,
                  currencySymbol: info.symbol,
                  timezone: tz,
                  localTime: getLocalTime(tz),
                });
                setLoading(false);
                return;
              }
            }
          } catch {}
        }
        const fallback = buildLocationData(timezone);
        setLocationData({
          ...fallback,
          currency: preferredCurrency || fallback.currency,
        });
        setLoading(false);
      }
    };

    geolocate();

    const interval = setInterval(() => {
      setLocationData((prev) => ({
        ...prev,
        localTime: getLocalTime(prev.timezone || timezone),
      }));
    }, 60000);
    return () => clearInterval(interval);
  }, [preferredCurrency]);

  useEffect(() => {
    fetchRatesUSDBase().then((r) => setRates(r));
  }, []);

  const roundForDisplay = (value: number): number => {
    if (value < 100) return Math.round(value / 10) * 10;
    if (value < 1000) return Math.round(value / 50) * 50;
    return Math.round(value / 100) * 100;
  };

  const convertPrice = (usdPrice: number): string => {
    const rate = rates[locationData.currency] || EXCHANGE_RATES_DEFAULT[locationData.currency] || 1;
    const converted = usdPrice * rate;
    const rounded = roundForDisplay(converted);
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: locationData.currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(rounded);
    } catch {
      return `${locationData.currencySymbol}${Math.round(rounded).toLocaleString()}`;
    }
  };

  const setPreferredCurrency = (currency: string) => {
    setPreferredCurrencyState(currency);
    try {
      localStorage.setItem("preferredCurrency", currency);
    } catch {}
    setLocationData((prev) => ({
      ...prev,
      currency,
    }));
  };

  return { locationData, loading, convertPrice, setPreferredCurrency };
}
