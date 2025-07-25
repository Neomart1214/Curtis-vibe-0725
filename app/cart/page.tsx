"use client"

import { Metadata } from 'next'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react'

interface CartItem {
  id: number;
  name: string;
  price_in_cents: number;
  image_url: string;
  quantity: number;
}

function formatPrice(cents: number): string {
  return `NT$ ${(cents / 100).toLocaleString()}`
}

// Mock cart data for demo - in real app this would come from context/state management
const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "經典白色運動鞋",
    price_in_cents: 298000,
    image_url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&auto=format&fit=crop",
    quantity: 2
  },
  {
    id: 3,
    name: "復古圓框太陽眼鏡",
    price_in_cents: 89900,
    image_url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&auto=format&fit=crop",
    quantity: 1
  }
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price_in_cents * item.quantity), 0)
  const shipping = 0 // Free shipping
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-24 w-24 text-gray-300 mb-6" />
            <h1 className="text-3xl font-bold mb-4 text-gray-900">購物車是空的</h1>
            <p className="text-gray-600 mb-8">開始購物，將喜歡的商品加入購物車吧！</p>
            <Link href="/products">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                開始購物
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/products">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              繼續購物
            </Button>
          </Link>
          <div className="text-center">
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-4">
              購物車
            </Badge>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              我的購物車
            </h1>
            <p className="text-gray-600">
              您有 {cartItems.length} 項商品在購物車中
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="w-full sm:w-32 h-32 relative rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 space-y-2">
                      <Link href={`/products/${item.id}`}>
                        <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-lg font-bold text-blue-600">
                        {formatPrice(item.price_in_cents)}
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-16 text-center"
                            min="1"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <p className="text-sm text-gray-600">
                        小計: {formatPrice(item.price_in_cents * item.quantity)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>訂單摘要</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>商品小計</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>運費</span>
                  <span className="text-green-600">免費</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>總計</span>
                  <span className="text-blue-600">{formatPrice(total)}</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Link href="/checkout">
                <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                  前往結帳
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" size="lg" className="w-full">
                  繼續購物
                </Button>
              </Link>
            </div>

            {/* Shipping Info */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">配送資訊</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• 免費配送（訂單滿 NT$ 1,000）</p>
                  <p>• 預計 3-5 個工作天到貨</p>
                  <p>• 支援超商取貨</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}