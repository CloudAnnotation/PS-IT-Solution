"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { Icon } from "@/components/Icon";

const STEPS = [
  { label: "Build", time: "0:42" },
  { label: "Automated tests", time: "2:15" },
  { label: "Security scan", time: "0:31" },
  { label: "Deploy to staging", time: "1:08" },
] as const;

const BARS = [
  { h: 34, t: "" },
  { h: 52, t: "s" },
  { h: 40, t: "" },
  { h: 61, t: "" },
  { h: 56, t: "p" },
  { h: 70, t: "" },
  { h: 64, t: "s" },
  { h: 58, t: "" },
  { h: 82, t: "p" },
  { h: 72, t: "" },
  { h: 94, t: "c" },
] as const;

type Pipeline = { active: number; version: number };

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    const frame = requestAnimationFrame(update);
    query.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      query.removeEventListener("change", update);
    };
  }, []);
  return reduced;
}

/**
 * Decorative hero illustration: a dashboard, a release pipeline that steps
 * forward on a timer, and a connected-systems map. All figures are sample data.
 */
export function HeroVisual() {
  const [pipeline, setPipeline] = useState<Pipeline>({ active: 2, version: 4 });
  const reduced = usePrefersReducedMotion();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setPipeline((p) =>
        p.active >= STEPS.length ? { active: 0, version: p.version + 1 } : { ...p, active: p.active + 1 },
      );
    }, 2200);
    return () => window.clearInterval(id);
  }, [reduced]);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== "mouse" || !root.current) return;
    const rect = root.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    root.current.style.setProperty("--px", (x * 2).toFixed(3));
    root.current.style.setProperty("--py", (y * 2).toFixed(3));
  };
  const onPointerLeave = () => {
    root.current?.style.setProperty("--px", "0");
    root.current?.style.setProperty("--py", "0");
  };

  return (
    <div
      ref={root}
      className="hv ld"
      style={{ "--d": "200ms" } as CSSProperties}
      role="img"
      aria-label="Illustration of a software operations dashboard, a release pipeline and connected systems. Sample data only."
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="hv-grid" aria-hidden="true" />
      <div className="hv-orb" aria-hidden="true" />
      <div className="hv-ring" aria-hidden="true" />
      <span className="hv-cap" aria-hidden="true">
        Illustrative interface
      </span>

      <div className="layer dash" aria-hidden="true">
        <div className="ui float">
          <div className="ui-top">
            <span className="dots">
              <i />
              <i />
              <i />
            </span>
            <span className="ui-title">Operations overview</span>
            <span className="tag">Sample data</span>
          </div>
          <div className="kpis">
            <div className="kpi">
              <span>Uptime</span>
              <b>99.9%</b>
            </div>
            <div className="kpi">
              <span>Releases / mo</span>
              <b>
                24<em>+6</em>
              </b>
            </div>
            <div className="kpi">
              <span>Avg. response</span>
              <b>180ms</b>
            </div>
          </div>
          <div className="chart">
            {BARS.map((bar, i) => (
              <span key={i} className={`bar ${bar.t}`} style={{ "--h": `${bar.h}%`, "--i": i } as CSSProperties} />
            ))}
          </div>
          <div className="ui-foot">
            <i />
            <span className="track">
              <b />
            </span>
            <span>Sprint 64%</span>
          </div>
        </div>
      </div>

      <div className="layer pipe" aria-hidden="true">
        <div className="ui float" style={{ "--fd": "-2.5s" } as CSSProperties}>
          <div className="pipe-head">
            <b>Release pipeline</b>
            <code>main</code>
          </div>
          <ol className="steps-ui">
            {STEPS.map((step, i) => {
              const state = i < pipeline.active ? "done" : i === pipeline.active ? "run" : "";
              return (
                <li key={step.label} className={state}>
                  <span className="st">
                    <Icon name="check" />
                  </span>
                  {step.label}
                  <time>{i <= pipeline.active ? step.time : "--"}</time>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <div className="layer map" aria-hidden="true">
        <div className="ui float" style={{ "--fd": "-5s" } as CSSProperties}>
          <div className="pipe-head" style={{ marginBottom: 6 }}>
            <b>Connected systems</b>
          </div>
          <svg viewBox="0 0 200 128">
            <path className="flow" d="M100 64 L32 24" />
            <path className="flow" d="M100 64 L168 24" />
            <path className="flow" d="M100 64 L32 106" />
            <path className="flow" d="M100 64 L168 106" />
            <circle cx="32" cy="24" r="14" fill="#F4ECF1" stroke="#D8C7D2" />
            <text className="lbl" x="32" y="27" textAnchor="middle">
              Web
            </text>
            <circle cx="168" cy="24" r="14" fill="#F4ECF1" stroke="#D8C7D2" />
            <text className="lbl" x="168" y="27" textAnchor="middle">
              App
            </text>
            <circle cx="32" cy="106" r="14" fill="#F4ECF1" stroke="#D8C7D2" />
            <text className="lbl" x="32" y="109" textAnchor="middle">
              CRM
            </text>
            <circle cx="168" cy="106" r="14" fill="#FFE6E0" stroke="#FF6B57" />
            <text className="lbl" x="168" y="109" textAnchor="middle">
              Data
            </text>
            <circle cx="100" cy="64" r="22" fill="#3B1C5A" />
            <text className="core-lbl" x="100" y="67" textAnchor="middle">
              API
            </text>
          </svg>
        </div>
      </div>

      <div className="layer toast ui" aria-hidden="true">
        <span className="ok">
          <Icon name="check" />
        </span>
        <span>
          <b>Release v2.{pipeline.version} shipped</b>
          <span className="sub">Staging → Production</span>
        </span>
      </div>
    </div>
  );
}
