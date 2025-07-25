"use client"

import { Metadata } from 'next'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { ProductCard } from '@/components/ProductCard'
import { Search, Filter, SlidersHorizontal } from 'lucide-react'

interface Product {
  id: number;
  name: string;
  price_in_cents: number;
  image_url: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [sortBy, setSortBy] = useState('relevance')
  const [priceRange, setPriceRange] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const minPrice = 0
  const maxPrice = 500000 // 5000 NT$

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let results = [...products]

    // Filter by search query
    if (searchQuery.trim()) {
      results = results.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by price range
    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'under-100':
          results = results.filter(p => p.price_in_cents < 10000)
          break
        case '100-500':
          results = results.filter(p => p.price_in_cents >= 10000 && p.price_in_cents < 50000)
          break
        case '500-1000':
          results = results.filter(p => p.price_in_cents >= 50000 && p.price_in_cents < 100000)
          break
        case '1000-3000':
          results = results.filter(p => p.price_in_cents >= 100000 && p.price_in_cents < 300000)
          break
        case 'over-3000':
          results = results.filter(p => p.price_in_cents >= 300000)
          break
      }
    }

    // Sort results
    switch (sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price_in_cents - b.price_in_cents)
        break
      case 'price-high':
        results.sort((a, b) => b.price_in_cents - a.price_in_cents)
        break
      case 'name':
        results.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // Keep original order for relevance
        break
    }

    setFilteredProducts(results)
  }, [products, searchQuery, sortBy, priceRange])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you might want to update the URL here
  }

  function formatPrice(cents: number): string {
    return `NT$ ${(cents / 100).toLocaleString()}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">搜尋中...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-4">
            搜尋結果
          </Badge>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {searchQuery ? `"${searchQuery}" 的搜尋結果` : '所有商品'}
          </h1>
          <p className="text-gray-600">
            找到 {filteredProducts.length} 項商品
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="搜尋商品..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit">搜尋</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                篩選
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Filters */}
        {showFilters && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">排序方式</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">相關性</SelectItem>
                      <SelectItem value="price-low">價格：低至高</SelectItem>
                      <SelectItem value="price-high">價格：高至低</SelectItem>
                      <SelectItem value="name">名稱 A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">價格範圍</label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有價格</SelectItem>
                      <SelectItem value="under-100">NT$ 100 以下</SelectItem>
                      <SelectItem value="100-500">NT$ 100 - 500</SelectItem>
                      <SelectItem value="500-1000">NT$ 500 - 1,000</SelectItem>
                      <SelectItem value="1000-3000">NT$ 1,000 - 3,000</SelectItem>
                      <SelectItem value="over-3000">NT$ 3,000 以上</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">商品類型</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="type1" />
                      <label htmlFor="type1" className="text-sm">時尚配件</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="type2" />
                      <label htmlFor="type2" className="text-sm">生活用品</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="type3" />
                      <label htmlFor="type3" className="text-sm">運動休閒</label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-16">
            <CardContent>
              <div className="mb-6">
                <Search className="mx-auto h-16 w-16 text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">沒有找到相關商品</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery 
                  ? `很抱歉，沒有找到與 "${searchQuery}" 相關的商品`
                  : '目前沒有符合篩選條件的商品'
                }
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">建議您可以：</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• 檢查拼字是否正確</li>
                  <li>• 嘗試更簡單的關鍵字</li>
                  <li>• 使用更廣泛的搜尋條件</li>
                  <li>• 調整價格篩選範圍</li>
                </ul>
              </div>
              <Button 
                className="mt-6" 
                onClick={() => {
                  setSearchQuery('')
                  setPriceRange('all')
                  setSortBy('relevance')
                }}
              >
                清除所有篩選
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Pagination would go here in a real app */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              顯示 {filteredProducts.length} 項商品中的全部結果
            </p>
            {/* Pagination component would be added here */}
          </div>
        )}
      </div>
    </div>
  )
}