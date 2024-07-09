/*
  Warnings:

  - You are about to drop the column `senderId` on the `message` table. All the data in the column will be lost.
  - Added the required column `memberId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_senderId_fkey`;

-- AlterTable
ALTER TABLE `message` DROP COLUMN `senderId`,
    ADD COLUMN `memberId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
