import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ShoppingCart, Mail, Lock, ArrowRight, ArrowLeft, KeyRound, CheckCircle2 } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "otp" | "success">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Handle submit email untuk menerima OTP
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi kirim OTP ke email
    setTimeout(() => {
      if (email) {
        toast.success(`Kode OTP telah dikirim ke ${email} 📧`);
        setStep("otp");
        setCountdown(60); // 60 detik countdown
        startCountdown();
      } else {
        toast.error("Email harus diisi");
      }
      setIsLoading(false);
    }, 1000);
  };

  // Handle submit OTP dan password baru
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validasi
    if (newPassword !== confirmPassword) {
      toast.error("Password tidak sama");
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password minimal 6 karakter");
      setIsLoading(false);
      return;
    }

    // Simulasi reset password
    setTimeout(() => {
      if (otp && newPassword) {
        // Simulasi verifikasi OTP (dalam real app, ini harus diverifikasi di backend)
        if (otp === "123456" || otp.length === 6) {
          setStep("success");
          toast.success("Password berhasil direset! 🎉");
          
          // Redirect ke login setelah 3 detik
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          toast.error("Kode OTP tidak valid");
        }
      } else {
        toast.error("Semua field harus diisi");
      }
      setIsLoading(false);
    }, 1000);
  };

  // Countdown timer untuk resend OTP
  const startCountdown = () => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Resend OTP
  const handleResendOTP = () => {
    if (countdown > 0) return;
    
    setIsLoading(true);
    setTimeout(() => {
      toast.success(`Kode OTP baru telah dikirim ke ${email} 📧`);
      setCountdown(60);
      startCountdown();
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
            {step === "success" ? (
              <CheckCircle2 className="w-10 h-10 text-white" />
            ) : (
              <KeyRound className="w-10 h-10 text-white" />
            )}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {step === "email" && "Lupa Password?"}
            {step === "otp" && "Verifikasi OTP"}
            {step === "success" && "Berhasil! ✨"}
          </h1>
          <p className="text-gray-600 text-lg">
            {step === "email" && "Jangan khawatir, kami akan bantu! 🔐"}
            {step === "otp" && "Masukkan kode OTP dari email"}
            {step === "success" && "Password Anda sudah direset"}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            {step === "email" && "Masukkan email untuk menerima kode OTP"}
            {step === "otp" && `Kode dikirim ke ${email}`}
            {step === "success" && "Anda akan diarahkan ke halaman login"}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100/50 p-8 border border-gray-100">
          {/* Step 1: Email Input */}
          {step === "email" && (
            <form onSubmit={handleSendOTP} className="space-y-6">
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
                <p className="text-xs text-gray-500 ml-1">Masukkan email yang terdaftar di akun Anda</p>
              </div>

              {/* Info Box */}
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <Mail className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-600 leading-relaxed">
                  Kami akan mengirimkan kode OTP 6 digit ke email Anda. Pastikan email yang Anda masukkan sudah benar dan aktif.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-300 flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Mengirim...
                  </span>
                ) : (
                  <>
                    Kirim Kode OTP
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          )}

          {/* Step 2: OTP & New Password Input */}
          {step === "otp" && (
            <form onSubmit={handleResetPassword} className="space-y-6">
              {/* OTP Input */}
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-gray-700 font-semibold flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-blue-500" />
                  Kode OTP
                </Label>
                <div className="relative">
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Masukkan 6 digit kode OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="h-12 pl-4 pr-4 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400 transition-all bg-gray-50 focus:bg-white text-center text-2xl tracking-widest font-semibold"
                    maxLength={6}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500 ml-1">Cek email Anda untuk kode OTP</p>
                  {countdown > 0 ? (
                    <p className="text-xs text-blue-600 font-semibold">Kirim ulang dalam {countdown}s</p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      className="text-xs text-blue-600 font-semibold hover:underline"
                    >
                      Kirim Ulang OTP
                    </button>
                  )}
                </div>
              </div>

              {/* New Password Input */}
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-gray-700 font-semibold flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-500" />
                  Password Baru
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Minimal 6 karakter"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-12 pl-4 pr-4 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400 transition-all bg-gray-50 focus:bg-white"
                    minLength={6}
                    required
                  />
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 font-semibold flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-500" />
                  Konfirmasi Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Ketik ulang password baru"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 pl-4 pr-4 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400 transition-all bg-gray-50 focus:bg-white"
                    minLength={6}
                    required
                  />
                </div>
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-xs text-red-600 ml-1">Password tidak sama</p>
                )}
              </div>

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
                    Reset Password
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>

              {/* Back Button */}
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("email")}
                className="w-full h-12 rounded-xl border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Kembali
              </Button>
            </form>
          )}

          {/* Step 3: Success */}
          {step === "success" && (
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">Password Berhasil Direset!</h3>
                <p className="text-gray-600">
                  Password Anda telah berhasil diubah. Silakan login dengan password baru Anda.
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                <p className="text-sm text-green-700 font-medium">
                  Anda akan otomatis diarahkan ke halaman login dalam beberapa detik...
                </p>
              </div>

              <Button 
                onClick={() => navigate("/login")}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Login Sekarang
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          )}

          {/* Divider - hanya tampil di step email */}
          {step === "email" && (
            <>
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">atau</span>
                </div>
              </div>

              {/* Back to Login Link */}
              <div className="text-center">
                <p className="text-gray-600 mb-3">
                  Sudah ingat password Anda?
                </p>
                <Link 
                  to="/login" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-900 font-semibold rounded-xl transition-all duration-300 border border-gray-200 hover:border-gray-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali ke Login
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Footer Info - hanya tampil di step email */}
        {step === "email" && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Butuh bantuan? Hubungi{" "}
              <a href="#" className="text-blue-500 hover:underline font-semibold">Tim Support</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;