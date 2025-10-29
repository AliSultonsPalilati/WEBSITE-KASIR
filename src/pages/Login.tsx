import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ShoppingCart, Mail, Lock, ArrowRight } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi login
    setTimeout(() => {
      if (email && password) {
        localStorage.setItem("user", JSON.stringify({ 
          email, 
          name: email.split("@")[0],
          phone: "10584110222"
        }));
        toast.success("Selamat datang! Login berhasil 🎉");
        navigate("/dashboard");
      } else {
        toast.error("Email dan password harus diisi");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl mb-6 shadow-xl shadow-blue-200 animate-bounce-slow">
            <ShoppingCart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Sistem Kasir Arunika</h1>
          <p className="text-gray-600 text-lg">Selamat datang kembali! 👋</p>
          <p className="text-gray-500 text-sm mt-1">Masuk untuk melanjutkan</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100/50 p-8 border border-gray-100">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-semibold flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" />
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="contoh: nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 pl-4 pr-4 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400 transition-all bg-gray-50 focus:bg-white"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 ml-1">Masukkan email yang terdaftar</p>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-semibold flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-500" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password Anda"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pl-4 pr-4 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400 transition-all bg-gray-50 focus:bg-white"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 ml-1">Minimal 6 karakter</p>
            </div>

            {/* Remember & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-400" />
                <span className="text-gray-600">Ingat saya</span>
              </label>
              <Link to="/forgot-password" className="text-blue-500 font-medium hover:text-blue-600 hover:underline transition-colors">
                Lupa password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-300 flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Memproses...
                </span>
              ) : (
                <>
                  Masuk Sekarang
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">atau</span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-600 mb-3">
              Belum punya akun?
            </p>
            <Link 
              to="/register" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-900 font-semibold rounded-xl transition-all duration-300 border border-gray-200 hover:border-gray-300"
            >
              Daftar Akun Baru
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Dengan masuk, Anda menyetujui{" "}
            <a href="#" className="text-blue-500 hover:underline">Syarat & Ketentuan</a>
            {" "}dan{" "}
            <a href="#" className="text-blue-500 hover:underline">Kebijakan Privasi</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;