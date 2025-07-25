import { Metadata } from 'next'
import { Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProductCard } from '@/components/ProductCard'
import { promises as fs } from 'fs'
import path from 'path'

export const metadata: Metadata = {
  title: '產品目錄 | VIBE',
  description: '探索 VIBE 精選的高品質產品，從時尚到生活用品，找到最適合您的選擇',
  keywords: '產品, 購物, 電商, VIBE',
  openGraph: {
    title: '產品目錄 | VIBE',
    description: '探索 VIBE 精選的高品質產品',
    type: 'website',
  }
}

interface Product {
  id: number;
  name: string;
  price_in_cents: number;
  image_url: string;
}

async function fetchProducts(): Promise<Product[]> {
  try {
    // 直接讀取 public/products.json 文件，而不是通過 API 調用
    const jsonPath = path.join(process.cwd(), 'public', 'products.json')
    const fileContents = await fs.readFile(jsonPath, 'utf8')
    const products = JSON.parse(fileContents)
    return products
  } catch (error) {
    console.error('Failed to load products:', error)
    throw new Error('Failed to fetch products')
  }
}

function LoadingState() {
  return (
    <div className="container mx-auto px-4 py-8 relative z-10">
      <div className="text-center mb-12">
        <div className="inline-block glass-effect-subtle rounded-full px-6 py-2 mb-6 animate-pulse">
          <div className="h-4 w-16 bg-white/20 rounded" />
        </div>
        <div className="h-12 w-64 bg-white/10 rounded-lg mx-auto mb-4 animate-pulse" />
        <div className="h-6 w-96 bg-white/10 rounded-lg mx-auto animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="glass-card animate-pulse">
            <div className="aspect-square bg-white/10 rounded-t-lg" />
            <div className="p-4">
              <div className="h-4 bg-white/10 rounded mb-2" />
              <div className="h-4 bg-white/10 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

async function ProductsContent() {
  const products = await fetchProducts()

  return (
    <div className="container mx-auto px-4 py-8 relative z-10">
      <div className="text-center mb-12 opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
        <div className="inline-block glass-effect-subtle rounded-full px-6 py-2 mb-6 liquid-shimmer">
          <span className="text-white font-medium text-sm">✨ 精選商品</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
          產品目錄
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
          發現我們精心挑選的產品系列，每一件都代表著品質與設計的完美結合
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <div className="glass-card max-w-md mx-auto p-8">
            <p className="text-white/70 text-lg">目前沒有可用的產品</p>
            <p className="text-white/50 text-sm mt-2">請稍後再回來查看</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen liquid-background">
      {/* Liquid glass orbs */}
      <div className="absolute top-32 left-16 w-24 h-24 liquid-orb opacity-60" />
      <div className="absolute top-64 right-24 w-32 h-32 liquid-orb opacity-40" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-48 left-32 w-20 h-20 liquid-orb opacity-50" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-32 right-16 w-28 h-28 liquid-orb opacity-30" style={{ animationDelay: '1s' }} />
      
      <Suspense fallback={<LoadingState />}>
        <ProductsContent />
      </Suspense>
    </div>
  )
}