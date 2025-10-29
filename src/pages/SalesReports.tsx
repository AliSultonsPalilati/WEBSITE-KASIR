import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, TrendingUp, Package, DollarSign, Calendar, ArrowUp, ArrowDown } from "lucide-react";
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
    const startDate = new Date();

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

  // Top selling products
  const topProducts = useMemo(() => {
    const productSales: { [key: string]: { name: string; quantity: number; revenue: number } } = {};

    filteredData.forEach((t) => {
      t.items.forEach((item) => {
        if (!productSales[item.name]) {
          productSales[item.name] = { name: item.name, quantity: 0, revenue: 0 };
        }
        productSales[item.name].quantity += item.quantity;
        productSales[item.name].revenue += item.price * item.quantity;
      });
    });

    return Object.values(productSales)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [filteredData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Laporan Penjualan</h1>
              </div>
              <p className="text-gray-600 ml-[52px]">Analisis dan monitoring performa penjualan Anda</p>
            </div>

            <div className="w-full md:w-64">
              <Select value={timeFilter} onValueChange={(v) => setTimeFilter(v as TimeFilter)}>
                <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">
                    <div className="flex items-center gap-2 py-1">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">Hari Ini</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="weekly">
                    <div className="flex items-center gap-2 py-1">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">7 Hari Terakhir</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="monthly">
                    <div className="flex items-center gap-2 py-1">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">30 Hari Terakhir</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300 bg-gradient-to-br from-white to-blue-50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-sm font-medium text-gray-600">Total Penjualan</p>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    Rp {(stats.totalSales / 1000).toFixed(0)}K
                  </p>
                  <p className="text-xs text-gray-500">
                    {stats.totalTransactions} transaksi
                  </p>
                </div>
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl shadow-md">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300 bg-gradient-to-br from-white to-purple-50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-sm font-medium text-gray-600">Total Transaksi</p>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    {stats.totalTransactions}
                  </p>
                  <p className="text-xs text-gray-500">
                    Transaksi selesai
                  </p>
                </div>
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-400 rounded-xl shadow-md">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300 bg-gradient-to-br from-white to-green-50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-sm font-medium text-gray-600">Item Terjual</p>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    {stats.totalItems}
                  </p>
                  <p className="text-xs text-gray-500">
                    Total produk
                  </p>
                </div>
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-400 rounded-xl shadow-md">
                  <Package className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300 bg-gradient-to-br from-white to-orange-50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-sm font-medium text-gray-600">Rata-rata</p>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    Rp {(stats.avgTransaction / 1000).toFixed(0)}K
                  </p>
                  <p className="text-xs text-gray-500">
                    Per transaksi
                  </p>
                </div>
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-400 rounded-xl shadow-md">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <Card className="lg:col-span-2 border-0 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Grafik Penjualan Harian</h3>
                  <p className="text-sm text-gray-500 font-normal">Tren penjualan dalam periode waktu</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {dailyBreakdown.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <BarChart3 className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">Tidak ada data untuk periode ini</p>
                  <p className="text-sm text-gray-400 mt-1">Mulai transaksi untuk melihat laporan</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {dailyBreakdown.map(([date, sales], index) => (
                    <div key={date} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-gray-900 min-w-[70px]">{date}</span>
                          <span className="text-xs text-gray-500">
                            {((sales / maxSales) * 100).toFixed(0)}% dari maksimal
                          </span>
                        </div>
                        <span className="text-sm font-bold text-blue-600">
                          Rp {sales.toLocaleString("id-ID")}
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-3 rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-blue-500 to-cyan-400 shadow-sm"
                          style={{ 
                            width: `${(sales / maxSales) * 100}%`,
                            transitionDelay: `${index * 50}ms`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-400 rounded-lg">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Produk Terlaris</h3>
                  <p className="text-sm text-gray-500 font-normal">Top 5 produk</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {topProducts.length === 0 ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-3">
                    <Package className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm">Belum ada data produk</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div 
                      key={product.name} 
                      className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-cyan-50 transition-all duration-300 border border-gray-100"
                    >
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg shadow-sm">
                        <span className="text-white font-bold text-sm">#{index + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate text-sm">{product.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-gray-600">{product.quantity} terjual</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs font-semibold text-blue-600">
                            Rp {(product.revenue / 1000).toFixed(0)}K
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SalesReports;