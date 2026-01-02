/*
  Warnings:

  - The primary key for the `Leader` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Leader` table. All the data in the column will be lost.
  - Added the required column `number` to the `Leader` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_leaderId_fkey";

-- AlterTable
ALTER TABLE "Leader" DROP CONSTRAINT "Leader_pkey",
DROP COLUMN "id",
ADD COLUMN     "number" TEXT NOT NULL,
ADD CONSTRAINT "Leader_pkey" PRIMARY KEY ("number");

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "Leader"("number") ON DELETE RESTRICT ON UPDATE CASCADE;
