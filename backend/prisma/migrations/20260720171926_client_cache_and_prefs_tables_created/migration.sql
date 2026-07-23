/*
  Warnings:

  - You are about to drop the `Cache` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Preferences` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Cache";

-- DropTable
DROP TABLE "Preferences";

-- CreateTable
CREATE TABLE "User_preferences" (
    "id" SERIAL NOT NULL,
    "topic" TEXT[],
    "owner_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clients_preferences" (
    "id" SERIAL NOT NULL,
    "topic" TEXT[],
    "owner_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Clients_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_cache" (
    "id" SERIAL NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "content_json" JSONB NOT NULL,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_cache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client_cache" (
    "id" SERIAL NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "content_json" JSONB NOT NULL,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_cache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_preferences_owner_id_key" ON "User_preferences"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Clients_preferences_owner_id_key" ON "Clients_preferences"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_cache_owner_id_key" ON "User_cache"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Client_cache_owner_id_key" ON "Client_cache"("owner_id");
