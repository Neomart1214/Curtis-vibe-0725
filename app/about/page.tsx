import { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, Users, Award, Globe } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '關於我們 | VIBE',
  description: '了解 VIBE 的品牌故事、企業文化和發展歷程。我們致力於為客戶提供最優質的產品和服務體驗。',
  keywords: '關於我們, VIBE, 品牌故事, 企業文化',
  openGraph: {
    title: '關於我們 | VIBE',
    description: '了解 VIBE 的品牌故事、企業文化和發展歷程',
    type: 'website',
  }
}

const teamMembers = [
  {
    name: "陳美麗",
    role: "創辦人兼執行長",
    description: "擁有 15 年電商經驗的業界領袖"
  },
  {
    name: "王志明",
    role: "技術總監",
    description: "資深軟體工程師，專精於系統架構設計"
  },
  {
    name: "李小華",
    role: "設計總監",
    description: "國際知名設計師，曾獲多項設計大獎"
  },
  {
    name: "張大同",
    role: "營運總監",
    description: "豐富的營運管理經驗，致力於提升客戶體驗"
  }
]

const milestones = [
  {
    year: "2020",
    title: "公司成立",
    description: "VIBE 正式成立，開始我們的電商之旅"
  },
  {
    year: "2021",
    title: "產品線擴展",
    description: "推出多元化產品線，服務更多客戶群體"
  },
  {
    year: "2022",
    title: "技術升級",
    description: "導入先進技術，打造更優質的購物體驗"
  },
  {
    year: "2023",
    title: "國際拓展",
    description: "業務拓展至國際市場，成為知名品牌"
  },
  {
    year: "2024",
    title: "永續經營",
    description: "推動環保計畫，致力於永續經營發展"
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen liquid-background">
      {/* Liquid glass orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 liquid-orb opacity-50" />
      <div className="absolute top-40 right-20 w-24 h-24 liquid-orb opacity-40" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-64 left-24 w-40 h-40 liquid-orb opacity-30" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-32 right-32 w-28 h-28 liquid-orb opacity-60" style={{ animationDelay: '0.5s' }} />
      {/* Hero Section */}
      <section className="py-16 px-4 relative z-10">
        <div className="container mx-auto text-center opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
          <div className="inline-block glass-effect-subtle rounded-full px-6 py-2 mb-6 liquid-shimmer">
            <span className="text-white font-medium text-sm">✨ 關於我們</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            我們的故事
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            VIBE 始終相信，優質的生活源於對品質的堅持。我們致力於為每一位客戶帶來獨特而精緻的購物體驗，
            將創新設計與實用功能完美結合，打造真正符合現代生活需求的產品。
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-12 opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              我們的使命與價值
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              透過創新與品質，為客戶創造美好的生活體驗
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]">
            <div className="glass-card glass-hover text-center p-6">
              <div className="pt-6">
                <Heart className="mx-auto h-12 w-12 text-red-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-white">用心服務</h3>
                <p className="text-white/70 text-sm">
                  以客戶為中心，用心對待每一位客戶的需求
                </p>
              </div>
            </div>
            
            <div className="glass-card glass-hover text-center p-6">
              <div className="pt-6">
                <Award className="mx-auto h-12 w-12 text-yellow-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-white">品質保證</h3>
                <p className="text-white/70 text-sm">
                  嚴格把關每一項產品，確保最高品質標準
                </p>
              </div>
            </div>
            
            <div className="glass-card glass-hover text-center p-6">
              <div className="pt-6">
                <Users className="mx-auto h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-white">團隊合作</h3>
                <p className="text-white/70 text-sm">
                  發揮團隊力量，共同創造卓越成果
                </p>
              </div>
            </div>
            
            <div className="glass-card glass-hover text-center p-6">
              <div className="pt-6">
                <Globe className="mx-auto h-12 w-12 text-green-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-white">永續發展</h3>
                <p className="text-white/70 text-sm">
                  關心環境，致力於創造永續經營的商業模式
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-12 opacity-0 animate-[fadeInUp_1s_ease-out_0.8s_forwards]">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              我們的團隊
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              由經驗豐富的專業人士組成，致力於為客戶提供最佳服務
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-0 animate-[fadeInUp_1s_ease-out_1s_forwards]">
            {teamMembers.map((member, index) => (
              <div key={index} className="glass-card glass-hover text-center p-6">
                <div className="pt-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center liquid-shimmer">
                    <span className="text-white text-2xl font-bold">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1 text-white">{member.name}</h3>
                  <p className="text-blue-300 font-medium mb-2">{member.role}</p>
                  <p className="text-white/60 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Milestones */}
      <section className="py-16 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-12 opacity-0 animate-[fadeInUp_1s_ease-out_1.2s_forwards]">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              發展歷程
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              回顧我們的成長軌跡，展望更美好的未來
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_1.4s_forwards]">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center liquid-shimmer">
                      <span className="text-white font-bold">{milestone.year}</span>
                    </div>
                  </div>
                  <div className="glass-card glass-hover flex-1">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-white">{milestone.title}</h3>
                      <p className="text-white/70">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 relative z-10">
        <div className="container mx-auto text-center opacity-0 animate-[fadeInUp_1s_ease-out_1.6s_forwards]">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            加入我們的旅程
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            探索我們精心挑選的產品，體驗 VIBE 帶來的生活美學
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="glass-button glass-interactive bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-none shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                瀏覽產品
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="glass-button glass-interactive text-white border-white/30 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105">
                聯絡我們
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}