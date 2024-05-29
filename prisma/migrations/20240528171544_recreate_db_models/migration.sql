/*
  Warnings:

  - You are about to drop the column `userId` on the `channel` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `member` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `server` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,serverId,channelId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `channelId` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `channel` DROP FOREIGN KEY `Channel_userId_fkey`;

-- DropForeignKey
ALTER TABLE `server` DROP FOREIGN KEY `Server_userId_fkey`;

-- DropIndex
DROP INDEX `Channel_userId_serverId_idx` ON `channel`;

-- AlterTable
ALTER TABLE `channel` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `member` DROP COLUMN `name`,
    ADD COLUMN `channelId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `server` DROP COLUMN `userId`;

-- CreateIndex
CREATE UNIQUE INDEX `Member_userId_serverId_channelId_key` ON `Member`(`userId`, `serverId`, `channelId`);

-- AddForeignKey
ALTER TABLE `Member` ADD CONSTRAINT `Member_channelId_fkey` FOREIGN KEY (`channelId`) REFERENCES `Channel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
