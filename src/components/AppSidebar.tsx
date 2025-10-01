import { useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { 
  ShoppingCart, 
  CreditCard, 
  Package, 
  History, 
  BarChart3, 
  LogOut,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const menuItems = [
  { title: "Bayar Pesanan", url: "/dashboard", icon: CreditCard },
  { title: "Tambah Produk", url: "/dashboard/add-product", icon: Package },
  { title: "Riwayat Transaksi", url: "/dashboard/history", icon: History },
  { title: "Laporan Penjualan", url: "/dashboard/reports", icon: BarChart3 },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Berhasil logout");
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-sidebar-accent rounded-lg">
            <ShoppingCart className="w-5 h-5 text-sidebar-accent-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-sidebar-foreground">Sistem Kasir</h2>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 py-3 text-sidebar-foreground/70 text-xs uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Login sebagai {user.name || "Pengguna"}
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.url)}
                    isActive={isActive(item.url)}
                    className={`mx-3 rounded-lg transition-all duration-200 ${
                      isActive(item.url)
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground rounded-lg"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
