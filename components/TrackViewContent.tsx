"use client";

import { useEffect } from "react";
import { fbqTrack, KIT_CONTENT } from "@/lib/fbq";

// Fires a single Meta Pixel ViewContent event on mount (homepage / product page).
export function TrackViewContent() {
  useEffect(() => {
    fbqTrack("ViewContent", KIT_CONTENT);
  }, []);
  return null;
}
