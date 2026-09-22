import Hero from '../components/Hero'
import Categories from '../components/Categories'
import BestSellers from '../components/BestSellers'
import NewArrivals from '../components/NewArrivals'
import PromoBanner from '../components/PromoBanner'

function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <BestSellers />
      <NewArrivals />
      <PromoBanner />
    </main>
  )
}

export default Home