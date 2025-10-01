import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, TrendingUp, Package, DollarSign, Calendar } from "lucide-react";
import { getTransactions } from "@/utils/storage";
import { Transaction } from "@/types";

type TimeFilter = "daily" | "weekly" | "monthly";

const SalesReports = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("daily");

  useEffect(() => {
    setTransactions(getTransactions());
  }, []);

  const filteredData = useMemo(() => {
    const now = new Date();
    let startDate = new Date();

    switch (timeFilter) {
      case "daily":
        startDate.setHours(0, 0, 0, 0);
        break;
      case "weekly":
        startDate.setDate(now.getDate() - 7);
        break;
      case "monthly":
        startDate.setMonth(now.getMonth() - 1);
        break;
    }

    return transactions.filter(
      (t) => new Date(t.date) >= startDate
    );
  }, [transactions, timeFilter]);

  const stats = useMemo(() => {
    const totalSales = filteredData.reduce((sum, t) => sum + t.total, 0);
    const totalTransactions = filteredData.length;
    const totalItems = filteredData.reduce(
      (sum, t) => sum + t.items.reduce((s, i) => s + i.quantity, 0),
      0
    );
    const avgTransaction = totalTransactions > 0 ? totalSales / totalTransactions : 0;

    return { totalSales, totalTransactions, totalItems, avgTransaction };
  }, [filteredData]);

  const dailyBreakdown = useMemo(() => {
    const breakdown: { [key: string]: number } = {};

    filteredData.forEach((t) => {
      const date = new Date(t.date).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
      });
      breakdown[date] = (breakdown[date] || 0) + t.total;
    });

    return Object.entries(breakdown)
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
      .slice(-7);
  }, [filteredData]);

  const maxSales = Math.max(...dailyBreakdown.map(([, sales]) => sales), 1);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Laporan Penjualan</h1>
          <p className="text-muted-foreground">Analisis performa penjualan</p>
        </div>

        <div className="w-full md:w-64">
          <Select value={timeFilter} onValueChange={(v) => setTimeFilter(v as TimeFilter)}>
            <SelectTrigger className="input-elegant">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Hari Ini
                </div>
              </SelectItem>
              <SelectItem value="weekly">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  7 Hari Terakhir
                </div>
              </SelectItem>
              <SelectItem value="monthly">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  30 Hari Terakhir
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="card-elegant">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Penjualan</p>
                <p className="text-2xl font-bold">
                  Rp {Math.round(stats.totalSales / 1000)}K
                </p>
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
                <p className="text-2xl font-bold">{stats.totalTransactions}</p>
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
                <p className="text-sm text-muted-foreground mb-1">Item Terjual</p>
                <p className="text-2xl font-bold">{stats.totalItems}</p>
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
                <p className="text-2xl font-bold">
                  Rp {Math.round(stats.avgTransaction / 1000)}K
                </p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Grafik Penjualan
          </CardTitle>
        </CardHeader>
        <CardContent>
          {dailyBreakdown.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Tidak ada data untuk periode ini
            </p>
          ) : (
            <div className="space-y-4">
              {dailyBreakdown.map(([date, sales]) => (
                <div key={date} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{date}</span>
                    <span className="text-sm font-bold text-primary">
                      Rp {sales.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(sales / maxSales) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesReports;
