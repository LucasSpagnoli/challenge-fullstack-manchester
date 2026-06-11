/*
  Warnings:

  - The `content_json` column on the `Cache` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Cache" DROP COLUMN "content_json",
ADD COLUMN     "content_json" JSONB[];
