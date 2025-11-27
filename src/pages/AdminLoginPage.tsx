"use client";

import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { showError, showSuccess } from "@/utils/toast";

const ADMIN_EMAIL = "admin@test.com"; 

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      const userEmail = data.user?.email;

      if (userEmail === ADMIN_EMAIL) {
        // Kiểm tra email khớp với ADMIN_EMAIL
        showSuccess("Đăng nhập Admin thành công!");
        navigate("/admin");
      } else {
        // Nếu không phải admin, đăng xuất ngay lập tức và thông báo lỗi
        await supabase.auth.signOut();
        showError("Email không được ủy quyền Admin.");
      }

    } catch (error: any) {
      console.error("Login error:", error.message);
      showError("Đăng nhập thất bại. Vui lòng kiểm tra Email/Mật khẩu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" 
         style={{ background: 'linear-gradient(135deg, hsl(250 70% 70%) 0%, hsl(250 70% 60%) 100%)' }}>
      <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-2xl">
        <h1 className="text-3xl font-black text-center mb-6 uppercase">
          Admin Login
        </h1>
        <p className="text-center text-sm text-gray-500 mb-8">
          Sử dụng tài khoản Admin để truy cập Bảng điều khiển.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="mt-1"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-[5px] py-3 text-lg font-bold bg-black hover:bg-gray-800"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Đang đăng nhập...
              </>
            ) : (
              "Đăng Nhập Admin"
            )}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-muted-foreground hover:underline"
            >
              ← Quay lại trang chủ
            </button>
          </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;