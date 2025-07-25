"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  Heart,
  Phone,
  Mail,
  HelpCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigationItems = [
  { href: '/' as const, label: '首頁' },
  { href: '/products' as const, label: '商品' },
  { href: '/about' as const, label: '關於我們' },
  { href: '/contact' as const, label: '聯絡我們' },
  { href: '/support' as const, label: '客戶支援' }
]

export function Navigation() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState('')
  const [cartItemCount] = useState(2) // Mock cart count

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full glass-navigation">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              VIBE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-blue-600",
                  pathname === item.href 
                    ? "text-blue-600" 
                    : "text-gray-700"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:block flex-1 max-w-sm mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="搜尋商品..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </form>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Search Button (Mobile) */}
            <Button variant="ghost" size="sm" className="lg:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* Account */}
            <Link href="/account">
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
                <span className="hidden sm:inline ml-2">帳戶</span>
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs bg-red-500 hover:bg-red-500">
                    {cartItemCount}
                  </Badge>
                )}
                <span className="hidden sm:inline ml-2">購物車</span>
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-6">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="搜尋商品..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4"
                    />
                  </form>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-4">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "text-lg font-medium transition-colors hover:text-blue-600 py-2",
                          pathname === item.href 
                            ? "text-blue-600 border-b border-blue-600" 
                            : "text-gray-700"
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>

                  <hr />

                  {/* Mobile Quick Links */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">快速連結</h3>
                    <div className="space-y-2">
                      <Link href="/account" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                        <User className="h-4 w-4" />
                        <span>我的帳戶</span>
                      </Link>
                      <Link href="/cart" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                        <ShoppingCart className="h-4 w-4" />
                        <span>購物車 ({cartItemCount})</span>
                      </Link>
                      <Link href="/support" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                        <HelpCircle className="h-4 w-4" />
                        <span>客戶支援</span>
                      </Link>
                      <Link href="/contact" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                        <Phone className="h-4 w-4" />
                        <span>聯絡我們</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="liquid-background border-t border-white/10 relative">
      {/* Floating glass orbs */}
      <div className="absolute top-8 left-8 w-16 h-16 liquid-orb opacity-30" />
      <div className="absolute bottom-8 right-8 w-20 h-20 liquid-orb opacity-40" style={{ animationDelay: '2s' }} />
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              VIBE
            </h3>
            <p className="text-white/70 mb-4">
              致力於為客戶提供最優質的產品和購物體驗，將創新設計與實用功能完美結合。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">快速連結</h4>
            <div className="space-y-2">
              <Link href="/products" className="block text-white/60 hover:text-white transition-colors">
                商品目錄
              </Link>
              <Link href="/about" className="block text-white/60 hover:text-white transition-colors">
                關於我們
              </Link>
              <Link href="/contact" className="block text-white/60 hover:text-white transition-colors">
                聯絡我們
              </Link>
              <Link href="/support" className="block text-white/60 hover:text-white transition-colors">
                客戶支援
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4 text-white">客戶服務</h4>
            <div className="space-y-2">
              <Link href="/account" className="block text-white/60 hover:text-white transition-colors">
                我的帳戶
              </Link>
              <Link href="/cart" className="block text-white/60 hover:text-white transition-colors">
                購物車
              </Link>
              <Link href="/checkout" className="block text-white/60 hover:text-white transition-colors">
                結帳
              </Link>
              <Link href="/search" className="block text-white/60 hover:text-white transition-colors">
                商品搜尋
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-white">聯絡資訊</h4>
            <div className="space-y-2 text-white/60">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+886-2-1234-5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@vibe.com</span>
              </div>
              <p>週一至週五 09:00-18:00</p>
            </div>
          </div>
        </div>

        <hr className="my-8 border-white/20" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © 2024 VIBE. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              隱私政策
            </Link>
            <Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              服務條款
            </Link>
            <Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              Cookie 政策
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}