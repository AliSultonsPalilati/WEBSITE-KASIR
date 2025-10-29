import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ShoppingCart, User, Mail, Lock, ArrowRight, CheckCircle2 } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi register
    setTimeout(() => {
      if (name && email && password) {
        toast.success("Pendaftaran berhasil! Silakan login 🎉");
        navigate("/login");
      } else {
        toast.error("Semua field harus diisi");
      }
      setIsLoading(false);
    }, 1000);
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    if (password.length === 0) return { strength: 0, text: "", color: "" };
    if (password.length < 6) return { strength: 33, text: "Lemah", color: "bg-red-500" };
    if (password.length < 10) return { strength: 66, text: "Sedang", color: "bg-yellow-500" };
    return { strength: 100, text: "Kuat", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength();

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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Daftar Akun Baru</h1>
          <p className="text-gray-600 text-lg">Bergabunglah dengan kami! 🚀</p>
          <p className="text-gray-500 text-sm mt-1">Gratis dan mudah, hanya butuh 1 menit</p>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100/50 p-8 border border-gray-100">
          <form onSubmit={handleRegister} className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-semibold flex items-center gap-2">
                <User className="w-4 h-4 text-blue-500" />
                Nama Lengkap
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  placeholder="contoh: Budi Santoso"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 pl-4 pr-4 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400 transition-all bg-gray-50 focus:bg-white"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 ml-1">Nama akan ditampilkan di profil Anda</p>
            </div>

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
              <p className="text-xs text-gray-500 ml-1">Gunakan email yang valid dan aktif</p>
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
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pl-4 pr-4 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400 transition-all bg-gray-50 focus:bg-white"
                  required
                  minLength={6}
                />
              </div>
              
              {/* Password Strength Indicator */}
              {password.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">Kekuatan password:</p>
                    <span className={`text-xs font-semibold ${
                      passwordStrength.strength === 33 ? 'text-red-600' :
                      passwordStrength.strength === 66 ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {passwordStrength.text}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${passwordStrength.strength}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <input 
                type="checkbox" 
                className="w-4 h-4 mt-0.5 rounded border-gray-300 text-blue-500 focus:ring-blue-400" 
                required
              />
              <p className="text-xs text-gray-600 leading-relaxed">
                Dengan mendaftar, saya menyetujui{" "}
                <a href="#" className="text-blue-600 font-semibold hover:underline">Syarat & Ketentuan</a>
                {" "}dan{" "}
                <a href="#" className="text-blue-600 font-semibold hover:underline">Kebijakan Privasi</a>
              </p>
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
                  Buat Akun Sekarang
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

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-600 mb-3">
              Sudah punya akun?
            </p>
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-900 font-semibold rounded-xl transition-all duration-300 border border-gray-200 hover:border-gray-300"
            >
              Masuk ke Akun Anda
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Features Info */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-white rounded-xl shadow-sm mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-xs text-gray-600 font-medium">Gratis Selamanya</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-white rounded-xl shadow-sm mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-xs text-gray-600 font-medium">Aman & Terpercaya</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-white rounded-xl shadow-sm mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-xs text-gray-600 font-medium">Mudah Digunakan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;