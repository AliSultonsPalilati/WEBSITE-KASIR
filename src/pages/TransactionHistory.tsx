import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, Calendar, DollarSign } from "lucide-react";

const mockTransactions = [
  { id: "1", date: "2025-01-15 14:30", items: 3, total: 150000 },
  { id: "2", date: "2025-01-15 13:15", items: 2, total: 85000 },
  { id: "3", date: "2025-01-15 11:45", items: 5, total: 275000 },
  { id: "4", date: "2025-01-14 16:20", items: 1, total: 45000 },
  { id: "5", date: "2025-01-14 15:10", items: 4, total: 198000 },
];

const TransactionHistory = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Riwayat Transaksi</h1>
        <p className="text-muted-foreground">Lihat semua transaksi yang telah dilakukan</p>
      </div>

      <Card className="card-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Daftar Transaksi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Transaksi #{transaction.id}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {transaction.items} item
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span className="text-lg font-bold text-primary">
                      Rp {transaction.total.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionHistory;
