import Link from "next/link";
import { site } from "@/lib/site";

type MarkVariant = "default" | "reversed";

const markColors: Record<MarkVariant, { back: string; front: string; overlap: string }> = {
  default: { back: "#3B1C5A", front: "#FF6B57", overlap: "#28113D" },
  reversed: { back: "#FBF4F8", front: "#FF6B57", overlap: "#28113D" },
};

/**
 * The Interlock mark: two overlapping rounded squares, plum and coral, with a
 * deep-plum shape where they meet. Use `reversed` on plum backgrounds.
 */
export function LogoMark({
  size = 40,
  variant = "default",
  title,
  className,
}: {
  size?: number;
  variant?: MarkVariant;
  title?: string;
  className?: string;
}) {
  const c = markColors[variant];
  return (
    <svg
      viewBox="10 10 80 80"
      width={size}
      height={size}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <rect x="14" y="14" width="50" height="50" rx="14" fill={c.back} />
      <rect x="36" y="36" width="50" height="50" rx="14" fill={c.front} />
      <path d="M50 36H64V50A14 14 0 0 1 50 64H36V50A14 14 0 0 1 50 36Z" fill={c.overlap} />
    </svg>
  );
}

export function Logo({ variant = "default", onNavigate }: { variant?: MarkVariant; onNavigate?: () => void }) {
  return (
    <Link href="/" className="logo" onClick={onNavigate}>
      <LogoMark variant={variant} size={40} className="logo-mark" />
      <span className="logo-text">
        {site.name}
        <small>{site.tagline}</small>
      </span>
    </Link>
  );
}
