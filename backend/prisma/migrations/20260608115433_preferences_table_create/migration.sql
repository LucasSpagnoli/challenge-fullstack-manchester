/*
  Warnings:

  - You are about to drop the column `preferences` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "preferences";

-- CreateTable
CREATE TABLE "Preferences" (
    "id" SERIAL NOT NULL,
    "topic" TEXT[],
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("id")
);
