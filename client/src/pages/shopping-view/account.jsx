import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";

function ShoppingAccount() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-poppins">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          className="h-full w-full object-cover object-center transition-transform duration-1000 hover:scale-105"
          alt="Account Banner"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#6793AC]/30"></div>
      </div>
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col rounded-xl bg-white p-6 shadow-md border border-[#6793AC]/20 animate-fade-in">
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-lg bg-[#6793AC]/10 p-1">
              <TabsTrigger
                value="orders"
                className="rounded-md text-[#114AB1] font-medium data-[state=active]:bg-white data-[state=active]:text-[#E4580B] data-[state=active]:shadow-sm transition-all duration-200"
              >
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="address"
                className="rounded-md text-[#114AB1] font-medium data-[state=active]:bg-white data-[state=active]:text-[#E4580B] data-[state=active]:shadow-sm transition-all duration-200"
             

 >
                Address
              </TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="mt-5">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address" className="mt-5">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;