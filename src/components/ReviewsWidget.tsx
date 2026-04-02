"use client";

export default function ReviewsWidget() {
  return (
    <iframe
      src="https://www.localmarketingmanager.com/api/reviews/french-roofing-review-popup-widget?speed=slow&mobile=show"
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        width: 382,
        maxWidth: "calc(100vw - 32px)",
        height: 190,
        border: "none",
        zIndex: 9999,
        background: "transparent",
      }}
      title="French Roofing Reviews"
    />
  );
}
