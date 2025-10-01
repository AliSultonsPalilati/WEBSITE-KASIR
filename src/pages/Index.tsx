import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, TrendingUp, Package, BarChart3 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-3xl mb-6">
              <ShoppingCart className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Sistem Kasir Modern
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Kelola bisnis Anda dengan mudah menggunakan sistem kasir yang profesional, 
              responsif, dan user-friendly
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate("/register")} 
                className="btn-primary text-lg px-8 py-6"
              >
                Mulai Sekarang
              </Button>
              <Button 
                onClick={() => navigate("/login")} 
                variant="outline" 
                className="text-lg px-8 py-6 border-2"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Fitur Unggulan</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card-elegant text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Bayar Pesanan</h3>
            <p className="text-muted-foreground">
              Proses transaksi dengan cepat dan mudah dengan antarmuka yang intuitif
            </p>
          </div>

          <div className="card-elegant text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mx-auto mb-4">
              <Package className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Kelola Produk</h3>
            <p className="text-muted-foreground">
              Tambah, edit, dan kelola inventori produk Anda dengan sistem yang terorganisir
            </p>
          </div>

          <div className="card-elegant text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Laporan Penjualan</h3>
            <p className="text-muted-foreground">
              Monitor performa bisnis dengan laporan dan analisis yang detail
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
