/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Cache` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Cache_user_id_key" ON "Cache"("user_id");
