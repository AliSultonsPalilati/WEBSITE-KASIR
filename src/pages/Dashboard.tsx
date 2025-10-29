import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Minus, Trash2, ShoppingBag, Search, Send } from "lucide-react";
import { getProducts, saveTransaction, generateWhatsAppMessage, sendWhatsAppMessage } from "@/utils/storage";
import { Product, OrderItem, Transaction } from "@/types";

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    const loadedProducts = getProducts();
    setProducts(loadedProducts);
    setFilteredProducts(loadedProducts);
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, categoryFilter, products]);

  const addToCart = (product: Product) => {
    if (product.stock === 0) {
      toast.error("Produk habis!");
      return;
    }

    const existingItem = orderItems.find((item) => item.productId === product.id);

    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        toast.error("Stok tidak mencukupi!");
        return;
      }
      setOrderItems(
        orderItems.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      const newItem: OrderItem = {
        id: Date.now().toString(),
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      };
      setOrderItems([...orderItems, newItem]);
    }
    toast.success(`${product.name} ditambahkan ke keranjang`);
  };

  const updateQuantity = (id: string, change: number) => {
    const item = orderItems.find((i) => i.id === id);
    const product = products.find((p) => p.id === item?.productId);

    if (item && product) {
      const newQuantity = item.quantity + change;
      if (newQuantity > product.stock) {
        toast.error("Stok tidak mencukupi!");
        return;
      }
      if (newQuantity < 1) return;

      setOrderItems(
        orderItems.map((i) =>
          i.id === id ? { ...i, quantity: newQuantity } : i
        )
      );
    }
  };

  const removeItem = (id: string) => {
    setOrderItems(orderItems.filter((item) => item.id !== id));
    toast.success("Produk dihapus dari keranjang");
  };

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (orderItems.length === 0) {
      toast.error("Keranjang masih kosong");
      return;
    }

    if (!customerName || !customerPhone || !paymentMethod) {
      toast.error("Nama, nomor WhatsApp, dan metode pembayaran harus diisi");
      return;
    }

    const transaction: Transaction = {
      id: `TRX${Date.now()}`,
      date: new Date().toISOString(),
      items: orderItems,
      total: calculateTotal(),
      customerName,
      customerPhone,
      paymentMethod,
      paymentStatus: "Lunas",
    };

    saveTransaction(transaction);

    // Generate dan kirim WhatsApp
    const message = generateWhatsAppMessage(transaction);
    sendWhatsAppMessage(customerPhone, message);

    toast.success("Pembayaran berhasil! Struk akan dikirim ke WhatsApp.");
    
    setOrderItems([]);
    setCustomerName("");
    setCustomerPhone("");
    setPaymentMethod("");
  };

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Bayar Pesanan</h1>
        <p className="text-muted-foreground">Pilih produk dan proses pembayaran</p>
      </div>

      {/* Ringkasan Total - Always Visible */}
      <div className="sticky top-0 z-10 bg-primary text-primary-foreground p-4 rounded-lg mb-6 shadow-lg">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total Pesanan:</span>
          <span className="text-2xl font-bold">
            Rp {calculateTotal().toLocaleString("id-ID")}
          </span>
        </div>
        <p className="text-sm mt-1 opacity-90">{orderItems.length} item dalam keranjang</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pilih Produk */}
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Pilih Produk
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search & Filter */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Cari produk..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-elegant pl-10"
                />
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="input-elegant">
                  <SelectValue placeholder="Filter kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  {categories
                    .filter((c) => c !== "all")
                    .map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Product List */}
            <div className="max-h-[500px] overflow-y-auto space-y-2">
              {filteredProducts.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  {products.length === 0
                    ? "Belum ada produk. Tambahkan produk terlebih dahulu."
                    : "Produk tidak ditemukan."}
                </p>
              ) : (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Rp {product.price.toLocaleString("id-ID")} • Stok: {product.stock}
                      </p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className="btn-primary"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Keranjang & Checkout */}
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle>Keranjang Belanja</CardTitle>
          </CardHeader>
          <CardContent>
            {orderItems.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Keranjang masih kosong
              </p>
            ) : (
              <div className="space-y-4">
                {/* Cart Items */}
                <div className="max-h-[300px] overflow-y-auto space-y-3">
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
                </div>

                {/* Customer Info */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Nama Pelanggan</Label>
                    <Input
                      id="customerName"
                      placeholder="Masukkan nama pelanggan"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="input-elegant"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customerPhone">Nomor WhatsApp</Label>
                    <Input
                      id="customerPhone"
                      placeholder="08xxxxxxxxxx"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="input-elegant"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">Metode Pembayaran</Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger className="input-elegant">
                        <SelectValue placeholder="Pilih metode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tunai">Tunai</SelectItem>
                        <SelectItem value="Transfer Bank">Transfer Bank</SelectItem>
                        <SelectItem value="QRIS">QRIS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Total & Checkout */}
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-primary">
                      Rp {calculateTotal().toLocaleString("id-ID")}
                    </span>
                  </div>
                  <Button onClick={handleCheckout} className="w-full btn-primary">
                    <Send className="w-4 h-4 mr-2" />
                    Proses & Kirim ke WhatsApp
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
