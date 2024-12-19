import { SearchBar } from "@/components/SearchBar";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Main Hero Section */}
      <div className="bg-gradient-to-r from-[#4ABD98] to-[#2C6F41] min-h-[700px] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="relative text-center max-w-5xl mx-auto">
          {/* Main Content */}
          <div className="space-y-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight">
              Connect{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-100">
                Food Influencers
              </span>{" "}
              with Amazing Restaurants
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              The premier marketplace for food content creators and restaurants to collaborate 
              and create amazing content that drives results
            </p>
            <div className="max-w-2xl mx-auto">
              <SearchBar />
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {[
                { number: "1000+", label: "Creators" },
                { number: "500+", label: "Restaurants" },
                { number: "5000+", label: "Collaborations" },
                { number: "98%", label: "Success Rate" },
              ].map((stat) => (
                <div key={stat.label} className="text-white">
                  <div className="text-4xl font-bold">{stat.number}</div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Clients Section */}
      <div className="bg-white/95 backdrop-blur-sm py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-gray-600 text-sm font-medium mb-8">
            TRUSTED BY LEADING RESTAURANTS AND BRANDS
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {[
              { name: "McDonald's", logo: "M" },
              { name: "Burger King", logo: "BK" },
              { name: "Starbucks", logo: "★" },
              { name: "Subway", logo: "S" },
              { name: "Pizza Hut", logo: "PH" },
              { name: "KFC", logo: "KFC" },
            ].map((client) => (
              <div
                key={client.name}
                className="h-12 w-24 flex items-center justify-center rounded-lg bg-gray-100 text-gray-500 font-bold text-xl"
                title={client.name}
              >
                {client.logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};