/*
  Warnings:

  - Changed the type of `content_json` on the `Cache` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Cache" DROP COLUMN "content_json",
ADD COLUMN     "content_json" JSONB NOT NULL;
