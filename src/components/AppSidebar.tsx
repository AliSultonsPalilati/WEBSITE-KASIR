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
    <Sidebar className="border-r border-gray-200 shadow-lg bg-white">
      <SidebarHeader className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl shadow-md">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Sistem Kasir</h2>
            <p className="text-xs text-gray-500">Arunika</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5" />
              <span>Login sebagai</span>
            </div>
          </SidebarGroupLabel>
          
          <div className="mb-2 px-4 py-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100 h-[68px] flex flex-col justify-center">
            <p className="text-sm font-semibold text-gray-900">{user.name || "Pengguna"}</p>
            <p className="text-xs text-gray-600 mt-0.5">{user.phone || "10584110222"}</p>
          </div>

          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.url)}
                    isActive={isActive(item.url)}
                    className={`
                      px-4 py-4 rounded-xl transition-all duration-200 font-medium h-[68px] flex items-center
                      ${
                        isActive(item.url)
                          ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }
                    `}
                  >
                    <item.icon className={`w-5 h-5 ${isActive(item.url) ? '' : 'text-gray-500'}`} />
                    <span className="ml-3">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-100">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl py-3 font-medium transition-all duration-200"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Log Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}