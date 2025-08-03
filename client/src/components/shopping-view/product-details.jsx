import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const { toast } = useToast();

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
            className: "bg-[#E4580B] text-white border-none font-poppins text-sm",
          });
          return;
        }
      }
    }
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
          title: "Product is added to cart",
          className: "bg-[#6793AC] text-white border-none font-poppins text-sm",
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
          className: "bg-[#6793AC] text-white border-none font-poppins text-sm",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-6 sm:p-8 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] bg-white border-[#6793AC]/20 shadow-md rounded-lg font-poppins relative overflow-hidden animate-zoom-in top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed">
        <div className="absolute inset-0">
          <svg className="absolute bottom-0 left-0 w-full h-6" viewBox="0 0 1440 40" preserveAspectRatio="none">
            <path d="M0,40 C360,0 1080,80 1440,40 L1440,40 L0,40 Z" fill="#FFFFFF" fillOpacity="0.3" className="wave-1" />
            <path d="M0,40 C400,20 800,60 1200,20 C1320,0 1440,40 1440,40 L1440,40 L0,40 Z" fill="#FFFFFF" fillOpacity="0.2" className="wave-2" />
          </svg>
        </div>
        <div className="relative overflow-hidden rounded-lg z-10">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="z-10">
          <div>
            <h1 className="text-2xl font-bold text-[#114AB1] wave-effect">{productDetails?.title}</h1>
            <p className="text-gray-600 text-base mt-3 mb-4">{productDetails?.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-xl font-bold text-[#114AB1] ${productDetails?.salePrice > 0 ? "line-through" : ""}`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-xl font-bold text-[#E4580B]">${productDetails?.salePrice}</p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarRatingComponent rating={averageReview} starColor="#114AB1" />
            </div>
            <span className="text-gray-600 text-sm">({averageReview.toFixed(2)})</span>
          </div>
          <div className="mt-4 mb-4">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full bg-[#E4580B]/60 hover:bg-[#E4580B]/60 text-white text-sm rounded-lg cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full bg-[#E4580B] hover:bg-[#E4580B]/90 text-white text-sm rounded-lg transition-all duration-300 hover:scale-105"
                onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)}
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator className="bg-[#6793AC]/20" />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold text-[#114AB1] mb-3">Reviews</h2>
            <div className="grid gap-4">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem, idx) => (
                  <div key={reviewItem._id} className="flex gap-3 wave-effect" style={{ animationDelay: `${idx * 0.2}s` }}>
                    <Avatar className="w-8 h-8 border-[#6793AC]/20">
                      <AvatarFallback className="text-[#114AB1] text-sm">{reviewItem?.userName[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-[#114AB1] text-sm">{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={reviewItem?.reviewValue} starColor="#114AB1" />
                      </div>
                      <p className="text-gray-600 text-sm">{reviewItem.reviewMessage}</p>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="text-sm text-gray-600">No Reviews</h1>
              )}
            </div>
            <div className="mt-8 flex-col flex gap-2">
              <Label className="text-[#114AB1] text-sm">Write a review</Label>
              <div className="flex gap-1">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                  starColor="#114AB1"
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review..."
                className="border-[#6793AC]/30 focus:ring-[#114AB1] rounded-lg text-sm"
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
                className="bg-[#E4580B] hover:bg-[#E4580B]/90 text-white text-sm rounded-lg transition-all duration-300 hover:scale-105"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
      <style>{`
        .wave-1 { animation: wave1 6s ease-in-out infinite; }
        .wave-2 { animation: wave2 8s ease-in-out infinite; }
        @keyframes wave1 {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-100px); }
        }
        @keyframes wave2 {
          0%, 100% { transform: translateX(-50px); }
          50% { transform: translateX(50px); }
        }
        .wave-effect {
          animation: ripple 6s ease-in-out infinite;
        }
        @keyframes ripple {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </Dialog>
  );
}

export default ProductDetailsDialog;  

