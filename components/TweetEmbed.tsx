"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

declare global {
  interface Window {
    twttr?: { widgets?: { load?: (el?: HTMLElement | null) => void } };
  }
}

const SCRIPT_ID = "twitter-wjs";

export function TweetEmbed({ url, className = "" }: { url: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const render = () => {
      window.twttr?.widgets?.load?.(ref.current);
      // Give the widget a beat to swap in; if it did, mark loaded.
      window.setTimeout(() => {
        if (ref.current?.querySelector("twitter-widget, iframe")) setLoaded(true);
      }, 1500);
    };

    if (window.twttr?.widgets) {
      render();
      return;
    }
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", render);
      return () => existing.removeEventListener("load", render);
    }
    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.src = "https://platform.twitter.com/widgets.js";
    s.async = true;
    s.charset = "utf-8";
    s.onload = render;
    document.body.appendChild(s);
  }, [url]);

  return (
    <div className={className}>
      <div ref={ref} className="overflow-hidden rounded-2xl [&_.twitter-tweet]:!my-0">
        <blockquote
          className="twitter-tweet"
          data-theme="dark"
          data-dnt="true"
          data-conversation="none"
          data-align="center"
        >
          <a href={url}>{/* hydrated into the full post by widgets.js */}</a>
        </blockquote>
      </div>

      {/* Fallback shown until (or if) the embed doesn't hydrate */}
      {!loaded && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80"
        >
          View this post on X <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
    </div>
  );
}
