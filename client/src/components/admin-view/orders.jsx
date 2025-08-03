import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <Card className="shadow-sm border rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-primary">All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="min-w-full text-sm">
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="font-semibold text-foreground">Order ID</TableHead>
                <TableHead className="font-semibold text-foreground">Order Date</TableHead>
                <TableHead className="font-semibold text-foreground">Status</TableHead>
                <TableHead className="font-semibold text-foreground">Total</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList && orderList.length > 0 ? (
                orderList.map((orderItem) => (
                  <TableRow
                    key={orderItem._id}
                    className="hover:bg-muted transition-all"
                  >
                    <TableCell className="whitespace-nowrap">
                      {orderItem._id}
                    </TableCell>
                    <TableCell>
                      {orderItem?.orderDate.split("T")[0]}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`capitalize px-3 py-1 text-xs font-medium ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500 text-white"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600 text-white"
                            : "bg-gray-500 text-white"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>${orderItem?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={(open) => {
                          setOpenDetailsDialog(open);
                          if (!open) dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                          className="text-xs"
                        >
                          View Details
                        </Button>
                        {orderDetails?._id === orderItem._id && (
                          <AdminOrderDetailsView orderDetails={orderDetails} />
                        )}
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="5" className="text-center py-4 text-muted-foreground">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;
