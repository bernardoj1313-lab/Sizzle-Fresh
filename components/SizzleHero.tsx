"use client";

import { Sizzle } from "@/lib/types";
import {
  formatDiscount,
  spotsRemaining,
  percentClaimed,
  endsAtLabel,
} from "@/lib/sizzles";

type Props = {
  sizzle: Sizzle;
  claimed?: boolean;
  claiming?: boolean;
  onTap?: (sizzle: Sizzle) => void;
  onClaim?: (sizzle: Sizzle) => void;
};

export default function SizzleHero({
  sizzle,
  claimed,
  claiming,
  onTap,
  onClaim,
}: Props) {
  const r = sizzle.restaurants;
  const spots = spotsRemaining(sizzle);
  const pct = percentClaimed(sizzle);
  const isCritical = spots <= 2;

  const handleCardClick = () => onTap?.(sizzle);
  const handleClaimClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (claimed || claiming) return;
    onClaim?.(sizzle);
  };

  return (
    <div
      onClick={handleCardClick}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "4 / 5",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        cursor: "pointer",
        background: "var(--bg-elevated-2)",
        marginBottom: "20px",
      }}
    >
      {/* Photo */}
      {r?.photo_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={r.photo_url}
          alt={r.name || "Restaurant"}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}

      {/* Dark gradient overlay for legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Top row: LIVE pill + spots */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          right: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "var(--color-brand)",
            color: "white",
            padding: "5px 10px",
            borderRadius: "var(--radius-full)",
            fontSize: "10px",
            fontWeight: 800,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "white",
              animation: "sizzle-pulse 1.4s ease-in-out infinite",
            }}
          />
          Live
        </div>

        <div
          style={{
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "white",
            padding: "8px 12px",
            borderRadius: "var(--radius-md)",
            textAlign: "center",
            minWidth: "64px",
          }}
        >
          <div
            style={{
              fontSize: "22px",
              fontWeight: 700,
              lineHeight: 1,
              color: isCritical ? "#FF6B6B" : "white",
            }}
          >
            {spots}
          </div>
          <div
            style={{
              fontSize: "9px",
              opacity: 0.7,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginTop: "2px",
            }}
          >
            Left
          </div>
        </div>
      </div>

      {/* DEMO badge (small, subtle, top-right of nothing else) */}
      {sizzle.is_demo && (
        <div
          style={{
            position: "absolute",
            top: "72px",
            right: "16px",
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(10px)",
            color: "white",
            padding: "3px 8px",
            borderRadius: "var(--radius-sm)",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            opacity: 0.75,
          }}
        >
          DEMO
        </div>
      )}

      {/* Bottom content */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "20px",
        }}
      >
        {/* Cuisine line */}
        <div
          style={{
            fontSize: "11px",
            color: "var(--color-brand)",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "6px",
            textShadow: "0 1px 4px rgba(0,0,0,0.4)",
          }}
        >
          {r?.cuisine_type || "Restaurant"}
        </div>

        {/* Restaurant name */}
        <div
          style={{
            fontSize: "26px",
            fontWeight: 800,
            color: "white",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: "6px",
            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          {r?.name || "Restaurant"}
        </div>

        {/* Offer title */}
        <div
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.85)",
            marginBottom: "14px",
            lineHeight: 1.4,
            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
          }}
        >
          {sizzle.title}
        </div>

        {/* Action row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              background: "var(--color-brand)",
              color: "white",
              padding: "8px 14px",
              borderRadius: "var(--radius-md)",
              fontSize: "14px",
              fontWeight: 800,
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
            }}
          >
            {formatDiscount(sizzle)}
          </div>

          <div
            style={{
              flex: 1,
              fontSize: "11px",
              color: "rgba(255,255,255,0.75)",
              textShadow: "0 1px 4px rgba(0,0,0,0.5)",
            }}
          >
            Ends {endsAtLabel(sizzle)} ·{" "}
            <span style={{ opacity: 0.7 }}>
              {sizzle.current_claims}/{sizzle.max_claims} claimed
            </span>
          </div>

          <button
            onClick={handleClaimClick}
            disabled={claimed || claiming}
            style={{
              background: claimed
                ? "var(--color-success)"
                : "white",
              color: claimed ? "white" : "#0A0A0B",
              border: "none",
              padding: "10px 18px",
