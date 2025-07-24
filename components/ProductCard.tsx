"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price_in_cents: number;
  image_url: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (cents: number): string => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  return (
    <Card 
      className="group relative bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 opacity-0 animate-[fadeInUp_1s_ease-out_forwards] overflow-hidden"
      style={{ animationDelay: `${0.8 + index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Liquid glass overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 liquid-shimmer" />
      
      {/* Floating glass orb effect */}
      <div className={`absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-sm transition-all duration-700 ${isHovered ? 'scale-150 opacity-100' : 'scale-100 opacity-0'}`} />
      
      <CardContent className="p-0 relative z-10">
        <div className="relative overflow-hidden">
          <Image
            src={product.image_url}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-48 object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Glass reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[glassShimmer_2s_ease-in-out_infinite]" />
          
          {/* New badge */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <Badge className="bg-white/20 text-white border-none backdrop-blur-sm">
              New
            </Badge>
          </div>
        </div>
        
        <div className="p-4 relative">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative z-10">
            <h3 className="text-white font-semibold mb-2 group-hover:text-blue-300 transition-colors duration-300 line-clamp-2">
              {product.name}
            </h3>
            
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {formatPrice(product.price_in_cents)}
              </span>
              
              <Button 
                size="sm" 
                className="relative bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-none shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                {/* Button glass overlay */}
                <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Add to Cart</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}