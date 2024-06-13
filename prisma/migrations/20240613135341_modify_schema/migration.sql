/*
  Warnings:

  - You are about to drop the column `create` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ticket` DROP COLUMN `create`,
    DROP COLUMN `updateAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
