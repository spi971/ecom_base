import db from "./db";

export async function getUserData() {
    const [userCount, orderData] = await Promise.all([
      db.user.count(),
      db.order.aggregate({
        _sum: { pricePaidInCents: true },
      }),
    ]);
  
    return {
      userCount,
      averageValuePerUser:
        userCount === 0
          ? 0
          : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
    };
  }