import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Phone, Search, Navigation, Loader2 } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import eczaneData from "@/data/eczaneler.json";

type Eczane = {
  name: string;
  city: string;
  district: string;
  address: string;
  phone: string;
  lat: number | null;
  lng: number | null;
};

const ALL: Eczane[] = eczaneData as Eczane[];

const trLower = (s: string) =>
  s.toLocaleLowerCase("tr-TR").replace(/i̇/g, "i");

function haversine(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const toRad = (x: number) => (x * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Lazy load Leaflet from CDN
function useLeaflet() {
  const [L, setL] = useState<any>(null);
  useEffect(() => {
    if ((window as any).L) {
      setL((window as any).L);
      return;
    }
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(css);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.onload = () => setL((window as any).L);
    document.body.appendChild(script);
  }, []);
  return L;
}

const Eczaneler = () => {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [nearbyOnly, setNearbyOnly] = useState(false);

  const cities = useMemo(() => {
    const set = new Set<string>();
    ALL.forEach((p) => p.city && set.add(p.city));
    return Array.from(set).sort((a, b) =>
      trLower(a).localeCompare(trLower(b), "tr")
    );
  }, []);

  const filtered = useMemo(() => {
    const q = trLower(search.trim());
    let list = ALL.filter((p) => {
      const matchCity = !city || trLower(p.city) === trLower(city);
      const matchQ =
        !q ||
        trLower(p.name).includes(q) ||
        trLower(p.district).includes(q) ||
        trLower(p.address).includes(q) ||
        trLower(p.city).includes(q);
      return matchCity && matchQ;
    });
    if (nearbyOnly && userPos) {
      list = list
        .filter((p) => p.lat != null && p.lng != null)
        .map((p) => ({
          ...p,
          _d: haversine(userPos, { lat: p.lat as number, lng: p.lng as number }),
        }))
        .sort((a: any, b: any) => a._d - b._d);
    }
    return list;
  }, [search, city, nearbyOnly, userPos]);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Tarayıcınız konum servisini desteklemiyor.");
      return;
    }
    setGeoLoading(true);
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setNearbyOnly(true);
        setGeoLoading(false);
      },
      (err) => {
        setGeoError(
          err.code === err.PERMISSION_DENIED
            ? "Konum izni verilmedi."
            : "Konum alınamadı."
        );
        setGeoLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Map
  const L = useLeaflet();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInst = useRef<any>(null);
  const markersLayer = useRef<any>(null);
  const userMarker = useRef<any>(null);

  useEffect(() => {
    if (!L || !mapRef.current || mapInst.current) return;
    mapInst.current = L.map(mapRef.current).setView([39.0, 35.0], 6);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
      maxZoom: 19,
    }).addTo(mapInst.current);
    markersLayer.current = L.layerGroup().addTo(mapInst.current);
  }, [L]);

  useEffect(() => {
    if (!L || !mapInst.current || !markersLayer.current) return;
    markersLayer.current.clearLayers();
    const pts: any[] = [];
    filtered.forEach((p) => {
      if (p.lat == null || p.lng == null) return;
      const m = L.marker([p.lat, p.lng]).bindPopup(
        `<div style="font-family:inherit;min-width:180px">
          <div style="font-weight:700;margin-bottom:4px">${p.name}</div>
          <div style="font-size:12px;color:#555">${p.district}, ${p.city}</div>
          <div style="font-size:12px;margin-top:4px">${p.address}</div>
          <a href="tel:${p.phone.replace(/\s/g, "")}" style="font-size:12px;color:#493d9a;font-weight:600;display:block;margin-top:6px">${p.phone}</a>
        </div>`
      );
      markersLayer.current.addLayer(m);
      pts.push([p.lat, p.lng]);
    });
    if (pts.length) {
      mapInst.current.fitBounds(pts, { padding: [40, 40], maxZoom: 13 });
    }
  }, [L, filtered]);

  useEffect(() => {
    if (!L || !mapInst.current || !userPos) return;
    if (userMarker.current) userMarker.current.remove();
    userMarker.current = L.circleMarker([userPos.lat, userPos.lng], {
      radius: 8,
      color: "#493d9a",
      fillColor: "#b2a5ff",
      fillOpacity: 0.9,
      weight: 3,
    })
      .addTo(mapInst.current)
      .bindPopup("Konumun");
    mapInst.current.setView([userPos.lat, userPos.lng], 12);
  }, [L, userPos]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteNav />

      <main className="flex-1">
        <section className="bg-secondary/40 py-12 lg:py-16 border-b border-border/50">
          <div className="max-w-[1200px] mx-auto px-5 lg:px-8 text-center">
            <h1 className="text-3xl lg:text-5xl font-bold text-primary mb-3">
              Anlaşmalı Eczanelerimiz
            </h1>
            <p className="text-base lg:text-lg text-foreground/70 max-w-2xl mx-auto">
              Ürünlerimizi bulabileceğin anlaşmalı eczane noktaları. Şehrini seç
              ya da konumunla en yakın eczaneyi bul.
            </p>
          </div>
        </section>

        <section className="py-8 lg:py-12">
          <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Eczane, ilçe veya adres ara..."
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-border bg-background text-[14px] text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-12 px-4 rounded-xl border border-border bg-background text-[14px] text-primary lg:w-56 focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">Tüm İller</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <button
                onClick={requestLocation}
                disabled={geoLoading}
                className="h-12 px-5 rounded-xl bg-primary text-primary-foreground text-[14px] font-semibold hover:bg-primary-medium transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {geoLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Navigation className="w-4 h-4" />
                )}
                Yakınımdaki Eczaneler
              </button>
            </div>

            {geoError && (
              <p className="text-sm text-rose mb-4">{geoError}</p>
            )}

            {nearbyOnly && userPos && (
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm text-foreground/70">
                  Konumuna göre sıralanıyor.
                </span>
                <button
                  onClick={() => setNearbyOnly(false)}
                  className="text-sm text-primary font-semibold hover:underline"
                >
                  Sıralamayı kaldır
                </button>
              </div>
            )}

            {/* Map */}
            <div
              ref={mapRef}
              className="w-full h-[360px] lg:h-[480px] rounded-2xl overflow-hidden border border-border mb-8 bg-secondary/30"
            />

            {/* Count */}
            <div className="text-sm text-foreground/70 mb-4">
              <strong className="text-primary">{filtered.length}</strong> eczane
              listeleniyor
              {city && (
                <>
                  {" "}— <span className="font-semibold">{city}</span>
                </>
              )}
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground">
                Aramanla eşleşen eczane bulunamadı.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((p, i) => {
                  const dist =
                    nearbyOnly && userPos && p.lat != null && p.lng != null
                      ? haversine(userPos, {
                          lat: p.lat as number,
                          lng: p.lng as number,
                        })
                      : null;
                  return (
                    <article
                      key={`${p.name}-${i}`}
                      className="rounded-2xl border border-border bg-background p-5 hover:shadow-md transition-shadow flex flex-col"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-[16px] font-bold text-primary leading-tight">
                          {p.name}
                        </h3>
                        {dist != null && (
                          <span className="text-[11px] font-semibold text-primary bg-secondary rounded-full px-2 py-1 whitespace-nowrap">
                            {dist < 1
                              ? `${Math.round(dist * 1000)} m`
                              : `${dist.toFixed(1)} km`}
                          </span>
                        )}
                      </div>
                      <div className="text-[12px] text-foreground/60 mb-3 font-medium">
                        {p.district}, {p.city}
                      </div>
                      <div className="flex items-start gap-2 text-[13px] text-foreground/80 mb-3 flex-1">
                        <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>{p.address}</span>
                      </div>
                      <div className="flex items-center gap-3 pt-3 border-t border-border/50">
                        <a
                          href={`tel:${p.phone.replace(/\s/g, "")}`}
                          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:opacity-70"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          {p.phone}
                        </a>
                        {p.lat != null && p.lng != null && (
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              p.name + " " + p.address
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-auto text-[12px] font-semibold text-primary hover:underline"
                          >
                            Yol tarifi
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Eczaneler;
