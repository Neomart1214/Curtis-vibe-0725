"use client"

import { Metadata } from 'next'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, CreditCard, Truck, ShieldCheck } from 'lucide-react'

interface OrderItem {
  id: number;
  name: string;
  price_in_cents: number;
  quantity: number;
}

function formatPrice(cents: number): string {
  return `NT$ ${(cents / 100).toLocaleString()}`
}

// Mock order data
const orderItems: OrderItem[] = [
  { id: 1, name: "經典白色運動鞋", price_in_cents: 298000, quantity: 2 },
  { id: 3, name: "復古圓框太陽眼鏡", price_in_cents: 89900, quantity: 1 }
]

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const [shippingMethod, setShippingMethod] = useState('home-delivery')
  const [agreeTerms, setAgreeTerms] = useState(false)

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price_in_cents * item.quantity), 0)
  const shipping = shippingMethod === 'home-delivery' ? 0 : 6000 // Free home delivery, 60 for convenience store
  const total = subtotal + shipping

  const handleSubmitOrder = () => {
    if (!agreeTerms) {
      alert('請同意服務條款')
      return
    }
    alert('訂單已送出！感謝您的購買。')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/cart">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回購物車
            </Button>
          </Link>
          <div className="text-center">
            <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white mb-4">
              結帳
            </Badge>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              完成您的訂單
            </h1>
            <p className="text-gray-600">
              請填寫以下資訊完成購買
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="mr-2 h-5 w-5" />
                  配送資訊
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">姓氏</Label>
                    <Input id="firstName" placeholder="請輸入姓氏" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">名字</Label>
                    <Input id="lastName" placeholder="請輸入名字" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">電子郵件</Label>
                  <Input id="email" type="email" placeholder="example@email.com" />
                </div>
                
                <div>
                  <Label htmlFor="phone">手機號碼</Label>
                  <Input id="phone" placeholder="09xxxxxxxx" />
                </div>
                
                <div>
                  <Label htmlFor="address">配送地址</Label>
                  <Textarea id="address" placeholder="請輸入完整地址" rows={3} />
                </div>

                {/* Shipping Method */}
                <div>
                  <Label className="text-base font-semibold">配送方式</Label>
                  <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="mt-2">
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="home-delivery" id="home-delivery" />
                      <Label htmlFor="home-delivery" className="flex-1 cursor-pointer">
                        <div className="flex justify-between">
                          <span>宅配到府</span>
                          <span className="text-green-600 font-medium">免費</span>
                        </div>
                        <p className="text-sm text-gray-600">3-5 個工作天</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="convenience-store" id="convenience-store" />
                      <Label htmlFor="convenience-store" className="flex-1 cursor-pointer">
                        <div className="flex justify-between">
                          <span>超商取貨</span>
                          <span className="font-medium">NT$ 60</span>
                        </div>
                        <p className="text-sm text-gray-600">2-3 個工作天</p>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  付款資訊
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
                      信用卡付款
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                    <Label htmlFor="bank-transfer" className="flex-1 cursor-pointer">
                      銀行轉帳
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="cash-on-delivery" id="cash-on-delivery" />
                    <Label htmlFor="cash-on-delivery" className="flex-1 cursor-pointer">
                      貨到付款
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'credit-card' && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <Label htmlFor="cardNumber">信用卡號碼</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">有效期限</Label>
                        <Input id="expiryDate" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">安全碼</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardHolder">持卡人姓名</Label>
                      <Input id="cardHolder" placeholder="持卡人姓名" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>訂單明細</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="flex-1">
                      {item.name} × {item.quantity}
                    </span>
                    <span>{formatPrice(item.price_in_cents * item.quantity)}</span>
                  </div>
                ))}
                
                <Separator />
                
                <div className="flex justify-between">
                  <span>商品小計</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>運費</span>
                  <span>{shipping > 0 ? formatPrice(shipping) : '免費'}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>總計</span>
                  <span className="text-blue-600">{formatPrice(total)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <ShieldCheck className="mr-2 h-5 w-5 text-green-600" />
                  <span className="font-semibold">安全保障</span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• SSL 加密保護您的個人資訊</p>
                  <p>• 7 天無條件退貨保證</p>
                  <p>• 一年產品保固</p>
                </div>
              </CardContent>
            </Card>

            {/* Terms and Order Button */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm">
                  我同意 <Link href="#" className="text-blue-600 hover:underline">服務條款</Link> 和 
                  <Link href="#" className="text-blue-600 hover:underline"> 隱私政策</Link>
                </Label>
              </div>
              
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-green-600 to-blue-600"
                onClick={handleSubmitOrder}
                disabled={!agreeTerms}
              >
                確認訂單並付款 {formatPrice(total)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}