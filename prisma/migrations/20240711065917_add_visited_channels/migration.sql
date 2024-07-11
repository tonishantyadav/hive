-- CreateTable
CREATE TABLE `VisitedChannels` (
    `id` VARCHAR(191) NOT NULL,
    `visitedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `serverId` VARCHAR(191) NOT NULL,
    `channelId` VARCHAR(191) NOT NULL,
    `memberId` VARCHAR(191) NOT NULL,

    INDEX `VisitedChannels_serverId_channelId_idx`(`serverId`, `channelId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VisitedChannels` ADD CONSTRAINT `VisitedChannels_serverId_fkey` FOREIGN KEY (`serverId`) REFERENCES `Server`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VisitedChannels` ADD CONSTRAINT `VisitedChannels_channelId_fkey` FOREIGN KEY (`channelId`) REFERENCES `Channel`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VisitedChannels` ADD CONSTRAINT `VisitedChannels_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
