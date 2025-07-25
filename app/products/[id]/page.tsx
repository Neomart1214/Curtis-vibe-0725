import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, ShoppingCart, Heart, Share2 } from 'lucide-react'

interface Product {
  id: number;
  name: string;
  price_in_cents: number;
  image_url: string;
}

async function fetchProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products`, {
      cache: 'no-store'
    })
    if (!response.ok) {
      return null
    }
    const products: Product[] = await response.json()
    return products.find(product => product.id === parseInt(id)) || null
  } catch (error) {
    console.error('Failed to fetch product:', error)
    return null
  }
}

function formatPrice(cents: number): string {
  return `NT$ ${(cents / 100).toLocaleString()}`
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const product = await fetchProduct(id)
  
  if (!product) {
    return {
      title: '產品未找到 | VIBE',
      description: '您查找的產品不存在',
    }
  }

  return {
    title: `${product.name} | VIBE`,
    description: `購買 ${product.name}，價格 ${formatPrice(product.price_in_cents)}`,
    openGraph: {
      title: product.name,
      description: `購買 ${product.name}`,
      images: [product.image_url],
      type: 'website',
    }
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await fetchProduct(id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link href="/products">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回產品列表
            </Button>
          </Link>
        </div>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </Card>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-4">
                精選商品
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                {product.name}
              </h1>
              <div className="text-3xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {formatPrice(product.price_in_cents)}
              </div>
            </div>

            <Separator />

            {/* Product Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">產品特色</h3>
              <div className="prose prose-gray max-w-none">
                <p>這是一款精心設計的優質產品，結合了現代美學與實用功能。採用頂級材料製作，確保耐用性和舒適體驗。</p>
                <ul>
                  <li>高品質材料製作</li>
                  <li>精美設計與工藝</li>
                  <li>舒適的使用體驗</li>
                  <li>現代時尚風格</li>
                </ul>
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  size="lg" 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  加入購物車
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  立即購買
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Heart className="mr-2 h-4 w-4" />
                  收藏
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  分享
                </Button>
              </div>
            </div>

            {/* Product Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">產品詳情</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">產品編號:</span>
                    <span>#{product.id.toString().padStart(6, '0')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">庫存狀態:</span>
                    <span className="text-green-600">現貨供應</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">配送方式:</span>
                    <span>免費配送</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">預計到貨:</span>
                    <span>3-5 個工作天</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">您可能也喜歡</h2>
          <div className="text-center text-gray-600">
            <p>查看更多精選產品</p>
            <Link href="/products">
              <Button variant="outline" className="mt-4">
                瀏覽所有產品
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}