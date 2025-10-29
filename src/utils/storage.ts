import { Product, Transaction } from "@/types";

// Product Storage
export const getProducts = (): Product[] => {
  const products = localStorage.getItem("products");
  return products ? JSON.parse(products) : [];
};

export const saveProduct = (product: Product): void => {
  const products = getProducts();
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
};

export const updateProduct = (id: string, updates: Partial<Product>): void => {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updates };
    localStorage.setItem("products", JSON.stringify(products));
  }
};

export const deleteProduct = (id: string): void => {
  const products = getProducts().filter((p) => p.id !== id);
  localStorage.setItem("products", JSON.stringify(products));
};

// Transaction Storage
export const getTransactions = (): Transaction[] => {
  const transactions = localStorage.getItem("transactions");
  return transactions ? JSON.parse(transactions) : [];
};

export const saveTransaction = (transaction: Transaction): void => {
  const transactions = getTransactions();
  transactions.unshift(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

// WhatsApp Message Generator
export const generateWhatsAppMessage = (transaction: Transaction): string => {
  const itemsList = transaction.items
    .map((item) => `${item.name} x${item.quantity} - Rp ${(item.price * item.quantity).toLocaleString("id-ID")}`)
    .join("\n");

  return `*STRUK PEMBAYARAN KEDAI ARUNIKA*\n` +
    `*Terima Kasih Telah Berbelanja!*\n\n` +
    `Tanggal: ${new Date(transaction.date).toLocaleString("id-ID")}\n` +
    `No. Transaksi: ${transaction.id}\n\n` +
    `*Detail Pesanan:*\n${itemsList}\n\n` +
    `*Total: Rp ${transaction.total.toLocaleString("id-ID")}*\n\n` +
    `Metode Pembayaran: ${transaction.paymentMethod}\n` +
    `Status: ${transaction.paymentStatus}\n\n` +
    `KEDAI ARUNIKA! 🙏` + 
    `\nAlamat Barumadehe, Kao Teluk,Kabupaten Halmahera Utara, Maluku Utara`; 
};

export const sendWhatsAppMessage = (phoneNumber: string, message: string): void => {
  // Format nomor telepon (hapus karakter non-digit, tambahkan 62 jika dimulai dengan 0)
  let formattedPhone = phoneNumber.replace(/\D/g, "");
  if (formattedPhone.startsWith("0")) {
    formattedPhone = "62" + formattedPhone.substring(1);
  } else if (!formattedPhone.startsWith("62")) {
    formattedPhone = "62" + formattedPhone;
  }

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank");
};
