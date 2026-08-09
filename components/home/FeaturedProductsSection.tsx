import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/shop/ProductCard'
import { getFeaturedProducts } from '@/lib/data'

async function FeaturedProductsContent() {
  const products = await getFeaturedProducts()

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No featured products available yet.</p>
        <Button render={<Link href="/admin/products/add" />}>
          Add First Product
        </Button>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}

export function FeaturedProductsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-light to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <p className="text-accent font-bold text-sm uppercase tracking-widest bg-accent/10 px-4 py-2 rounded-full inline-block mb-4">
            Premium Systems
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            Featured Gaming Systems
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hand-picked gaming laptops and PCs for every level of gamer
          </p>
        </div>

        <Suspense fallback={
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-96 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        }>
          <FeaturedProductsContent />
        </Suspense>

        <div className="flex justify-center mt-16">
          <Button
            render={<Link href="/shop" />}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-12 py-6 text-lg font-semibold shadow-lg"
          >
            View All Products <ArrowUpRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
