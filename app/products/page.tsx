import { Metadata } from 'next'
import { Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProductCard } from '@/components/ProductCard'

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
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products`, {
    cache: 'no-store'
  })
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

function LoadingState() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-t-lg" />
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

async function ProductsContent() {
  const products = await fetchProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-4">
          精選商品
        </Badge>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          產品目錄
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          發現我們精心挑選的產品系列，每一件都代表著品質與設計的完美結合
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">目前沒有可用的產品</p>
        </div>
      )}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Suspense fallback={<LoadingState />}>
        <ProductsContent />
      </Suspense>
    </div>
  )
}