/*
  Warnings:

  - Added the required column `password` to the `Citizen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Leader` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Citizen" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Leader" ADD COLUMN     "password" TEXT NOT NULL;
