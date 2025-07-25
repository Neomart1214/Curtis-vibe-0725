"use client"

import { Metadata } from 'next'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { User, Package, Heart, Settings, CreditCard, MapPin, Bell, Shield, LogOut } from 'lucide-react'

const mockUser = {
  name: "王小明",
  email: "wang@example.com",
  phone: "0912-345-678",
  memberSince: "2023年1月"
}

const mockOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "已送達",
    total: 38800,
    items: ["經典白色運動鞋", "復古圓框太陽眼鏡"]
  },
  {
    id: "ORD-2024-002", 
    date: "2024-01-10",
    status: "配送中",
    total: 15800,
    items: ["極簡主義皮革錢包"]
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-05", 
    status: "處理中",
    total: 35900,
    items: ["北歐風格陶瓷馬克杯"]
  }
]

const mockWishlist = [
  {
    id: 5,
    name: "手工編織羊毛圍巾",
    price: 128000,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&auto=format&fit=crop"
  },
  {
    id: 1,
    name: "經典白色運動鞋", 
    price: 298000,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&auto=format&fit=crop"
  }
]

function formatPrice(cents: number): string {
  return `NT$ ${(cents / 100).toLocaleString()}`
}

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true) // In real app, this would come from auth context

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">會員登入</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">電子郵件</Label>
              <Input id="email" type="email" placeholder="example@email.com" />
            </div>
            <div>
              <Label htmlFor="password">密碼</Label>
              <Input id="password" type="password" placeholder="請輸入密碼" />
            </div>
            <Button className="w-full" onClick={() => setIsLoggedIn(true)}>
              登入
            </Button>
            <div className="text-center text-sm text-gray-600">
              還不是會員？ <Button variant="link" className="p-0">立即註冊</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-4">
            會員中心
          </Badge>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            歡迎回來，{mockUser.name}
          </h1>
          <p className="text-gray-600">
            會員等級：金級會員 | 加入時間：{mockUser.memberSince}
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger value="overview">總覽</TabsTrigger>
            <TabsTrigger value="orders">訂單記錄</TabsTrigger>
            <TabsTrigger value="wishlist">收藏清單</TabsTrigger>
            <TabsTrigger value="addresses">地址管理</TabsTrigger>
            <TabsTrigger value="payment">付款方式</TabsTrigger>
            <TabsTrigger value="settings">帳戶設定</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <Package className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-2xl font-bold mb-1">{mockOrders.length}</h3>
                  <p className="text-gray-600">總訂單數</p>
                </CardContent>
              </Card>
              
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <Heart className="mx-auto h-12 w-12 text-red-600 mb-4" />
                  <h3 className="text-2xl font-bold mb-1">{mockWishlist.length}</h3>
                  <p className="text-gray-600">收藏商品</p>
                </CardContent>
              </Card>
              
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <CreditCard className="mx-auto h-12 w-12 text-green-600 mb-4" />
                  <h3 className="text-2xl font-bold mb-1">
                    {formatPrice(mockOrders.reduce((sum, order) => sum + order.total, 0))}
                  </h3>
                  <p className="text-gray-600">累計消費</p>
                </CardContent>
              </Card>
              
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <Badge className="mb-4 bg-gold text-black px-4 py-2">
                    金級會員
                  </Badge>
                  <p className="text-gray-600">會員等級</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>最近訂單</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.date}</p>
                        <p className="text-sm text-gray-600">{order.items.join(', ')}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={order.status === '已送達' ? 'default' : 'secondary'}>
                          {order.status}
                        </Badge>
                        <p className="font-semibold mt-1">{formatPrice(order.total)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>我的訂單</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="p-6 border rounded-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{order.id}</h3>
                          <p className="text-gray-600">訂單日期：{order.date}</p>
                        </div>
                        <Badge variant={order.status === '已送達' ? 'default' : 'secondary'}>
                          {order.status}
                        </Badge>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">商品清單：</p>
                        <ul className="list-disc list-inside">
                          {order.items.map((item, index) => (
                            <li key={index} className="text-sm">{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="font-semibold">總金額：{formatPrice(order.total)}</p>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">查看詳情</Button>
                          {order.status === '已送達' && (
                            <Button variant="outline" size="sm">申請退貨</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishlist */}
          <TabsContent value="wishlist" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>我的收藏</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockWishlist.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-semibold mb-2">{item.name}</h3>
                      <p className="text-blue-600 font-bold mb-4">{formatPrice(item.price)}</p>
                      <div className="space-y-2">
                        <Button className="w-full" size="sm">
                          加入購物車
                        </Button>
                        <Button variant="outline" className="w-full" size="sm">
                          移除收藏
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tabs content would go here */}
          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <CardTitle>地址管理</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">地址管理功能開發中...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>付款方式</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">付款方式管理功能開發中...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>帳戶設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="name">姓名</Label>
                  <Input id="name" defaultValue={mockUser.name} />
                </div>
                <div>
                  <Label htmlFor="email">電子郵件</Label>
                  <Input id="email" defaultValue={mockUser.email} />
                </div>
                <div>
                  <Label htmlFor="phone">電話</Label>
                  <Input id="phone" defaultValue={mockUser.phone} />
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">密碼設定</h3>
                    <p className="text-sm text-gray-600">定期更新密碼以確保帳戶安全</p>
                  </div>
                  <Button variant="outline">修改密碼</Button>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-red-600">危險區域</h3>
                    <p className="text-sm text-gray-600">刪除帳戶將無法復原</p>
                  </div>
                  <Button variant="destructive" onClick={() => setIsLoggedIn(false)}>
                    登出帳戶
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}