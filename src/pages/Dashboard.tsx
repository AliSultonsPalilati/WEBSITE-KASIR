import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const Dashboard = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const addItem = () => {
    if (!productName || !productPrice) {
      toast.error("Nama produk dan harga harus diisi");
      return;
    }

    const newItem: OrderItem = {
      id: Date.now().toString(),
      name: productName,
      price: parseFloat(productPrice),
      quantity: 1,
    };

    setOrderItems([...orderItems, newItem]);
    setProductName("");
    setProductPrice("");
    toast.success("Produk ditambahkan");
  };

  const updateQuantity = (id: string, change: number) => {
    setOrderItems(
      orderItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setOrderItems(orderItems.filter((item) => item.id !== id));
    toast.success("Produk dihapus");
  };

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (orderItems.length === 0) {
      toast.error("Keranjang masih kosong");
      return;
    }

    const total = calculateTotal();
    toast.success(`Pembayaran berhasil! Total: Rp ${total.toLocaleString("id-ID")}`);
    setOrderItems([]);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Bayar Pesanan</h1>
        <p className="text-muted-foreground">Tambahkan produk dan proses pembayaran</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Produk */}
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Tambah Produk ke Pesanan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="productName">Nama Produk</Label>
              <Input
                id="productName"
                placeholder="Masukkan nama produk"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="input-elegant"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productPrice">Harga (Rp)</Label>
              <Input
                id="productPrice"
                type="number"
                placeholder="0"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="input-elegant"
              />
            </div>

            <Button onClick={addItem} className="w-full btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Tambah ke Pesanan
            </Button>
          </CardContent>
        </Card>

        {/* Daftar Pesanan */}
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle>Daftar Pesanan</CardTitle>
          </CardHeader>
          <CardContent>
            {orderItems.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Belum ada produk dalam pesanan
              </p>
            ) : (
              <div className="space-y-3">
                {orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Rp {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="h-8 w-8"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-border mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-primary">
                      Rp {calculateTotal().toLocaleString("id-ID")}
                    </span>
                  </div>
                  <Button onClick={handleCheckout} className="w-full btn-primary">
                    Proses Pembayaran
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
