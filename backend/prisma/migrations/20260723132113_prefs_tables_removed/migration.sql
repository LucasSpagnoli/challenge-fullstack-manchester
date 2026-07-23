/*
  Warnings:

  - You are about to drop the `Clients_preferences` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_preferences` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Clients" ADD COLUMN     "preferences" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "preferences" TEXT[];

-- DropTable
DROP TABLE "Clients_preferences";

-- DropTable
DROP TABLE "User_preferences";
