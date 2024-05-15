import DashboardCard from "@/components/DashboarCard";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import db from "../db/db";
import { getProductData } from "../db/product";
import { getSalesData } from "../db/sales";
import { getUserData } from "../db/user";


export default async function page() {
  const [salesData, customersData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <DashboardCard
        title='Sales'
        subtitle={`${formatNumber(salesData.numberOfSales)} Ordrers`}
        body={formatCurrency(salesData.amount)}
      />

      <DashboardCard
        title='Customers'
        subtitle={`${formatCurrency(
          customersData.averageValuePerUser
        )} Average Value`}
        body={formatNumber(customersData.userCount)}
      />

      <DashboardCard
        title='Active Products'
        subtitle={`${formatNumber(productData.inactiveProducts)} Inactive Products`}
        body={`${formatNumber(productData.activeProducts)}`}
      />
    </div>
  );
}
