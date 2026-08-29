import { MapPin, Phone, Clock, Navigation, Award } from "lucide-react";
import { RESTAURANT } from "@/lib/data";

export default function ContactCard({ open }: { open: boolean }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6">
      <h3 className="font-semibold">Contact</h3>
      <div className="mt-3 space-y-3 text-sm">
        <a href={RESTAURANT.mapsUrl} target="_blank" className="flex gap-3 hover:text-amber-600">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />
          <span>{RESTAURANT.address}<br /><span className="text-amber-600">Get directions</span></span>
        </a>
        <a href={RESTAURANT.phoneHref} className="flex items-center gap-3 hover:text-amber-600">
          <Phone className="h-4 w-4 text-stone-400" /> {RESTAURANT.phone}
        </a>
        <div className="flex items-center gap-3 text-stone-600">
          <Clock className="h-4 w-4 text-stone-400" />
          <span>{open ? "Open" : "Closed"} · Opens 11 AM</span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <a href={RESTAURANT.phoneHref} className="inline-flex items-center justify-center gap-1.5 rounded-full bg-amber-600 py-2 text-sm font-medium text-white hover:bg-amber-700"><Phone className="h-4 w-4" /> Call</a>
        <a href={RESTAURANT.phoneHref} className="inline-flex items-center justify-center gap-1.5 rounded-full border border-stone-200 bg-white py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"><Phone className="h-4 w-4" /> Message</a>
      </div>
      <a href={RESTAURANT.mapsUrl} target="_blank" className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-full border border-stone-200 py-2 text-sm font-medium hover:bg-stone-50"><Navigation className="h-4 w-4" /> Directions</a>
      <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-4">
        <span className="text-xs text-stone-500">Price · {RESTAURANT.priceRange} per person</span>
        <Award className="h-4 w-4 text-amber-500" />
      </div>
    </div>
  );
}
