import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Toast from './components/Toast'
import Home from './pages/Home'
import Listings from './pages/Listings'
import Login from './pages/Login'
import Signup from './pages/Signup'
import About from './pages/About'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Contact from './pages/Contact'
import HelpCenter from './pages/HelpCenter'
import FAQ from './pages/FAQ'
import NeighborhoodDetail from './pages/NeighborhoodDetail'
import PropertyDetail from './pages/PropertyDetail'
import PostProperty from './pages/PostProperty'

function AppContent() {
  const { pathname } = useLocation()
  
  // Routes where navbar and footer should be hidden
  const hideHeaderFooter = pathname === '/login' || pathname === '/signup' || pathname === '/post-property'

  return (
    <div>
      {!hideHeaderFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/neighborhood/:slug" element={<NeighborhoodDetail />} />
        <Route path="/property/:slug" element={<PropertyDetail />} />
        <Route path="/post-property" element={<PostProperty />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
      <Toast />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
