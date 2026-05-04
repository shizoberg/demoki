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
} from "lucide-react";
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
    const next: SubscriptionStatus = s.status === "active" ? "paused" : "active";
    updateSub(s.id, { status: next });
    toast.success(
      next === "paused" ? "Abonelik duraklatıldı" : "Abonelik devam ediyor",
    );
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
                Hesabım
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
            onEdit={setEditing}
            onTogglePause={togglePause}
            onCancel={(id) => setConfirmCancel(id)}
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
                <div className="grid gap-2">
                  <Label>Teslimat sıklığı</Label>
                  <Select
                    value={editing.frequency}
                    onValueChange={(v) =>
                      setEditing({
                        ...editing,
                        frequency: v as Subscription["frequency"],
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(FREQ_LABEL) as Subscription["frequency"][]).map(
                        (k) => (
                          <SelectItem key={k} value={k}>
                            {FREQ_LABEL[k]}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
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
                              updateItemQty(editing.id, it.id, it.qty - 1);
                              setEditing({
                                ...editing,
                                items: editing.items.map((x) =>
                                  x.id === it.id
                                    ? { ...x, qty: Math.max(0, x.qty - 1) }
                                    : x,
                                ),
                              });
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
}: {
  subs: Subscription[];
  onEdit: (s: Subscription) => void;
  onTogglePause: (s: Subscription) => void;
  onCancel: (id: string) => void;
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
}: {
  sub: Subscription;
  onEdit: () => void;
  onTogglePause: () => void;
  onCancel: () => void;
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

const ProfileView = () => (
  <section>
    <SectionHeader
      eyebrow="Profil"
      title="Hesap bilgilerin"
      description="Adres ve iletişim bilgilerini buradan güncelleyebilirsin."
    />

    <div className="grid gap-5">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-semibold text-primary">bek aktas</p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-primary-medium font-semibold">
              E-posta
            </p>
            <p className="text-sm mt-1">shizoberg@gmail.com</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary hover:bg-secondary rounded-full"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-primary">Adresler</h3>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-primary hover:text-primary hover:bg-secondary rounded-full"
          >
            <Plus className="h-4 w-4" /> Ekle
          </Button>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-dashed border-border bg-secondary/40 px-4 py-4 text-sm text-muted-foreground">
          <Info className="h-4 w-4" /> Adres eklenmedi
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-primary">Ödeme yöntemleri</h3>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-primary hover:text-primary hover:bg-secondary rounded-full"
          >
            <Plus className="h-4 w-4" /> Ekle
          </Button>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-secondary/60 px-4 py-4">
          <div className="flex h-9 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground text-[10px] font-bold">
            VISA
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-primary">•••• •••• •••• 4421</p>
            <p className="text-xs text-muted-foreground mt-0.5">Son kullanım 09/28</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button variant="outline" className="gap-2 rounded-full">
          <LogOut className="h-4 w-4" /> Çıkış yap
        </Button>
        <Button variant="ghost" className="text-muted-foreground rounded-full">
          Tüm cihazlardan çıkış yap
        </Button>
      </div>
    </div>
  </section>
);

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
