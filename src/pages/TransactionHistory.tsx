import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History, Calendar, DollarSign, User, Phone, CreditCard } from "lucide-react";
import { getTransactions } from "@/utils/storage";
import { Transaction } from "@/types";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    setTransactions(getTransactions());
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Lunas":
        return "bg-green-500/10 text-green-700 border-green-500/20";
      case "Pending":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20";
      case "Dibatalkan":
        return "bg-red-500/10 text-red-700 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500/20";
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Riwayat Transaksi</h1>
        <p className="text-muted-foreground">
          Total {transactions.length} transaksi
        </p>
      </div>

      <div className="space-y-4">
        {transactions.length === 0 ? (
          <Card className="card-elegant">
            <CardContent className="py-12">
              <p className="text-center text-muted-foreground">
                Belum ada transaksi
              </p>
            </CardContent>
          </Card>
        ) : (
          transactions.map((transaction) => (
            <Card key={transaction.id} className="card-elegant hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Transaksi #{transaction.id}</CardTitle>
                  <Badge className={getStatusColor(transaction.paymentStatus)}>
                    {transaction.paymentStatus}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Tanggal:</span>
                      <span className="font-medium">
                        {new Date(transaction.date).toLocaleString("id-ID")}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Pelanggan:</span>
                      <span className="font-medium">{transaction.customerName}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">WhatsApp:</span>
                      <span className="font-medium">{transaction.customerPhone}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CreditCard className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Metode:</span>
                      <span className="font-medium">{transaction.paymentMethod}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Total:</span>
                      <span className="font-bold text-primary text-lg">
                        Rp {transaction.total.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Detail Items */}
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm font-semibold mb-2">Detail Pesanan:</p>
                  <div className="space-y-1">
                    {transaction.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between text-sm bg-muted/20 p-2 rounded"
                      >
                        <span>
                          {item.name} x{item.quantity}
                        </span>
                        <span className="font-medium">
                          Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
