"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";
import { ScrollAnimations } from "@/components/ScrollAnimations";

interface Product {
  id: number;
  name: string;
  price_in_cents: number;
  image_url: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-2xl font-light animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
      <ScrollAnimations />
      {/* Animated background gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 50%)`
        }}
      />
      
      {/* Floating glass orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-pink-500/20 to-blue-500/20 rounded-full blur-lg animate-bounce" />
      <div className="absolute bottom-32 left-40 w-40 h-40 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full blur-2xl animate-pulse delay-1000" />
      
      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
            <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm text-sm px-4 py-2 mb-6">
              ✨ Future Collection
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
              VIBE
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
              Experience the future of shopping with liquid glass aesthetics and seamless interactions
            </p>
          </div>
          
          <div className="flex justify-center gap-4 mb-16 opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
            <Link href="/products">
              <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
                探索商品
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105">
                了解更多
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="relative z-10 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]">
            Featured Products
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">VIBE</h3>
            <p className="text-white/60 mb-6">Future-forward design meets seamless functionality</p>
            <div className="flex justify-center space-x-6 text-white/60">
              <Link href="/about" className="hover:text-white transition-colors duration-300">關於我們</Link>
              <Link href="/contact" className="hover:text-white transition-colors duration-300">聯絡我們</Link>
              <Link href="/support" className="hover:text-white transition-colors duration-300">客戶支援</Link>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10 text-white/40 text-sm">
              © 2024 VIBE. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
