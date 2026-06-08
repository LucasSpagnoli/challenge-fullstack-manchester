/*
  Warnings:

  - You are about to drop the column `interestedIn` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "interestedIn",
ADD COLUMN     "preferences" TEXT[];
