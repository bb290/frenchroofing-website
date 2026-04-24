"use client";

export default function ReviewsWidget() {
  return (
    <div
      className="review-popup-embed review-popup-embed--hide-mobile"
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        width: 382,
        maxWidth: "calc(100vw - 32px)",
        height: 190,
        zIndex: 9999,
      }}
    >
      <style>{`@media (max-width:768px){.review-popup-embed--hide-mobile{display:none!important}}`}</style>
      <iframe
        src="https://www.localmarketingmanager.com/api/reviews/french-roofing-review-popup-widget?speed=fast&mobile=hide"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          background: "transparent",
        }}
        title="Reviews Widget"
      />
    </div>
  );
}
