-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'DELIVERY_MAN';

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "deliveryManId" TEXT;

-- CreateTable
CREATE TABLE "DeliveryProfile" (
    "id" TEXT NOT NULL,
    "vehicleType" TEXT,
    "vehicleNumber" TEXT,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeliveryProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryProfile_userId_key" ON "DeliveryProfile"("userId");

-- AddForeignKey
ALTER TABLE "DeliveryProfile" ADD CONSTRAINT "DeliveryProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_deliveryManId_fkey" FOREIGN KEY ("deliveryManId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
