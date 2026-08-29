import { QrCode, ExternalLink } from "lucide-react";
import { RESTAURANT } from "@/lib/data";

export default function QrBanner() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-stone-300 bg-gradient-to-br from-surface to-orange-50 p-4 sm:flex-row sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="shrink-0 rounded-xl bg-white p-2 shadow-sm">
          <img src={RESTAURANT.qrImg} alt="QR Menu" className="h-[72px] w-[72px] rounded-lg object-contain" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <QrCode className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-primary">Dine-in? Scan the QR on your table</h3>
          </div>
          <p className="mt-1 max-w-md text-xs leading-5 text-primary/70">Instant menu, no waiting. Point your camera at the table QR to browse &amp; order. Works offline-friendly.</p>
          <div className="mt-2 flex gap-2">
            <a href="/qr" className="inline-flex items-center gap-1 text-xs font-semibold text-primary-light hover:text-primary">
              Open QR menu <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-xs text-primary/60">·</span>
            <span className="text-xs text-primary-light/70">Table QR · No app needed</span>
          </div>
        </div>
      </div>
      <a href="/qr" className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-xs font-medium text-white hover:bg-black">
        <QrCode className="h-4 w-4" /> View QR Menu
      </a>
    </div>
  );
}
