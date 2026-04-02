"use client";

import { useEffect, useRef } from "react";

export default function ReviewsWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function getPageSizeForWidth(width: number) {
      if (width < 450) return 1;
      if (width < 675) return 2;
      if (width < 918) return 3;
      if (width < 1144) return 4;
      return 5;
    }

    function setIframeSrc() {
      const iframe = iframeRef.current;
      const container = containerRef.current;
      if (!iframe || !container) return;

      const width = container.offsetWidth;
      if (width === 0) return;

      const pageSize = getPageSizeForWidth(width);
      const expectedSrc =
        "https://www.localmarketingmanager.com/api/reviews/french-roofing-review-widget?pageSize=" +
        pageSize;

      if (iframe.src !== expectedSrc) {
        iframe.src = expectedSrc;
      }
    }

    setIframeSrc();
    const timer = setTimeout(setIframeSrc, 50);
    window.addEventListener("resize", setIframeSrc);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", setIframeSrc);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <iframe
        ref={iframeRef}
        style={{ width: "100%", border: "none", minHeight: 300 }}
        title="French Roofing Reviews"
      />
    </div>
  );
}
