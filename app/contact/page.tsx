"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MapPin, Phone, Mail, Clock, MessageCircle, HeadphonesIcon } from 'lucide-react'

const contactInfo = [
  {
    icon: Phone,
    title: "客服專線",
    content: "+886-2-1234-5678",
    description: "週一至週五 09:00-18:00"
  },
  {
    icon: Mail,
    title: "電子郵件",
    content: "support@vibe.com",
    description: "24小時內回覆"
  },
  {
    icon: MapPin,
    title: "公司地址",
    content: "台北市信義區信義路五段7號",
    description: "歡迎預約參訪"
  },
  {
    icon: Clock,
    title: "營業時間",
    content: "週一至週五 09:00-18:00",
    description: "國定假日公休"
  }
]

const faqItems = [
  {
    question: "如何查詢訂單狀態？",
    answer: "您可以登入會員帳戶查看訂單詳情，或使用訂單編號在官網查詢頁面追蹤配送狀態。"
  },
  {
    question: "退換貨政策為何？",
    answer: "我們提供7天無條件退貨保證，商品需保持全新狀態且包裝完整。退貨運費由我們負擔。"
  },
  {
    question: "配送需要多久時間？",
    answer: "一般商品在確認付款後3-5個工作天內送達，偏遠地區可能需要額外1-2天。"
  },
  {
    question: "是否提供國際配送？",
    answer: "目前我們的配送服務涵蓋台灣、香港、澳門地區，其他國際配送服務正在規劃中。"
  }
]

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('感謝您的來信！我們會盡快回覆您。')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white mb-6">
            聯絡我們
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            我們隨時為您服務
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            有任何問題或建議嗎？我們的專業團隊隨時準備為您提供協助。
            選擇最適合您的聯絡方式，讓我們為您解決問題。
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <info.icon className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                  <p className="text-gray-900 font-medium mb-1">{info.content}</p>
                  <p className="text-gray-600 text-sm">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  發送訊息
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">姓氏 *</Label>
                      <Input id="firstName" required placeholder="請輸入您的姓氏" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">名字 *</Label>
                      <Input id="lastName" required placeholder="請輸入您的名字" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">電子郵件 *</Label>
                    <Input id="email" type="email" required placeholder="example@email.com" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">電話號碼</Label>
                    <Input id="phone" placeholder="09xxxxxxxx" />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">詢問類型 *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="請選擇詢問類型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product">產品詢問</SelectItem>
                        <SelectItem value="order">訂單問題</SelectItem>
                        <SelectItem value="shipping">配送相關</SelectItem>
                        <SelectItem value="return">退換貨</SelectItem>
                        <SelectItem value="technical">技術支援</SelectItem>
                        <SelectItem value="other">其他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">詳細說明 *</Label>
                    <Textarea 
                      id="message" 
                      required 
                      placeholder="請詳細描述您的問題或需求..." 
                      rows={5}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600"
                  >
                    發送訊息
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ and Additional Info */}
            <div className="space-y-8">
              {/* Live Chat */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HeadphonesIcon className="mr-2 h-5 w-5" />
                    即時客服
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    需要立即協助嗎？我們的線上客服團隊隨時為您服務。
                  </p>
                  <Button className="w-full mb-2" variant="outline">
                    開始線上對話
                  </Button>
                  <p className="text-sm text-gray-500 text-center">
                    平均回應時間：2分鐘內
                  </p>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card>
                <CardHeader>
                  <CardTitle>常見問題</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <h4 className="font-semibold mb-2">{item.question}</h4>
                      <p className="text-gray-600 text-sm">{item.answer}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle>關注我們</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    關注我們的社群媒體，獲取最新產品資訊和優惠活動。
                  </p>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="sm">Facebook</Button>
                    <Button variant="outline" size="sm">Instagram</Button>
                    <Button variant="outline" size="sm">LINE</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">找到我們</h2>
            <p className="text-gray-600">歡迎親自造訪我們的辦公室</p>
          </div>
          
          <Card className="overflow-hidden">
            <div className="h-96 bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <p className="text-gray-600">互動式地圖</p>
                <p className="text-sm text-gray-500">台北市信義區信義路五段7號</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}