import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="sm:max-w-[600px] bg-white border-[#6793AC]/20 shadow-md rounded-lg font-poppins relative overflow-hidden animate-zoom-in">
      {/* Wave Background */}
      <div className="absolute inset-0">
        <svg className="absolute bottom-0 left-0 w-full h-6" viewBox="0 0 1440 40" preserveAspectRatio="none">
          <path d="M0,40 C360,0 1080,80 1440,40 L1440,40 L0,40 Z" fill="#FFFFFF" fillOpacity="0.3" className="wave-1" />
          <path d="M0,40 C400,20 800,60 1200,20 C1320,0 1440,40 1440,40 L1440,40 L0,40 Z" fill="#FFFFFF" fillOpacity="0.2" className="wave-2" />
        </svg>
      </div>
      <div className="grid gap-4 p-4 z-10">
        <div className="grid gap-2">
          <div className="flex mt-4 items-center justify-between">
            <p className="font-medium text-[#114AB1] text-sm">Order ID</p>
            <Label className="text-sm text-gray-600 wave-effect">{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-[#114AB1] text-sm">Order Date</p>
            <Label className="text-sm text-gray-600 wave-effect">{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-[#114AB1] text-sm">Order Price</p>
            <Label className="text-sm text-gray-600 wave-effect">${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-[#114AB1] text-sm">Payment method</p>
            <Label className="text-sm text-gray-600 wave-effect">{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-[#114AB1] text-sm">Payment Status</p>
            <Label className="text-sm text-gray-600 wave-effect">{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-[#114AB1] text-sm">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 bg-[#E4580B] hover:bg-[#E4580B]/90 text-white`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator className="bg-[#6793AC]/20" />
        <div className="grid gap-3">
          <div className="font-medium text-[#114AB1] text-xl">Order Details</div>
          <ul className="grid gap-2">
            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
              ? orderDetails?.cartItems.map((item, idx) => (
                  <li key={item.title} className="flex items-center justify-between text-sm text-gray-600 wave-effect" style={{ animationDelay: `${idx * 0.2}s` }}>
                    <span>Title: {item.title}</span>
                    <span>Quantity: {item.quantity}</span>
                    <span>Price: ${item.price}</span>
                  </li>
                ))
              : null}
          </ul>
        </div>
        <div className="grid gap-3">
          <div className="font-medium text-[#114AB1] text-xl">Shipping Info</div>
          <div className="grid gap-0.5 text-gray-600 text-sm">
            <span className="wave-effect">{user.userName}</span>
            <span className="wave-effect">{orderDetails?.addressInfo?.address}</span>
            <span className="wave-effect">{orderDetails?.addressInfo?.city}</span>
            <span className="wave-effect">{orderDetails?.addressInfo?.pincode}</span>
            <span className="wave-effect">{orderDetails?.addressInfo?.phone}</span>
            <span className="wave-effect">{orderDetails?.addressInfo?.notes}</span>
          </div>
        </div>
      </div>
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
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;