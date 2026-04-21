import { Link } from "react-router-dom";

/**
 * Ana sayfa — alternatif landing'lere yönlendirme.
 * Mevcut ana sayfanı korumak için boş tutuldu; gerçek balance sayfası /balance rotasında.
 */
const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-3xl font-extrabold text-foreground">Alternatif Sayfalar</h1>
        <p className="text-muted-foreground">
          Bu projedeki landing page'lerden birini görmek için aşağıdaki bağlantıyı kullan.
        </p>
        <Link
          to="/balance"
          className="inline-flex items-center justify-center bg-primary text-primary-foreground font-bold py-3 px-6 rounded-full hover:bg-primary-medium transition-colors"
        >
          .ki Balance landing page →
        </Link>
      </div>
    </div>
  );
};

export default Index;
