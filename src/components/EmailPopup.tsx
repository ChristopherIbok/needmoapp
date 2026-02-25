"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function EmailPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const hasSubscribed = localStorage.getItem("mailchimp-subscribed");
    if (hasSubscribed) return;

    const timer = setTimeout(() => {
      const hasClosed = sessionStorage.getItem("popup-closed");
      if (!hasClosed) {
        setIsOpen(true);
      }
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, doubleOptIn: true }), // true for double opt-in
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to subscribe");
      }

      setStatus("success");
      setMessage(data.message);
      localStorage.setItem("mailchimp-subscribed", "true");

      setTimeout(() => {
        setIsOpen(false);
        setStatus("idle");
      }, 4000);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("popup-closed", "true");
    setStatus("idle");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white">
            {status === "success"
              ? "🎉 Almost There!"
              : "Get Exclusive Updates"}
          </h2>

          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            {status === "success"
              ? "Please check your email to confirm your subscription!"
              : "Join our newsletter for marketing tips and exclusive offers."}
          </p>

          {status === "success" ? (
            <div className="text-center">
              <button
                onClick={handleClose}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (optional)"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
                disabled={status === "loading"}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
                disabled={status === "loading"}
              />

              {status === "error" && (
                <p className="text-sm text-red-500 text-center">{message}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 disabled:opacity-50"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe Now"}
              </button>

              <p className="text-xs text-center text-gray-500">
                By subscribing, you agree to our Privacy Policy and consent to
                receive emails.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
