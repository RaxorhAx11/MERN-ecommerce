import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({ title: data?.payload?.message });
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[650px] p-6">
      <div className="space-y-6">
        {/* Order Info */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-primary">Order Summary</h3>
          <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
            <span>Order ID:</span>
            <Label>{orderDetails?._id}</Label>
            <span>Order Date:</span>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
            <span>Total Price:</span>
            <Label>${orderDetails?.totalAmount}</Label>
            <span>Payment Method:</span>
            <Label>{orderDetails?.paymentMethod}</Label>
            <span>Payment Status:</span>
            <Label>{orderDetails?.paymentStatus}</Label>
            <span>Order Status:</span>
            <Badge
              className={`capitalize px-3 py-1 text-xs font-medium ${
                orderDetails?.orderStatus === "confirmed"
                  ? "bg-green-500 text-white"
                  : orderDetails?.orderStatus === "rejected"
                  ? "bg-red-600 text-white"
                  : "bg-gray-500 text-white"
              }`}
            >
              {orderDetails?.orderStatus}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Cart Items */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-primary">Items in Order</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {orderDetails?.cartItems?.map((item, idx) => (
              <li key={idx} className="flex justify-between text-sm border-b py-1">
                <span>{item.title}</span>
                <span>Qty: {item.quantity}</span>
                <span>${item.price}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Shipping Info */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-primary">Shipping Info</h3>
          <div className="grid gap-1 text-sm text-muted-foreground">
            <span>{user?.userName}</span>
            <span>{orderDetails?.addressInfo?.address}</span>
            <span>{orderDetails?.addressInfo?.city}</span>
            <span>{orderDetails?.addressInfo?.pincode}</span>
            <span>{orderDetails?.addressInfo?.phone}</span>
            <span>{orderDetails?.addressInfo?.notes}</span>
          </div>
        </div>

        {/* Order Status Update Form */}
        <div className="pt-2">
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
