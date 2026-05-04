import { useMemo, useState } from "react";
import {
  Package,
  Repeat,
  Plus,
  Pencil,
  LogOut,
  Calendar,
  CreditCard,
  Pause,
  Play,
  X,
  ChevronRight,
  ShoppingBag,
  Info,
  RotateCcw,
  Lightbulb,
  Home,
  Building2,
  Search,
  MapPin,
  Phone,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import ScrollProgress from "@/components/ScrollProgress";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

type TabKey = "orders" | "subscriptions" | "profile";

type SubscriptionItem = {
  id: string;
  name: string;
  variant: string;
  qty: number;
  price: number;
  image: string;
};

type SubscriptionStatus = "active" | "paused" | "canceled";

type Subscription = {
  id: string;
  title: string;
  status: SubscriptionStatus;
  frequency: "monthly" | "bimonthly" | "trimonthly" | "semiannual";
  nextDelivery: string;
  total: number;
  items: SubscriptionItem[];
};

const FREQ_LABEL: Record<Subscription["frequency"], string> = {
  monthly: "Ayda bir",
  bimonthly: "2 ayda bir",
  trimonthly: "3 ayda bir",
  semiannual: "6 ayda bir",
};

const addDays = (iso: string, days: number) => {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const initialSubs: Subscription[] = [
  {
    id: "sub_001",
    title: ".ki Aylık Bakım Paketi",
    status: "active",
    frequency: "monthly",
    nextDelivery: "2026-05-08",
    total: 749,
    items: [
      {
        id: "p1",
        name: ".ki Gündüz Pedi",
        variant: "245 mm · 12 adet",
        qty: 2,
        price: 189,
        image:
          "https://images.unsplash.com/photo-1550572017-edd951b55104?w=200&h=200&fit=crop",
      },
      {
        id: "p2",
        name: ".ki Günlük Ped",
        variant: "155 mm · 30 adet",
        qty: 1,
        price: 159,
        image:
          "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=200&h=200&fit=crop",
      },
      {
        id: "p3",
        name: ".ki Gece Pedi",
        variant: "335 mm · 8 adet",
        qty: 1,
        price: 212,
        image:
          "https://images.unsplash.com/photo-1626197031507-c17099753214?w=200&h=200&fit=crop",
      },
    ],
  },
  {
    id: "sub_002",
    title: "Hassas Cilt Rutini",
    status: "paused",
    frequency: "bimonthly",
    nextDelivery: "2026-06-02",
    total: 489,
    items: [
      {
        id: "p4",
        name: ".ki Intim Bakım Spreyi",
        variant: "75 ml",
        qty: 1,
        price: 269,
        image:
          "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=200&fit=crop",
      },
      {
        id: "p5",
        name: ".ki Yatıştırıcı Yağ",
        variant: "30 ml",
        qty: 1,
        price: 220,
        image:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop",
      },
    ],
  },
];

type OrderStatus = "processing" | "shipped" | "delivered" | "canceled";

type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  deliveryEstimate: string;
  shippingAddress: string;
  paymentMethod: string;
  items: SubscriptionItem[];
  shipping: number;
};

const ORDER_STATUS: Record<OrderStatus, { label: string; cls: string }> = {
  processing: {
    label: "Hazırlanıyor",
    cls: "bg-amber-light text-amber border-amber/20",
  },
  shipped: {
    label: "Kargoda",
    cls: "bg-secondary text-primary border-primary/20",
  },
  delivered: {
    label: "Teslim edildi",
    cls: "bg-sage-light text-sage border-sage/20",
  },
  canceled: {
    label: "İptal edildi",
    cls: "bg-muted text-muted-foreground border-border",
  },
};

const sampleOrders: Order[] = [
  {
    id: "KI-20260418-1042",
    date: "2026-04-18",
    status: "shipped",
    deliveryEstimate: "2026-04-24",
    shippingAddress: "Cihangir Mah. Sıraselviler Cad. No:24/3, Beyoğlu / İstanbul",
    paymentMethod: "Visa •••• 4421",
    shipping: 0,
    items: [
      {
        id: "o1",
        name: ".ki Gündüz Pedi",
        variant: "245 mm · 12 adet",
        qty: 1,
        price: 189,
        image:
          "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=200&h=200&fit=crop",
      },
      {
        id: "o2",
        name: ".ki Intim Bakım Spreyi",
        variant: "75 ml",
        qty: 2,
        price: 269,
        image:
          "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=200&h=200&fit=crop",
      },
    ],
  },
];

/* ================== PAGE ================== */

const Profil = () => {
  const [tab, setTab] = useState<TabKey>("subscriptions");
  const [subs, setSubs] = useState<Subscription[]>(initialSubs);
  const [editing, setEditing] = useState<Subscription | null>(null);
  const [confirmCancel, setConfirmCancel] = useState<string | null>(null);
  const [confirmToggle, setConfirmToggle] = useState<Subscription | null>(null);
  const [removedFromSub, setRemovedFromSub] = useState<SubscriptionItem[]>([]);

  const activeCount = useMemo(
    () => subs.filter((s) => s.status === "active").length,
    [subs],
  );

  const updateSub = (id: string, patch: Partial<Subscription>) => {
    setSubs((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  const updateItemQty = (subId: string, itemId: string, qty: number) => {
    setSubs((prev) =>
      prev.map((s) =>
        s.id === subId
          ? {
              ...s,
              items: s.items.map((it) =>
                it.id === itemId ? { ...it, qty: Math.max(0, qty) } : it,
              ),
            }
          : s,
      ),
    );
  };

  const removeItem = (subId: string, itemId: string) => {
    setSubs((prev) =>
      prev.map((s) =>
        s.id === subId
          ? { ...s, items: s.items.filter((it) => it.id !== itemId) }
          : s,
      ),
    );
  };

  const cancelSub = (id: string) => {
    updateSub(id, { status: "canceled" });
    setConfirmCancel(null);
    toast.success("Aboneliğin iptal edildi");
  };

  const togglePause = (s: Subscription) => {
    setConfirmToggle(s);
  };

  const confirmTogglePause = () => {
    if (!confirmToggle) return;
    const next: SubscriptionStatus = confirmToggle.status === "active" ? "paused" : "active";
    updateSub(confirmToggle.id, { status: next });
    toast.success(
      next === "paused" ? "Abonelik duraklatıldı" : "Abonelik devam ediyor",
    );
    setConfirmToggle(null);
  };

  return (
    <div className="min-h-screen bg-background pb-[72px] font-primary">
      <ScrollProgress />
      <AnnouncementBar />
      <SiteNav />

      {/* Page header / hero strip */}
      <section className="border-b border-border/60 bg-plum-pale">
        <div className="max-w-[1080px] mx-auto px-5 lg:px-8 py-10 lg:py-14">
          <div className="flex items-start gap-5">
            <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-semibold">
              B
            </div>
            <div>
              <p className="text-[12px] font-semibold tracking-[0.18em] uppercase text-primary-medium">
                .ki hesabım
              </p>
              <h1 className="mt-2 text-[32px] lg:text-[40px] leading-[1.1] font-semibold text-primary tracking-tight">
                Merhaba, bek aktas
              </h1>
              <p className="mt-2 text-sm text-muted-foreground max-w-md">
                Siparişlerini takip et, aboneliklerini yönet ve hesap bilgilerini güncelle.
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8 flex gap-1 overflow-x-auto hide-scrollbar -mx-1 px-1">
            <TabBtn active={tab === "orders"} onClick={() => setTab("orders")}>
              Siparişler
            </TabBtn>
            <TabBtn
              active={tab === "subscriptions"}
              onClick={() => setTab("subscriptions")}
            >
              Abonelikler
              {activeCount > 0 && (
                <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-semibold text-primary-foreground">
                  {activeCount}
                </span>
              )}
            </TabBtn>
            <TabBtn active={tab === "profile"} onClick={() => setTab("profile")}>
              Profil
            </TabBtn>
          </div>
        </div>
      </section>

      <main className="max-w-[1080px] mx-auto px-5 lg:px-8 py-10 lg:py-14">
        {tab === "orders" && <OrdersView />}
        {tab === "profile" && <ProfileView />}
        {tab === "subscriptions" && (
          <SubscriptionsView
            subs={subs}
            onEdit={(sub) => { setRemovedFromSub([]); setEditing(sub); }}
            onTogglePause={togglePause}
            onCancel={(id) => setConfirmCancel(id)}
            onRestart={(id) => {
              updateSub(id, { status: "active" });
              toast.success("Abonelik yeniden başlatıldı");
            }}
          />
        )}
      </main>

      <SiteFooter />

      {/* Edit subscription dialog */}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-2xl font-primary">
          {editing && (
            <>
              <DialogHeader>
                <DialogTitle className="text-primary">Aboneliği güncelle</DialogTitle>
                <DialogDescription>
                  Sepet içeriğini ve teslimat sıklığını düzenleyebilirsin.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 py-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Repeat className="w-4 h-4" />
                  <span>Teslimat: <span className="font-medium text-primary">2 ayda bir</span></span>
                </div>

                <div className="space-y-3">
                  <Label>Sepetteki ürünler</Label>
                  <div className="divide-y divide-border rounded-lg border border-border">
                    {editing.items.length === 0 && (
                      <p className="p-6 text-center text-sm text-muted-foreground">
                        Sepette ürün kalmadı.
                      </p>
                    )}
                    {editing.items.map((it) => (
                      <div key={it.id} className="flex items-center gap-3 p-3">
                        <img
                          src={it.image}
                          alt={it.name}
                          className="h-14 w-14 rounded-md object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{it.name}</p>
                          <p className="text-xs text-muted-foreground">{it.variant}</p>
                        </div>
                        <div className="flex items-center gap-1 rounded-md border border-border">
                          <button
                            className="px-2 py-1 text-muted-foreground hover:text-foreground"
                            onClick={() => {
                              const newQty = it.qty - 1;
                              if (newQty <= 0) {
                                setRemovedFromSub((prev) =>
                                  prev.some((r) => r.id === it.id) ? prev : [it, ...prev].slice(0, 5)
                                );
                                removeItem(editing.id, it.id);
                                setEditing({
                                  ...editing,
                                  items: editing.items.filter((x) => x.id !== it.id),
                                });
                              } else {
                                updateItemQty(editing.id, it.id, newQty);
                                setEditing({
                                  ...editing,
                                  items: editing.items.map((x) =>
                                    x.id === it.id ? { ...x, qty: newQty } : x,
                                  ),
                                });
                              }
                            }}
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm">{it.qty}</span>
                          <button
                            className="px-2 py-1 text-muted-foreground hover:text-foreground"
                            onClick={() => {
                              updateItemQty(editing.id, it.id, it.qty + 1);
                              setEditing({
                                ...editing,
                                items: editing.items.map((x) =>
                                  x.id === it.id ? { ...x, qty: x.qty + 1 } : x,
                                ),
                              });
                            }}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-destructive"
                          onClick={() => {
                            setRemovedFromSub((prev) =>
                              prev.some((r) => r.id === it.id) ? prev : [it, ...prev].slice(0, 5)
                            );
                            removeItem(editing.id, it.id);
                            setEditing({
                              ...editing,
                              items: editing.items.filter((x) => x.id !== it.id),
                            });
                          }}
                          aria-label="Ürünü kaldır"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recently removed items */}
                {removedFromSub.length > 0 && (
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1.5 text-muted-foreground">
                      <RotateCcw className="w-3.5 h-3.5" /> Son çıkarılan ürünler
                    </Label>
                    <div className="divide-y divide-border rounded-lg border border-border/60 bg-secondary/30">
                      {removedFromSub
                        .filter((r) => !editing.items.some((ei) => ei.id === r.id))
                        .map((it) => (
                          <div key={it.id} className="flex items-center gap-3 p-3">
                            <img src={it.image} alt={it.name} className="h-10 w-10 rounded-md object-cover opacity-70" />
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-primary/70">{it.name}</p>
                              <p className="text-xs text-muted-foreground">{it.variant}</p>
                            </div>
                            <button
                              className="text-xs font-semibold text-primary hover:text-primary-medium px-3 py-1.5 rounded-lg hover:bg-secondary transition-colors"
                              onClick={() => {
                                const restoredItem = { ...it, qty: 1 };
                                setEditing({ ...editing, items: [...editing.items, restoredItem] });
                                setRemovedFromSub((prev) => prev.filter((r) => r.id !== it.id));
                              }}
                            >
                              Geri Ekle
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Suggested items */}
                {(() => {
                  const SUGGESTIONS: SubscriptionItem[] = [
                    { id: "sug1", name: ".ki Balance · Saşe", variant: "30 saşe", qty: 1, price: 395, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=200&fit=crop" },
                    { id: "sug2", name: ".ki Intim Bakım Spreyi", variant: "75 ml", qty: 1, price: 269, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=200&fit=crop" },
                    { id: "sug3", name: ".ki Cycle Care Yağ", variant: "30 ml", qty: 1, price: 289, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop" },
                  ];
                  const available = SUGGESTIONS.filter(
                    (s) => !editing.items.some((ei) => ei.id === s.id)
                  );
                  if (available.length === 0) return null;
                  return (
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1.5 text-muted-foreground">
                        <Lightbulb className="w-3.5 h-3.5" /> Paketine uyabilecek ürünler
                      </Label>
                      <div className="divide-y divide-border rounded-lg border border-border/60 bg-sage-light/30">
                        {available.map((it) => (
                          <div key={it.id} className="flex items-center gap-3 p-3">
                            <img src={it.image} alt={it.name} className="h-10 w-10 rounded-md object-cover" />
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium">{it.name}</p>
                              <p className="text-xs text-muted-foreground">{it.variant} · ₺{it.price}</p>
                            </div>
                            <button
                              className="text-xs font-semibold text-sage hover:text-primary px-3 py-1.5 rounded-lg hover:bg-secondary transition-colors"
                              onClick={() => {
                                setEditing({ ...editing, items: [...editing.items, it] });
                              }}
                            >
                              + Ekle
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>

              <DialogFooter className="gap-2 sm:gap-2">
                <Button variant="outline" onClick={() => setEditing(null)}>
                  Vazgeç
                </Button>
                <Button
                  className="bg-primary hover:bg-primary-medium text-primary-foreground"
                  onClick={() => {
                    updateSub(editing.id, {
                      frequency: editing.frequency,
                      items: editing.items,
                    });
                    setEditing(null);
                    toast.success("Abonelik güncellendi");
                  }}
                >
                  Değişiklikleri kaydet
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!confirmCancel}
        onOpenChange={(o) => !o && setConfirmCancel(null)}
      >
        <AlertDialogContent className="font-primary">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-primary">
              Aboneliği iptal etmek istiyor musun?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Bir sonraki teslimat oluşturulmayacak. Dilediğin zaman yeni bir abonelik
              başlatabilirsin.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Vazgeç</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => confirmCancel && cancelSub(confirmCancel)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Evet, iptal et
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Pause/Resume confirmation */}
      <AlertDialog
        open={!!confirmToggle}
        onOpenChange={(o) => !o && setConfirmToggle(null)}
      >
        <AlertDialogContent className="font-primary">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-primary">
              {confirmToggle?.status === "active"
                ? "Aboneliği duraklatmak istiyor musun?"
                : "Aboneliği devam ettirmek istiyor musun?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmToggle?.status === "active"
                ? "Aboneliğin duraklatılacak ve bir sonraki teslimat yapılmayacak. Dilediğin zaman devam ettirebilirsin."
                : "Aboneliğin tekrar aktif olacak ve teslimatlar planlandığı şekilde devam edecek."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Vazgeç</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmTogglePause}
              className="bg-primary text-primary-foreground hover:bg-primary-medium"
            >
              {confirmToggle?.status === "active" ? "Evet, duraklat" : "Evet, devam ettir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

/* ================== SHARED ================== */

const TabBtn = ({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`relative inline-flex items-center whitespace-nowrap rounded-full px-5 py-2.5 text-[14px] font-semibold transition-all ${
      active
        ? "bg-primary text-primary-foreground shadow-sm"
        : "text-primary/70 hover:bg-secondary hover:text-primary"
    }`}
  >
    {children}
  </button>
);

const SectionHeader = ({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) => (
  <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
    <div>
      {eyebrow && (
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-primary-medium">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-1 text-[26px] lg:text-[30px] leading-[1.15] font-semibold text-primary tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-1.5 text-sm text-muted-foreground max-w-lg">{description}</p>
      )}
    </div>
    {action}
  </div>
);

/* ================== SUBSCRIPTIONS ================== */

const SubscriptionsView = ({
  subs,
  onEdit,
  onTogglePause,
  onCancel,
  onRestart,
}: {
  subs: Subscription[];
  onEdit: (s: Subscription) => void;
  onTogglePause: (s: Subscription) => void;
  onCancel: (id: string) => void;
  onRestart: (id: string) => void;
}) => (
  <section>
    <SectionHeader
      eyebrow="Abonelikler"
      title="Aktif aboneliklerin"
      description="Sepetini düzenle, teslimat sıklığını değiştir veya istediğin an duraklat."
      action={
        <a
          href="/paket-olustur"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary-medium transition-colors text-[13px] font-bold py-2.5 px-5 rounded-full"
        >
          <Plus className="h-4 w-4" /> Yeni abonelik
        </a>
      }
    />

    {subs.length === 0 ? (
      <EmptyState
        icon={<Repeat className="h-6 w-6" />}
        title="Henüz aboneliğin yok"
        description="Düzenli ihtiyaçların için bir abonelik oluştur."
      />
    ) : (
      <div className="grid gap-5">
        {subs.map((s) => (
          <SubscriptionCard
            key={s.id}
            sub={s}
            onEdit={() => onEdit(s)}
            onTogglePause={() => onTogglePause(s)}
            onCancel={() => onCancel(s.id)}
            onRestart={() => onRestart(s.id)}
          />
        ))}
      </div>
    )}
  </section>
);

const StatusBadge = ({ status }: { status: SubscriptionStatus }) => {
  const map: Record<SubscriptionStatus, { label: string; cls: string }> = {
    active: {
      label: "Aktif",
      cls: "bg-sage-light text-sage border-sage/20",
    },
    paused: {
      label: "Duraklatıldı",
      cls: "bg-amber-light text-amber border-amber/20",
    },
    canceled: {
      label: "İptal edildi",
      cls: "bg-muted text-muted-foreground border-border",
    },
  };
  const v = map[status];
  return (
    <Badge variant="outline" className={`rounded-full font-semibold ${v.cls}`}>
      {v.label}
    </Badge>
  );
};

const SubscriptionCard = ({
  sub,
  onEdit,
  onTogglePause,
  onCancel,
  onRestart,
}: {
  sub: Subscription;
  onEdit: () => void;
  onTogglePause: () => void;
  onCancel: () => void;
  onRestart: () => void;
}) => {
  const itemsTotal = sub.items.reduce((acc, it) => acc + it.qty * it.price, 0);
  const isCanceled = sub.status === "canceled";

  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
      {/* Header strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-plum-pale px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Repeat className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-primary leading-tight">{sub.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {FREQ_LABEL[sub.frequency]} · {sub.items.length} ürün
            </p>
          </div>
        </div>
        <StatusBadge status={sub.status} />
      </div>

      {/* Body */}
      <div className="grid gap-6 p-6 md:grid-cols-[1fr_280px]">
        <div className="space-y-3">
          {sub.items.map((it) => (
            <div key={it.id} className="flex items-center gap-3">
              <img
                src={it.image}
                alt={it.name}
                className="h-14 w-14 rounded-xl object-cover ring-1 ring-border"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-primary">{it.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {it.variant} · Adet {it.qty}
                </p>
              </div>
              <p className="text-sm font-semibold tabular-nums text-primary">
                {(it.qty * it.price).toLocaleString("tr-TR")} ₺
              </p>
            </div>
          ))}
        </div>

        <aside className="rounded-2xl bg-secondary/60 p-5">
          <dl className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" /> Sonraki teslimat
              </dt>
              <dd className="font-medium text-primary">
                {isCanceled ? "—" : formatDate(sub.nextDelivery)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-2 text-muted-foreground">
                <CreditCard className="h-4 w-4" /> Sonraki ödeme
              </dt>
              <dd className="font-medium text-primary">
                {isCanceled ? "—" : formatDate(addDays(sub.nextDelivery, -2))}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-border/60 pt-3">
              <dt className="text-muted-foreground">Tutar</dt>
              <dd className="font-bold tabular-nums text-primary">
                {itemsTotal.toLocaleString("tr-TR")} ₺
              </dd>
            </div>
          </dl>

          <div className="mt-5 flex flex-col gap-2">
            <Button
              onClick={onEdit}
              disabled={isCanceled}
              className="w-full justify-center gap-2 rounded-full bg-primary hover:bg-primary-medium text-primary-foreground"
            >
              <Pencil className="h-4 w-4" /> Sepeti düzenle
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={isCanceled}
                onClick={onTogglePause}
                className="gap-1.5 rounded-full"
              >
                {sub.status === "active" ? (
                  <>
                    <Pause className="h-3.5 w-3.5" /> Duraklat
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5" /> Devam et
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={isCanceled}
                onClick={onCancel}
                className="gap-1.5 rounded-full text-destructive hover:bg-destructive/5 hover:text-destructive"
              >
                <X className="h-3.5 w-3.5" /> İptal et
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
};

/* ================== ORDERS ================== */

const OrdersView = () => {
  const [orders] = useState<Order[]>(sampleOrders);

  return (
    <section>
      <SectionHeader
        eyebrow="Siparişler"
        title="Sipariş geçmişin"
        description="Tek seferlik siparişlerini görüntüle ve takip et."
        action={
          <a
            href="/balance"
            className="inline-flex items-center gap-2 border border-primary/30 text-primary hover:bg-secondary transition-colors text-[13px] font-bold py-2.5 px-5 rounded-full"
          >
            Mağazaya git <ChevronRight className="h-4 w-4" />
          </a>
        }
      />

      {orders.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag className="h-6 w-6" />}
          title="Henüz sipariş yok"
          description="Sipariş vermek için mağazaya gidin."
        />
      ) : (
        <div className="grid gap-5">
          {orders.map((o) => (
            <OrderCard key={o.id} order={o} />
          ))}
        </div>
      )}
    </section>
  );
};

const OrderCard = ({ order }: { order: Order }) => {
  const itemsTotal = order.items.reduce((acc, it) => acc + it.qty * it.price, 0);
  const total = itemsTotal + order.shipping;
  const status = ORDER_STATUS[order.status];

  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-plum-pale px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-primary leading-tight">
              Sipariş #{order.id}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {formatDate(order.date)} · {order.items.length} ürün
            </p>
          </div>
        </div>
        <Badge variant="outline" className={`rounded-full font-semibold ${status.cls}`}>
          {status.label}
        </Badge>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-[1fr_280px]">
        <div className="space-y-3">
          {order.items.map((it) => (
            <div key={it.id} className="flex items-center gap-3">
              <img
                src={it.image}
                alt={it.name}
                className="h-14 w-14 rounded-xl object-cover ring-1 ring-border"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-primary">{it.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {it.variant} · Adet {it.qty}
                </p>
              </div>
              <p className="text-sm font-semibold tabular-nums text-primary">
                {(it.qty * it.price).toLocaleString("tr-TR")} ₺
              </p>
            </div>
          ))}
        </div>

        <aside className="rounded-2xl bg-secondary/60 p-5">
          <dl className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" /> Tahmini teslimat
              </dt>
              <dd className="font-medium text-primary">
                {formatDate(order.deliveryEstimate)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-2 text-muted-foreground">
                <CreditCard className="h-4 w-4" /> Ödeme
              </dt>
              <dd className="font-medium text-primary">{order.paymentMethod}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="flex items-center gap-2 text-muted-foreground">
                <Package className="h-4 w-4" /> Adres
              </dt>
              <dd className="text-right text-xs leading-relaxed text-foreground/80">
                {order.shippingAddress}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-border/60 pt-3">
              <dt className="text-muted-foreground">Ara toplam</dt>
              <dd className="tabular-nums">
                {itemsTotal.toLocaleString("tr-TR")} ₺
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Kargo</dt>
              <dd className="tabular-nums">
                {order.shipping === 0
                  ? "Ücretsiz"
                  : `${order.shipping.toLocaleString("tr-TR")} ₺`}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-border/60 pt-3">
              <dt className="font-medium">Toplam</dt>
              <dd className="font-bold tabular-nums text-primary">
                {total.toLocaleString("tr-TR")} ₺
              </dd>
            </div>
          </dl>

          <div className="mt-5 flex flex-col gap-2">
            <Button className="w-full justify-center gap-2 rounded-full bg-primary hover:bg-primary-medium text-primary-foreground">
              Kargoyu takip et <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="w-full rounded-full">
              Faturayı indir
            </Button>
          </div>
        </aside>
      </div>
    </article>
  );
};

/* ================== PROFILE ================== */

const CITIES = ["İSTANBUL", "İZMİR", "ANKARA", "ANTALYA", "BURSA", "ADANA", "KOCAELİ", "GAZİANTEP"];

const DISTRICTS: Record<string, string[]> = {
  İSTANBUL: ["KADIKÖY", "BEŞİKTAŞ", "ŞİŞLİ", "ÜSKÜDAR", "BEYOĞLU", "FATİH", "SARIYER", "MALTEPE", "KARTAL", "ATAŞEHIR", "BAKIRKÖY", "BAĞCILAR", "BAYRAMPAŞA", "EYÜPSULTAN", "KÜÇÜKÇEKMECE", "PENDİK", "SULTANBEYLİ", "TUZLA", "ÜMRANİYE", "ZEYTINBURNU"],
  İZMİR: ["BORNOVA", "KARŞIYAKA", "KONAK", "BAYRAKLI", "ÇİĞLİ", "BUCA", "GAZİEMİR", "BALÇOVA", "NARLIDERE", "KARABAĞLAR", "MENEMEN", "TİRE", "TORBALI", "ÖDEMİŞ", "KEMALPAŞA"],
  ANKARA: ["ÇANKAYA", "KEÇİÖREN", "MAMAK", "YENİMAHALLE", "ETİMESGUT", "SİNCAN", "PURSAKLAR", "ALTINDAĞ", "GÖLBAŞI", "POLATLI"],
  ANTALYA: ["MURATPAŞA", "KONYAALTI", "KEPEZ", "AKSU", "DÖŞEMEALTI", "ALANYA", "MANAVGAT", "KAŞI", "KEMER", "SERİK"],
  BURSA: ["NİLÜFER", "OSMANGAZİ", "YILDIRIM", "GÜRSU", "KESTeL", "MUDANYA", "GEMLİK", "İNEGÖL"],
  ADANA: ["SEYHAN", "ÇUKUROVA", "YÜREĞİR", "SARIÇAM", "CEYHAN", "KOZAN", "İMAMOĞLU"],
  KOCAELİ: ["İZMİT", "GEBZE", "DARICA", "ÇAYIROVA", "DİLOVASI", "KARTEPE", "BAŞİSKELE", "GÖLCÜK", "KANDIRA"],
  GAZİANTEP: ["ŞAHİNBEY", "ŞEHİTKAMİL", "OĞUZELİ", "NİZİP", "ARABAN", "İSLAHİYE"],
};

const NEIGHBORHOODS: Record<string, Record<string, string[]>> = {
  İSTANBUL: {
    KADIKÖY: ["CAFERAĞA", "OSMANAĞA", "FENERYoLU", "GÖZTEPE", "KOŞUYOLU", "MODA", "RASIMPAŞA", "SUADIYE"],
    BEŞİKTAŞ: ["LEVENT", "ETİLER", "BEBEK", "ORTAKÖY", "ARNAVUTKÖY", "KURUÇEŞME", "SİNANPAŞA"],
    ŞİŞLİ: ["NİŞANTAŞI", "TEŞVIKIYE", "OSMANBEY", "MECIDIYEKÖY", "ESENTEPE", "FULYA", "BOMONTI"],
    ÜSKÜDAR: ["ACIBADE", "ALTUNIZADE", "BEYLERBEYI", "ÇENGELKÖY", "KUZGUNCUK", "VALİDEİ ATİK"],
    FATİH: ["SULTANAHMET", "EMİNÖNÜ", "AKSARAY", "LALELI", "BEYAZIT", "KUMKAPI", "BALAT"],
  },
  İZMİR: {
    BORNOVA: ["ERZENE", "KAZIMDIRIK", "MERKEZ", "KEMALPAŞA", "DOĞANLAR", "ALTINDAĞ"],
    KARŞIYAKA: ["BOSTANLI", "ÇİĞLİ", "MAVIŞEHIR", "AKSOY", "TERSANE", "DEMİRKÖPRÜ"],
    KONAK: ["ALSANCAK", "PASAPORT", "GÜZELYALI", "HATAY", "GÖZTEPE", "BASMANE"],
    BUCA: ["ŞİRİNYER", "KOOP", "KOZAĞAÇ", "TINAZTEPE", "ÇAMLIK"],
  },
  ANKARA: {
    ÇANKAYA: ["KIZILAY", "ÇAYYOLU", "ÜMITKÖY", "BAHÇELIEVLER", "AYRANCI", "GAZIOSMANPAŞA", "BALGAT"],
    KEÇİÖREN: ["ETLİK", "OVACIK", "KUŞCAĞIZ", "SUBAYEVLERI", "KALABA"],
    YENİMAHALLE: ["BATIKENT", "DEMETEVLER", "ÇAYYOLU", "OSTIM", "MACUNKÖY"],
  },
  ANTALYA: {
    MURATPAŞA: ["LARA", "KONYAALTI", "SIĞACIK", "MELTEM", "FENER", "GÜZELOBA"],
    KONYAALTI: ["LİMAN", "HURMA", "SARISU", "UNCALI", "ARAPSUYU"],
  },
  BURSA: {
    NİLÜFER: ["GÖRÜKLE", "BEŞEVLER", "ÖZLÜCE", "İHSANİYE", "ATAEVLER", "KONAK"],
    OSMANGAZİ: ["ÇEKIRGE", "HEYKEL", "KÜKÜRTLÜ", "DEMIRTAŞ", "SOĞANLI"],
  },
  ADANA: {
    SEYHAN: ["REŞATBEY", "DÖŞEME", "SÜMER", "BARKAL", "TELLIDERE"],
    ÇUKUROVA: ["KURTTEPE", "BELEDIYE EVLERİ", "TOROS", "SEYHAN"],
  },
  KOCAELİ: {
    İZMİT: ["KÖRFEZ", "YENİDOĞAN", "KOZLUK", "ÇARŞI", "BAHÇECİK"],
    GEBZE: ["MERKEZ", "GÜZELLER", "KINAŞLI", "OSMAN YILMAZ"],
  },
  GAZİANTEP: {
    ŞAHİNBEY: ["BARAK", "GÜNEYKENT", "PERILIKAYA", "FIDANLIK", "KARATAŞ"],
    ŞEHİTKAMİL: ["İBRAHİMLİ", "BEYAZEVLER", "BATIKENT", "KARAGÖZ"],
  },
};

const ProfileView = () => {
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [showCardDialog, setShowCardDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "bek",
    lastName: "aktas",
    email: "shizoberg@gmail.com",
    tcNo: "",
    phone: "",
    birthDate: "",
  });
  const [profileDraft, setProfileDraft] = useState(profile);

  const [addressType, setAddressType] = useState<"home" | "work">("home");
  const [addresses, setAddresses] = useState<
    { name: string; label: string; city: string; district: string; detail: string }[]
  >([]);
  const [cards, setCards] = useState([
    { last4: "4421", brand: "VISA", expiry: "09/28" },
  ]);
  const [cardForm, setCardForm] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    district: "",
    neighborhood: "",
    detail: "",
    addressLabel: "",
  });

  const resetForm = () => {
    setForm({ firstName: "", lastName: "", phone: "", city: "", district: "", neighborhood: "", detail: "", addressLabel: "" });
    setAddressType("home");
  };

  const handleSave = () => {
    if (!form.firstName.trim() || !form.city || !form.detail.trim()) {
      toast.error("Lütfen gerekli alanları doldurun.");
      return;
    }
    setAddresses((prev) => [
      ...prev,
      {
        name: `${form.firstName} ${form.lastName}`.trim(),
        label: form.addressLabel || (addressType === "home" ? "Ev" : "İş yeri"),
        city: form.city,
        district: form.district,
        detail: form.detail,
      },
    ]);
    toast.success("Adres başarıyla eklendi.");
    resetForm();
    setShowAddressDialog(false);
  };

  const formatCardNumber = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const handleSaveCard = () => {
    const digits = cardForm.number.replace(/\D/g, "");
    if (digits.length < 16 || !cardForm.name.trim() || cardForm.cvc.length < 3 || cardForm.expiry.length < 4) {
      toast.error("Lütfen tüm kart bilgilerini doldurun.");
      return;
    }
    const brand = digits.startsWith("4") ? "VISA" : digits.startsWith("5") ? "MC" : "KART";
    setCards((prev) => [...prev, { last4: digits.slice(-4), brand, expiry: formatExpiry(cardForm.expiry) }]);
    setCardForm({ number: "", name: "", expiry: "", cvc: "" });
    setShowCardDialog(false);
    toast.success("Kart başarıyla eklendi.");
  };

  const handleSaveProfile = () => {
    if (!profileDraft.firstName.trim() || !profileDraft.lastName.trim()) {
      toast.error("Ad ve soyad alanları zorunludur.");
      return;
    }
    if (!profileDraft.email.trim() || !profileDraft.email.includes("@")) {
      toast.error("Geçerli bir e-posta adresi girin.");
      return;
    }
    setProfile(profileDraft);
    setShowProfileDialog(false);
    toast.success("Bilgilerin güncellendi.");
  };

  return (
    <section>
      <SectionHeader
        eyebrow="Profil"
        title="Hesap bilgilerin"
        description="Adres ve iletişim bilgilerini buradan güncelleyebilirsin."
      />

      <div className="grid gap-5">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex-1 space-y-2">
              <p className="text-base font-semibold text-primary">
                {profile.firstName} {profile.lastName}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-primary-medium font-semibold">E-posta</p>
                  <p className="text-sm">{profile.email}</p>
                </div>
                {profile.phone && (
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-primary-medium font-semibold">Telefon</p>
                    <p className="text-sm">+90 {profile.phone}</p>
                  </div>
                )}
                {profile.tcNo && (
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-primary-medium font-semibold">T.C. Kimlik</p>
                    <p className="text-sm">{"•".repeat(7) + profile.tcNo.slice(-4)}</p>
                  </div>
                )}
                {profile.birthDate && (
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-primary-medium font-semibold">Doğum Tarihi</p>
                    <p className="text-sm">{profile.birthDate}</p>
                  </div>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary hover:bg-secondary rounded-full shrink-0"
              onClick={() => { setProfileDraft(profile); setShowProfileDialog(true); }}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Addresses */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-primary">Adresler</h3>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-primary hover:text-primary hover:bg-secondary rounded-full"
              onClick={() => { resetForm(); setShowAddressDialog(true); }}
            >
              <Plus className="h-4 w-4" /> Ekle
            </Button>
          </div>

          {addresses.length === 0 ? (
            <div className="flex items-center gap-2 rounded-xl border border-dashed border-border bg-secondary/40 px-4 py-4 text-sm text-muted-foreground">
              <Info className="h-4 w-4" /> Adres eklenmedi
            </div>
          ) : (
            <div className="grid gap-3">
              {addresses.map((a, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl bg-secondary/60 px-4 py-4">
                  <MapPin className="h-4 w-4 mt-0.5 text-primary-medium shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-primary">{a.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {a.detail}, {a.district} / {a.city}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.name}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Payment */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-primary">Ödeme yöntemleri</h3>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-primary hover:text-primary hover:bg-secondary rounded-full"
              onClick={() => { setCardForm({ number: "", name: "", expiry: "", cvc: "" }); setShowCardDialog(true); }}
            >
              <Plus className="h-4 w-4" /> Ekle
            </Button>
          </div>
          <div className="grid gap-3">
            {cards.map((c, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-secondary/60 px-4 py-4">
                <div className="flex h-9 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground text-[10px] font-bold">
                  {c.brand}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary">•••• •••• •••• {c.last4}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Son kullanım {c.expiry}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button variant="outline" className="gap-2 rounded-full">
            <LogOut className="h-4 w-4" /> Çıkış yap
          </Button>
        </div>
      </div>

      {/* ── Address Dialog ── */}
      <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
        <DialogContent className="max-w-md rounded-3xl p-0 gap-0 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle className="text-lg font-bold text-primary">Adres ekle</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Teslimat adresini buradan ekleyebilirsin.
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 pb-6 space-y-6">
            {/* Kişisel Bilgiler */}
            <div>
              <p className="text-xs font-semibold text-primary-medium uppercase tracking-widest mb-3 flex items-center gap-2">
                Kişisel Bilgileriniz
                <span className="flex-1 h-px bg-border" />
              </p>
              <p className="text-sm text-muted-foreground mb-2">Teslim alacak kişinin bilgileri</p>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <Input
                  placeholder="Ad"
                  value={form.firstName}
                  onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                  className="rounded-xl bg-secondary/50 border-0 h-11"
                />
                <Input
                  placeholder="Soyad"
                  value={form.lastName}
                  onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                  className="rounded-xl bg-secondary/50 border-0 h-11"
                />
              </div>
              <p className="text-sm text-muted-foreground mb-2">Telefon</p>
              <div className="flex items-center gap-2 rounded-xl bg-secondary/50 px-3 h-11">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-primary">+90</span>
                <Input
                  placeholder="5XX XXX XX XX"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 text-sm"
                />
              </div>
            </div>

            {/* Adres Bilgileri */}
            <div>
              <p className="text-xs font-semibold text-primary-medium uppercase tracking-widest mb-3 flex items-center gap-2">
                Adres Bilgileriniz
                <span className="flex-1 h-px bg-border" />
              </p>

              {/* Ev / İş yeri toggle */}
              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => setAddressType("home")}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                    addressType === "home"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-secondary/60 text-primary hover:bg-secondary"
                  }`}
                >
                  <Home className="h-4 w-4" /> Ev
                </button>
                <button
                  onClick={() => setAddressType("work")}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                    addressType === "work"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-secondary/60 text-primary hover:bg-secondary"
                  }`}
                >
                  <Building2 className="h-4 w-4" /> İş yeri
                </button>
              </div>

              {/* Şehir */}
              <div className="mb-3">
                <Label className="text-sm text-muted-foreground mb-1.5 block">Şehir</Label>
                <Select value={form.city} onValueChange={(v) => setForm((f) => ({ ...f, city: v, district: "", neighborhood: "" }))}>
                  <SelectTrigger className="rounded-xl bg-secondary/50 border-0 h-11">
                    <SelectValue placeholder="Şehir seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {CITIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* İlçe */}
              <div className="mb-3">
                <Label className="text-sm text-muted-foreground mb-1.5 block">İlçe</Label>
                <Select value={form.district} onValueChange={(v) => setForm((f) => ({ ...f, district: v, neighborhood: "" }))}>
                  <SelectTrigger className="rounded-xl bg-secondary/50 border-0 h-11" disabled={!form.city}>
                    <SelectValue placeholder={form.city ? "İlçe seçin" : "Önce şehir seçin"} />
                  </SelectTrigger>
                  <SelectContent>
                    {(DISTRICTS[form.city] || []).map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Mahalle */}
              <div className="mb-3">
                <Label className="text-sm text-muted-foreground mb-1.5 block">Mahalle</Label>
                <Select value={form.neighborhood} onValueChange={(v) => setForm((f) => ({ ...f, neighborhood: v }))}>
                  <SelectTrigger className="rounded-xl bg-secondary/50 border-0 h-11" disabled={!form.district}>
                    <SelectValue placeholder={form.district ? "Mahalle seçin" : "Önce ilçe seçin"} />
                  </SelectTrigger>
                  <SelectContent>
                    {(NEIGHBORHOODS[form.city]?.[form.district] || []).map((n) => (
                      <SelectItem key={n} value={n}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Adres detay */}
              <div className="mb-3">
                <Label className="text-sm text-muted-foreground mb-1.5 block">Adres</Label>
                <Textarea
                  placeholder="Bina ismi, bina numarası, kat ve daire numarası..."
                  value={form.detail}
                  onChange={(e) => setForm((f) => ({ ...f, detail: e.target.value }))}
                  className="rounded-xl bg-secondary/50 border-0 min-h-[80px] resize-none"
                  maxLength={120}
                />
                <p className="text-right text-xs text-muted-foreground mt-1">{form.detail.length}/120</p>
              </div>

              {/* Adres adı */}
              <div>
                <Label className="text-sm text-muted-foreground mb-1.5 block">Bu adrese bir ad verin</Label>
                <Input
                  placeholder="Örnek: Evim, İş yerim vb."
                  value={form.addressLabel}
                  onChange={(e) => setForm((f) => ({ ...f, addressLabel: e.target.value }))}
                  className="rounded-xl bg-secondary/50 border-0 h-11"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 pb-6 pt-2 flex gap-3">
            <Button
              variant="outline"
              className="flex-1 rounded-full"
              onClick={() => setShowAddressDialog(false)}
            >
              Vazgeç
            </Button>
            <Button className="flex-1 rounded-full" onClick={handleSave}>
              Adresi Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Card Dialog ── */}
      <Dialog open={showCardDialog} onOpenChange={setShowCardDialog}>
        <DialogContent className="max-w-md rounded-3xl p-0 gap-0">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle className="text-lg font-bold text-primary">Kart ekle</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Ödeme için kullanılacak kredi veya banka kartı bilgilerini gir.
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 pb-6 space-y-4">
            {/* Card visual */}
            <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-medium p-5 text-primary-foreground shadow-lg">
              <div className="flex justify-between items-start mb-8">
                <CreditCard className="h-7 w-7 opacity-80" />
                <p className="text-xs font-semibold opacity-70">KREDİ KARTI</p>
              </div>
              <p className="text-lg font-mono tracking-[0.2em] mb-4">
                {cardForm.number ? formatCardNumber(cardForm.number) : "•••• •••• •••• ••••"}
              </p>
              <div className="flex justify-between text-xs">
                <div className="min-w-0 flex-1 mr-4">
                  <p className="opacity-60 text-[10px]">KART SAHİBİ</p>
                  <p className="font-semibold truncate">{cardForm.name || "AD SOYAD"}</p>
                </div>
                <div className="text-right">
                  <p className="opacity-60 text-[10px]">SON KULLANIM</p>
                  <p className="font-semibold">{cardForm.expiry ? formatExpiry(cardForm.expiry) : "MM/YY"}</p>
                </div>
              </div>
            </div>

            {/* Card number */}
            <div>
              <Label className="text-sm text-muted-foreground mb-1.5 block">Kart numarası</Label>
              <Input
                placeholder="0000 0000 0000 0000"
                value={formatCardNumber(cardForm.number)}
                onChange={(e) => setCardForm((f) => ({ ...f, number: e.target.value.replace(/\D/g, "").slice(0, 16) }))}
                className="rounded-xl bg-secondary/50 border-0 h-11 font-mono tracking-wider"
                maxLength={19}
              />
            </div>

            {/* Card holder */}
            <div>
              <Label className="text-sm text-muted-foreground mb-1.5 block">Kart üzerindeki isim</Label>
              <Input
                placeholder="Ad Soyad"
                value={cardForm.name}
                onChange={(e) => setCardForm((f) => ({ ...f, name: e.target.value }))}
                className="rounded-xl bg-secondary/50 border-0 h-11"
              />
            </div>

            {/* Expiry + CVC */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm text-muted-foreground mb-1.5 block">Son kullanım</Label>
                <Input
                  placeholder="MM/YY"
                  value={formatExpiry(cardForm.expiry)}
                  onChange={(e) => setCardForm((f) => ({ ...f, expiry: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                  className="rounded-xl bg-secondary/50 border-0 h-11"
                  maxLength={5}
                />
              </div>
              <div>
                <Label className="text-sm text-muted-foreground mb-1.5 block">CVC</Label>
                <Input
                  placeholder="•••"
                  value={cardForm.cvc}
                  onChange={(e) => setCardForm((f) => ({ ...f, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                  className="rounded-xl bg-secondary/50 border-0 h-11"
                  maxLength={4}
                  type="password"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 pb-6 pt-2 flex gap-3">
            <Button variant="outline" className="flex-1 rounded-full" onClick={() => setShowCardDialog(false)}>
              Vazgeç
            </Button>
            <Button className="flex-1 rounded-full" onClick={handleSaveCard}>
              Kartı Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Profile Edit Dialog ── */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="max-w-md rounded-3xl p-0 gap-0 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle className="text-lg font-bold text-primary">Bilgilerini Güncelle</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Deneyimini sana göre şekillendirebilmemiz için bilgilerini buradan düzenleyebilirsin.
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 pb-6 space-y-4">
            <div>
              <Label className="text-sm text-muted-foreground mb-1.5 block">Adın *</Label>
              <Input
                placeholder="Adın"
                value={profileDraft.firstName}
                onChange={(e) => setProfileDraft((f) => ({ ...f, firstName: e.target.value }))}
                className="rounded-xl bg-secondary/50 border-0 h-11"
              />
            </div>

            <div>
              <Label className="text-sm text-muted-foreground mb-1.5 block">Soyadın *</Label>
              <Input
                placeholder="Soyadın"
                value={profileDraft.lastName}
                onChange={(e) => setProfileDraft((f) => ({ ...f, lastName: e.target.value }))}
                className="rounded-xl bg-secondary/50 border-0 h-11"
              />
            </div>

            <div>
              <Label className="text-sm text-muted-foreground mb-1.5 block">E-mail Adresin *</Label>
              <Input
                placeholder="ornek@email.com"
                type="email"
                value={profileDraft.email}
                onChange={(e) => setProfileDraft((f) => ({ ...f, email: e.target.value }))}
                className="rounded-xl bg-secondary/50 border-0 h-11"
              />
            </div>

            <div>
              <Label className="text-sm text-muted-foreground mb-1.5 block">T.C. Kimlik Numaran</Label>
              <Input
                placeholder="T.C. Kimlik Numaran"
                value={profileDraft.tcNo}
                onChange={(e) => setProfileDraft((f) => ({ ...f, tcNo: e.target.value.replace(/\D/g, "").slice(0, 11) }))}
                className="rounded-xl bg-secondary/50 border-0 h-11"
                maxLength={11}
              />
            </div>

            <div>
              <Label className="text-sm text-muted-foreground mb-1.5 block">Telefon Numaran</Label>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-xl bg-secondary/50 px-3 h-11 shrink-0">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-primary">+90</span>
                </div>
                <Input
                  placeholder="5XX XXX XX XX"
                  value={profileDraft.phone}
                  onChange={(e) => setProfileDraft((f) => ({ ...f, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                  className="rounded-xl bg-secondary/50 border-0 h-11 flex-1"
                  maxLength={10}
                />
              </div>
            </div>

            <div>
              <Label className="text-sm text-muted-foreground mb-1.5 block">Doğum Tarihin</Label>
              <Input
                type="date"
                value={profileDraft.birthDate}
                onChange={(e) => setProfileDraft((f) => ({ ...f, birthDate: e.target.value }))}
                className="rounded-xl bg-secondary/50 border-0 h-11"
              />
            </div>
          </div>

          <DialogFooter className="px-6 pb-6 pt-2 flex gap-3">
            <Button variant="outline" className="flex-1 rounded-full" onClick={() => setShowProfileDialog(false)}>
              Vazgeç
            </Button>
            <Button className="flex-1 rounded-full" onClick={handleSaveProfile}>
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

/* ================== EMPTY STATE ================== */

const EmptyState = ({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}) => (
  <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-card px-6 py-20 text-center shadow-sm">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-primary">{title}</h3>
    <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
    {action}
  </div>
);

export default Profil;
