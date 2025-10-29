import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Package, Trash2 } from "lucide-react";
import { saveProduct, getProducts, deleteProduct } from "@/utils/storage";
import { Product } from "@/types";

const CATEGORIES = ["Jus", "Milkshake", "Kelapa", "Lainnya"];

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState<Product[]>(getProducts());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !stock || !category) {
      toast.error("Nama, harga, stok, dan kategori harus diisi");
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      price: parseFloat(price),
      stock: parseInt(stock),
      category,
      description,
      createdAt: new Date().toISOString(),
    };

    saveProduct(newProduct);
    setProducts(getProducts());
    toast.success("Produk berhasil ditambahkan!");
    
    setName("");
    setPrice("");
    setStock("");
    setCategory("");
    setDescription("");
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setProducts(getProducts());
    toast.success("Produk berhasil dihapus!");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Tambah Produk</h1>
        <p className="text-muted-foreground">Tambahkan produk baru ke inventori</p>
      </div>

      <Card className="card-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Informasi Produk
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Produk</Label>
                <Input
                  id="name"
                  placeholder="Masukkan nama produk"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-elegant"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Harga (Rp)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="input-elegant"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stok</Label>
              <Input
                id="stock"
                type="number"
                placeholder="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="input-elegant"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Kategori</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="input-elegant">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi (Opsional)</Label>
              <Textarea
                id="description"
                placeholder="Masukkan deskripsi produk"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-elegant min-h-[120px]"
              />
            </div>

            <Button type="submit" className="w-full btn-primary">
              Simpan Produk
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Daftar Produk */}
      {products.length > 0 && (
        <Card className="card-elegant mt-6">
          <CardHeader>
            <CardTitle>Daftar Produk Tersimpan ({products.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Rp {product.price.toLocaleString("id-ID")} • Stok: {product.stock} • {product.category}
                    </p>
                  </div>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AddProduct;
