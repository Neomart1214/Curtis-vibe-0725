import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Search, HelpCircle, FileText, MessageSquare, Phone, Mail, Shield, Truck, CreditCard, RotateCcw } from 'lucide-react'

export const metadata: Metadata = {
  title: '客戶支援 | VIBE',
  description: 'VIBE 客戶支援中心 - 找到您需要的幫助，包括常見問題、使用指南、退換貨政策等完整支援資訊。',
  keywords: '客戶支援, 常見問題, 幫助中心, VIBE, 客戶服務',
  openGraph: {
    title: '客戶支援 | VIBE',
    description: 'VIBE 客戶支援中心 - 找到您需要的幫助',
    type: 'website',
  }
}

const supportCategories = [
  {
    icon: CreditCard,
    title: "訂單與付款",
    description: "訂單查詢、付款問題、發票相關",
    color: "text-blue-600"
  },
  {
    icon: Truck,
    title: "配送與物流",
    description: "配送時間、運費計算、配送狀態",
    color: "text-green-600"
  },
  {
    icon: RotateCcw,
    title: "退換貨服務",
    description: "退貨流程、換貨政策、退款處理",
    color: "text-orange-600"
  },
  {
    icon: Shield,
    title: "帳戶與安全",
    description: "帳戶設定、密碼重設、隱私保護",
    color: "text-purple-600"
  }
]

const faqData = [
  {
    category: "訂單相關",
    questions: [
      {
        question: "如何查看我的訂單狀態？",
        answer: "您可以登入會員帳戶，在「我的訂單」頁面查看所有訂單的詳細狀態。也可以使用訂單編號在官網首頁的「訂單查詢」功能進行查詢。"
      },
      {
        question: "可以修改或取消已下的訂單嗎？",
        answer: "在訂單尚未出貨前，您可以聯絡客服申請修改或取消。一旦商品已經出貨，就無法修改或取消，但您可以在收到商品後申請退貨。"
      },
      {
        question: "忘記訂單編號怎麼辦？",
        answer: "請登入您的會員帳戶查看訂單記錄，或檢查您的電子郵件確認信件。如果仍找不到，請聯絡客服並提供購買時的電話號碼或電子郵件。"
      }
    ]
  },
  {
    category: "配送相關",
    questions: [
      {
        question: "配送需要多長時間？",
        answer: "一般商品在確認付款後3-5個工作天內送達。偏遠地區可能需要額外1-2天。超商取貨約2-3個工作天。"
      },
      {
        question: "可以指定配送時間嗎？",
        answer: "宅配服務提供上午（9:00-12:00）、下午（13:00-17:00）、晚上（18:00-21:00）三個時段選擇。超商取貨則沒有時間限制。"
      },
      {
        question: "配送費用如何計算？",
        answer: "訂單滿NT$1,000免運費。未滿NT$1,000的宅配運費為NT$100，超商取貨運費為NT$60。"
      }
    ]
  },
  {
    category: "退換貨",
    questions: [
      {
        question: "退貨政策是什麼？",
        answer: "我們提供7天無條件退貨保證。商品需保持全新狀態且包裝完整。退貨運費由我們負擔，退款將在收到退貨商品後3-5個工作天內處理。"
      },
      {
        question: "如何申請退換貨？",
        answer: "請登入會員帳戶，在訂單詳情頁面點選「申請退換貨」，填寫退貨原因並選擇退貨方式。我們會安排物流公司到府收件或提供超商退貨標籤。"
      },
      {
        question: "哪些商品不能退貨？",
        answer: "基於衛生考量，貼身衣物、化妝品、食品類商品恕不接受退貨。客製化商品除瑕疵外也不接受退貨。"
      }
    ]
  }
]

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <Badge className="bg-gradient-to-r from-blue-500 to-green-500 text-white mb-6">
            客戶支援
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            我們來幫助您
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            遇到問題了嗎？別擔心！我們的支援中心提供完整的解決方案，
            從常見問題到專人服務，讓您的購物體驗更加順暢。
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input 
              placeholder="搜尋您的問題..." 
              className="pl-10 pr-4 py-3 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Quick Help Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">快速尋找幫助</h2>
            <p className="text-gray-600">選擇您需要協助的類別</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportCategories.map((category, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all cursor-pointer group">
                <CardContent className="pt-6">
                  <category.icon className={`mx-auto h-12 w-12 ${category.color} mb-4 group-hover:scale-110 transition-transform`} />
                  <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">常見問題</h2>
            <p className="text-gray-600">快速找到您問題的答案</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {faqData.map((section, sectionIndex) => (
              <Card key={sectionIndex} className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HelpCircle className="mr-2 h-5 w-5 text-blue-600" />
                    {section.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {section.questions.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${sectionIndex}-${faqIndex}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">仍需要協助？</h2>
            <p className="text-gray-600">我們的專業客服團隊隨時為您服務</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Phone className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">電話客服</h3>
                <p className="text-gray-600 mb-4">+886-2-1234-5678</p>
                <p className="text-sm text-gray-500 mb-4">週一至週五 09:00-18:00</p>
                <Button variant="outline" className="w-full">
                  立即撥打
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <MessageSquare className="mx-auto h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">線上客服</h3>
                <p className="text-gray-600 mb-4">即時對話支援</p>
                <p className="text-sm text-gray-500 mb-4">平均回應時間：2分鐘</p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  開始對話
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Mail className="mx-auto h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">郵件客服</h3>
                <p className="text-gray-600 mb-4">support@vibe.com</p>
                <p className="text-sm text-gray-500 mb-4">24小時內回覆</p>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">
                    發送郵件
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Help Resources */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">更多資源</h2>
            <p className="text-gray-600">探索更多有用的資訊和指南</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <FileText className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">使用指南</h3>
                <p className="text-gray-600 text-sm mb-4">
                  詳細的購物和會員功能使用說明
                </p>
                <Button variant="outline" size="sm">
                  查看指南
                </Button>
              </CardContent>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Shield className="h-8 w-8 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">隱私政策</h3>
                <p className="text-gray-600 text-sm mb-4">
                  了解我們如何保護您的個人資訊
                </p>
                <Button variant="outline" size="sm">
                  閱讀政策
                </Button>
              </CardContent>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <FileText className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">服務條款</h3>
                <p className="text-gray-600 text-sm mb-4">
                  詳細的服務條款和使用規範
                </p>
                <Button variant="outline" size="sm">
                  查看條款
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}