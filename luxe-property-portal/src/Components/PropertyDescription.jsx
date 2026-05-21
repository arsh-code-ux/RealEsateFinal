import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PropertyDescription() {
  const { id } = useParams();

  // Core Component States
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Interactive Message Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    requirement: "",
  });

  // Lightbox Modal States
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchPropertyData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const mockApiResponse = {
          id: "modern-luxury-koramangala",
          title: "Modern Luxury Stay",
          location: "Koramangala 4th Block, Bangalore",
          price: 75000,
          originalPrice: 82000,
          discount: "8% OFF",
          securityDeposit: 150000,
          configuration: "3 BHK",
          area: "1,850 sqft",
          availableFrom: "15 Oct",
          tenantType: "Family/Prof",
          images: [
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200",
            "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200",
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
          ],
          description:
            "Experience a new standard of high-end living in the heart of Koramangala 4th Block. This meticulously designed 3-BHK apartment caters specifically to the needs of tech professionals and expatriates seeking both convenience and luxury. Featuring a smart home system, high-speed fiber connectivity, and bespoke furniture, this residence bridges the gap between professional efficiency and domestic comfort.",
          amenities: [
            { name: "Gigabit Fiber Wi-Fi", icon: "🌐" },
            { name: "Private Mini-Gym", icon: "🏋️" },
            { name: "100% Power Backup", icon: "⚡" },
            { name: "EV-Ready Parking", icon: "🔌" },
            { name: "24/7 Biometric Security", icon: "🛡️" },
            { name: "Weekly Housekeeping", icon: "🧹" },
          ],
          reviews: [
            {
              id: 1,
              name: "Arjun Kapoor",
              role: "Product Manager at Google",
              stayDuration: "6 months stay",
              rating: 5,
              comment:
                "The 'verified' signal isn't just marketing. The property looks exactly like the photos. Managing the lease was incredibly smooth. Highly recommend for any tech professional moving to Bangalore.",
            },
            {
              id: 2,
              name: "Sarah Liao",
              role: "Tech Expat",
              stayDuration: "1 year stay",
              rating: 4,
              comment:
                "Great location, right next to the best cafes. The biometric security gives peace of mind. Only small issue was the gym equipment took a week to fix once, but the management was responsive.",
            },
          ],
        };

        if (id !== mockApiResponse.id) {
          throw new Error(
            "Property listing signature matching parameter not found.",
          );
        }

        setProperty(mockApiResponse);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [id]);

  // Lightbox Navigation Functions
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const handleNextImage = () => {
    if (!property) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrevImage = () => {
    if (!property) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1,
    );
  };

  // Handle Keyboard Arrow Keys for Lightbox navigation
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "Escape") setIsLightboxOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, property, currentImageIndex]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("POST request payload package:", {
      propertyId: id,
      ...formData,
    });
    alert("Inquiry successfully simulated! Data packet printed to console.");
    setFormData({ name: "", email: "", requirement: "" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-indigo-900 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-bold text-slate-500">
            Retrieving Listing Parameters...
          </p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <h2 className="text-xl font-bold text-slate-800">
          Error Loading Property Details
        </h2>
        <p className="text-sm text-slate-500">
          {error || "Could not fetch listing metadata."}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans antialiased">
      {/* Cleaned Navbar (Buttons Removed) */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <span className="text-xl font-black text-indigo-900 tracking-tight">
            Luxe Bangalore
          </span>
          <div className="hidden md:flex space-x-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <a
              href="#"
              className="text-indigo-600 border-b-2 border-indigo-600 pb-1"
            >
              Browse
            </a>
            <a href="#" className="hover:text-indigo-600">
              Verified
            </a>
            <a href="#" className="hover:text-indigo-600">
              Neighborhoods
            </a>
            <a href="#" className="hover:text-indigo-600">
              Invest
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content Dashboard */}
      <main className="max-w-6xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Layout Image Grid (Clickable to open lightbox) */}
          <div className="grid grid-cols-3 gap-3 rounded-xl overflow-hidden h-[240px] md:h-[350px]">
            <div
              className="col-span-2 bg-slate-200 cursor-pointer overflow-hidden"
              onClick={() => openLightbox(0)}
            >
              <img
                src={property.images[0]}
                alt="Living Room View"
                className="w-full h-full object-cover hover:scale-[1.02] transition duration-300"
              />
            </div>
            <div className="grid grid-rows-2 gap-3">
              <div
                className="bg-slate-200 overflow-hidden cursor-pointer"
                onClick={() => openLightbox(1)}
              >
                <img
                  src={property.images[1]}
                  alt="Kitchen View"
                  className="w-full h-full object-cover hover:scale-[1.03] transition duration-300"
                />
              </div>
              <div
                className="bg-slate-200 overflow-hidden relative group cursor-pointer"
                onClick={() => openLightbox(2)}
              >
                <img
                  src={property.images[2]}
                  alt="Bedroom View"
                  className="w-full h-full object-cover brightness-90 group-hover:brightness-75 transition duration-300"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white font-bold text-xs md:text-sm bg-black/20 group-hover:bg-black/40 transition">
                  <span>View Full Gallery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info Badges */}
          <div className="bg-white border border-slate-100 rounded-xl p-4 grid grid-cols-4 gap-2 text-center shadow-sm">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                Configuration
              </p>
              <p className="text-xs md:text-sm font-black text-slate-700 mt-1">
                {property.configuration}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                Area
              </p>
              <p className="text-xs md:text-sm font-black text-slate-700 mt-1">
                {property.area}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                Available From
              </p>
              <p className="text-xs md:text-sm font-black text-slate-700 mt-1">
                {property.availableFrom}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                Tenant Type
              </p>
              <p className="text-xs md:text-sm font-black text-slate-700 mt-1">
                {property.tenantType}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-black text-slate-900 mb-2">
              Property Overview
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Amenities */}
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-black text-slate-900 mb-4">
              Amenities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {property.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <span className="text-lg">{amenity.icon}</span>
                  <span className="text-xs font-bold text-slate-700">
                    {amenity.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Map Location Placeholder */}
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-black text-slate-900">Location</h3>
              <span className="text-indigo-600 text-xs font-bold cursor-pointer">
                Open in Google Maps ↗
              </span>
            </div>
            <div className="relative h-44 bg-emerald-50 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-opacity-20 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="bg-white shadow-sm border border-slate-200 px-4 py-2 rounded-full font-bold text-xs text-slate-800 flex items-center space-x-2 z-10">
                <span className="text-indigo-600">📍</span>
                <span>{property.title}</span>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-base font-black text-slate-900">
                Tenant Reviews
              </h3>
              <div className="flex items-center space-x-1 text-xs font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded">
                <span>★ 4.8</span>
                <span className="text-slate-400 font-medium">(24 Reviews)</span>
              </div>
            </div>
            <div className="space-y-4 divide-y divide-slate-100">
              {property.reviews.map((review) => (
                <div key={review.id} className="pt-4 first:pt-0 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-black text-slate-800">
                        {review.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {review.role} • {review.stayDuration}
                      </p>
                    </div>
                    <div className="text-amber-500 text-xs">
                      {"★".repeat(review.rating)}
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-24 h-fit">
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-md space-y-4">
            <div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-black text-slate-900">
                  ₹{property.price.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  / month
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs line-through text-slate-400">
                  ₹{property.originalPrice.toLocaleString("en-IN")}
                </span>
                <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-1.5 py-0.5 rounded uppercase">
                  {property.discount}
                </span>
              </div>
            </div>

            <div className="border-t border-b border-slate-100 py-3 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">
                  Security Deposit
                </span>
                <span className="font-bold text-slate-700">
                  ₹{property.securityDeposit.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">
                  Brokerage Fee
                </span>
                <span className="text-emerald-700 font-bold">
                  Zero Brokerage
                </span>
              </div>
            </div>

            <button className="w-full bg-indigo-600 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-indigo-700 transition">
              Schedule Virtual Tour
            </button>
          </div>

          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-md space-y-4">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Message Landlord
            </h4>
            <form onSubmit={handleFormSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <input
                type="email"
                name="email"
                placeholder="Work Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <textarea
                name="requirement"
                rows="3"
                placeholder="Describe your requirement..."
                value={formData.requirement}
                onChange={handleInputChange}
                required
                className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:ring-2 focus:ring-indigo-600 resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-slate-950 text-white py-2.5 rounded-xl text-xs font-bold uppercase hover:bg-slate-800 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* LIGHTBOX OVERLAY INTERACTIVE MODAL */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 select-none transition-opacity duration-300">
          {/* Top Close Control */}
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl p-2 transition focus:outline-none z-50"
            onClick={() => setIsLightboxOpen(false)}
          >
            ✕
          </button>

          {/* Left Arrow Navigation Symbol */}
          <button
            className="absolute left-6 text-white/60 hover:text-white text-5xl font-mono p-4 transition bg-white/5 hover:bg-white/10 rounded-full focus:outline-none z-50"
            onClick={handlePrevImage}
          >
            ‹
          </button>

          {/* Main Large Active Image Frame */}
          <div className="max-w-[85vw] max-h-[80vh] flex flex-col items-center justify-center">
            <img
              src={property.images[currentImageIndex]}
              alt="Enlarged gallery snapshot view"
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="text-white/50 text-xs tracking-widest mt-4 uppercase font-bold">
              Image {currentImageIndex + 1} of {property.images.length}
            </div>
          </div>

          {/* Right Arrow Navigation Symbol */}
          <button
            className="absolute right-6 text-white/60 hover:text-white text-5xl font-mono p-4 transition bg-white/5 hover:bg-white/10 rounded-full focus:outline-none z-50"
            onClick={handleNextImage}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
