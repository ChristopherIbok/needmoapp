"use client";

import { useEffect, useRef, useState } from "react";

export type VideoSource =
  | { type: "youtube"; videoId: string }
  | { type: "vimeo"; videoId: string }
  | { type: "self-hosted"; src: string; poster?: string };

interface VideoPlayerProps {
  source: VideoSource;
  title: string;
  /** Optional custom thumbnail URL (overrides YouTube auto-thumbnail) */
  thumbnail?: string;
  /** Called when user clicks play — useful for opening a modal instead */
  onPlayClick?: () => void;
  /** If true, renders the iframe immediately (for use inside a modal) */
  autoEmbed?: boolean;
  className?: string;
}

function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

function buildYouTubeSrc(videoId: string, autoplay = false): string {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    controls: "1",
    cc_load_policy: "1",
    color: "white",
    ...(autoplay ? { autoplay: "1" } : {}),
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

function buildVimeoSrc(videoId: string, autoplay = false): string {
  const params = new URLSearchParams({
    title: "0",
    byline: "0",
    portrait: "0",
    color: "FF6B35",
    ...(autoplay ? { autoplay: "1", muted: "1" } : {}),
  });
  return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
}

/** Reusable play-button SVG overlay */
function PlayButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="video-play-btn"
    >
      {/* Circle + triangle */}
      <svg
        width="72"
        height="72"
        viewBox="0 0 72 72"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="36" cy="36" r="36" fill="#FF6B35" />
        <polygon points="28,20 28,52 54,36" fill="white" />
      </svg>
    </button>
  );
}

export default function VideoPlayer({
  source,
  title,
  thumbnail,
  onPlayClick,
  autoEmbed = false,
  className = "",
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(autoEmbed);
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Respect prefers-reduced-motion — never autoplay
  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  // Lazy-load: only mount iframe when near viewport (IntersectionObserver)
  const [nearViewport, setNearViewport] = useState(autoEmbed);
  useEffect(() => {
    if (autoEmbed) return;
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [autoEmbed]);

  const handlePlay = () => {
    if (onPlayClick) {
      onPlayClick();
      return;
    }
    if (!prefersReduced) {
      setPlaying(true);
    }
  };

  // Resolve thumbnail URL
  const thumbSrc =
    thumbnail ??
    (source.type === "youtube" ? getYouTubeThumbnail(source.videoId) : undefined);

  // Resolve iframe src
  const iframeSrc = (() => {
    if (source.type === "youtube")
      return buildYouTubeSrc(source.videoId, playing && !autoEmbed);
    if (source.type === "vimeo")
      return buildVimeoSrc(source.videoId, playing && !autoEmbed);
    return null;
  })();

  return (
    <div
      ref={containerRef}
      className={`video-wrapper ${className}`}
      role="region"
      aria-label={`Video: ${title}`}
    >
      {/* Self-hosted video */}
      {source.type === "self-hosted" && (
        <video
          className="w-full h-full object-cover"
          poster={source.poster ?? thumbSrc}
          controls
          preload="metadata"
          playsInline
          title={title}
          aria-label={title}
        >
          <source src={source.src} type="video/mp4" />
          <p>Your browser does not support HTML5 video.</p>
        </video>
      )}

      {/* YouTube / Vimeo */}
      {source.type !== "self-hosted" && (
        <>
          {/* Show thumbnail + play button until user clicks */}
          {!playing && (
            <div className="video-thumbnail-wrapper">
              {thumbSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={thumbSrc}
                  alt={`Thumbnail for ${title}`}
                  className="video-thumbnail"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="video-thumbnail-placeholder" aria-hidden="true" />
              )}
              <PlayButton onClick={handlePlay} label={`Play video: ${title}`} />
            </div>
          )}

          {/* Iframe — only mounted when near viewport */}
          {playing && nearViewport && iframeSrc && (
            <div className="video-iframe-wrapper">
              {!loaded && (
                <div className="video-loading-spinner" aria-hidden="true">
                  <div className="spinner" />
                </div>
              )}
              <iframe
                src={iframeSrc}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                onLoad={() => setLoaded(true)}
                className={`video-iframe ${loaded ? "opacity-100" : "opacity-0"}`}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
