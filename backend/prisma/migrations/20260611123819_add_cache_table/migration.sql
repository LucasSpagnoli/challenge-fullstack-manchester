-- CreateTable
CREATE TABLE "Cache" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "content_json" JSONB NOT NULL,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cache_pkey" PRIMARY KEY ("id")
);
