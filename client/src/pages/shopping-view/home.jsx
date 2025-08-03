import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: null },
  { id: "women", label: "Women", icon: null },
  { id: "kids", label: "Kids", icon: null },
  { id: "accessories", label: "Accessories", icon: null },
  { id: "footwear", label: "Footwear", icon: null },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: null },
  { id: "adidas", label: "Adidas", icon: null },
  { id: "puma", label: "Puma", icon: null },
  { id: "levi", label: "Levi's", icon: null },
  { id: "zara", label: "Zara", icon: null },
  { id: "h&m", label: "H&M", icon: null },
];


const bannerImages = [bannerOne, bannerTwo, bannerThree];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [imageError, setImageError] = useState(false); 

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product added to cart!",
          className: "bg-[#6793AC] text-white border-none font-poppins",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerImages.length);
    }, 3000); // 3-second interval
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  // Handle image loading errors
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-poppins">
      <section className="relative w-full h-[600px] overflow-hidden bg-gradient-to-b from-[#6793AC]/20 to-gray-100">
        {/* Image Slider */}
        <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-white text-lg">Failed to load banner image</span>
            </div>
          ) : (
            <img
              src={bannerImages[currentSlide]}
              alt={`Banner ${currentSlide + 1}`}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Center Text */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            Discover Your Style
          </h1>
          <Button
            onClick={() => navigate("/shop/listing")}
            className="bg-[#E4580B] hover:bg-[#E4580B]/90 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Shop Now
          </Button>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length)
          }
          className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-[#114AB1]/80 hover:bg-[#114AB1] text-white rounded-full shadow-md transition-all duration-300 hover:scale-110"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prev) => (prev + 1) % bannerImages.length)
          }
          className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-[#114AB1]/80 hover:bg-[#114AB1] text-white rounded-full shadow-md transition-all duration-300 hover:scale-110"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </Button>
      </section>

      {/* Category Section */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-800 text-center mb-10">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {categoriesWithIcon.map((categoryItem, idx) => (
              <Card
                key={categoryItem.id}
                onClick={() => handleNavigateToListingPage(categoryItem, "category")}
                className="group relative bg-white border border-[#6793AC]/20 rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#6793AC]/10 to-[#E4580B]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="relative flex flex-col items-center justify-center p-5">
                  {categoryItem.icon && (
                    <categoryItem.icon className="w-8 h-8 text-[#114AB1] mb-3 transition-transform duration-300 group-hover:scale-105" />
                  )}
                  <span className="font-medium text-base text-[#114AB1]">
                    {categoryItem.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Section */}
      <section className="py-12 px-6 bg-[#6793AC]/5">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-800 text-center mb-10">
            Brands You'll Love
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {brandsWithIcon.map((brandItem, idx) => (
              <Card
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="group relative bg-white border border-[#6793AC]/20 rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#6793AC]/10 to-[#E4580B]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="relative flex flex-col items-center justify-center p-5">
                  {brandItem.icon && (
                    <brandItem.icon className="w-8 h-3 text-[#E4580B] mb-3 transition-transform duration-300 group-hover:scale-105" />
                  )}
                  <span className="font-medium text-base text-[#114AB1]">
                    {brandItem.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-800 text-center mb-10">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem, idx) => (
                  <ShoppingProductTile
                    key={productItem.id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                    className="group animate-slide-in-up"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  />
                ))
              : null}
          </div>
        </div>
      </section>

      {/* Product Details Dialog */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
        className="animate-zoom-in"
      />
    </div>
  );
}

export default ShoppingHome;