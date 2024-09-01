import Ticket from "../../models/ticketModel.js";
import Wallet from "../../models/walletModel.js";
export const cleanupData = async () => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6); // deleting data from 6 months ago
  await Ticket.deleteMany({ timestamp: { $lt: sixMonthsAgo } });
  await Wallet.updateMany(
    {},
    { $pull: { transactions: { timestamp: { $lt: sixMonthsAgo } } } }
  );

  console.log("Old ticket and transaction data cleaned up successfully.");
};
