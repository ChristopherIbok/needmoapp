"use client";

import { useEffect, useRef } from "react";
import VideoPlayer, { VideoSource } from "./VideoPlayer";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  source: VideoSource | null;
  title: string;
  description?: string;
  stats?: string[];
}

export default function VideoModal({
  isOpen,
  onClose,
  source,
  title,
  description,
  stats,
}: VideoModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Trap focus inside modal and lock body scroll
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      // Move focus to close button after paint
      requestAnimationFrame(() => closeButtonRef.current?.focus());
    } else {
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen || !source) return null;

  return (
    <div
      className="video-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Video: ${title}`}
      onClick={(e) => {
        // Close when clicking the backdrop (not the content)
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="video-modal-content">
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="video-modal-close"
          aria-label="Close video"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Video player — autoEmbed=true so iframe loads immediately */}
        <VideoPlayer
          source={source}
          title={title}
          autoEmbed
          className="video-modal-player"
        />

        {/* Info panel */}
        {(title || description || (stats && stats.length > 0)) && (
          <div className="video-modal-info">
            <h3 className="video-modal-title">{title}</h3>
            {description && (
              <p className="video-modal-description">{description}</p>
            )}
            {stats && stats.length > 0 && (
              <div className="video-modal-stats" aria-label="Project results">
                {stats.map((stat) => (
                  <span key={stat} className="video-modal-stat">
                    {stat}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
