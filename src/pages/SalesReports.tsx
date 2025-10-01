import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Package, DollarSign } from "lucide-react";

const SalesReports = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Laporan Penjualan</h1>
        <p className="text-muted-foreground">Analisis performa penjualan Anda</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="card-elegant">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Penjualan</p>
                <p className="text-2xl font-bold">Rp 753K</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Transaksi</p>
                <p className="text-2xl font-bold">15</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Produk Terjual</p>
                <p className="text-2xl font-bold">48</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-secondary/30 rounded-lg">
                <Package className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Rata-rata</p>
                <p className="text-2xl font-bold">Rp 50K</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="card-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Penjualan Harian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { day: "Senin", sales: 125000 },
              { day: "Selasa", sales: 98000 },
              { day: "Rabu", sales: 156000 },
              { day: "Kamis", sales: 134000 },
              { day: "Jumat", sales: 240000 },
            ].map((item) => (
              <div key={item.day} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.day}</span>
                  <span className="text-sm font-bold text-primary">
                    Rp {item.sales.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${(item.sales / 240000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesReports;
