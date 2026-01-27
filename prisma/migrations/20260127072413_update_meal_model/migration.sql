-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_providerProfileId_fkey";

-- AlterTable
ALTER TABLE "Meal" ALTER COLUMN "providerProfileId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_providerProfileId_fkey" FOREIGN KEY ("providerProfileId") REFERENCES "ProviderProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
