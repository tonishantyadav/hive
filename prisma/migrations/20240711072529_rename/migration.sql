/*
  Warnings:

  - You are about to drop the `visitedchannels` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `visitedchannels` DROP FOREIGN KEY `VisitedChannels_channelId_fkey`;

-- DropForeignKey
ALTER TABLE `visitedchannels` DROP FOREIGN KEY `VisitedChannels_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `visitedchannels` DROP FOREIGN KEY `VisitedChannels_serverId_fkey`;

-- DropTable
DROP TABLE `visitedchannels`;

-- CreateTable
CREATE TABLE `VisitedChannel` (
    `id` VARCHAR(191) NOT NULL,
    `visitedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `serverId` VARCHAR(191) NOT NULL,
    `channelId` VARCHAR(191) NOT NULL,
    `memberId` VARCHAR(191) NOT NULL,

    INDEX `VisitedChannel_serverId_channelId_idx`(`serverId`, `channelId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VisitedChannel` ADD CONSTRAINT `VisitedChannel_serverId_fkey` FOREIGN KEY (`serverId`) REFERENCES `Server`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VisitedChannel` ADD CONSTRAINT `VisitedChannel_channelId_fkey` FOREIGN KEY (`channelId`) REFERENCES `Channel`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VisitedChannel` ADD CONSTRAINT `VisitedChannel_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
