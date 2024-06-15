/*
  Warnings:

  - You are about to drop the `servermember` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `servermember` DROP FOREIGN KEY `ServerMember_serverId_fkey`;

-- DropForeignKey
ALTER TABLE `servermember` DROP FOREIGN KEY `ServerMember_userId_fkey`;

-- DropTable
DROP TABLE `servermember`;

-- CreateTable
CREATE TABLE `Member` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `serverId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Member_userId_serverId_key`(`userId`, `serverId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Member` ADD CONSTRAINT `Member_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Member` ADD CONSTRAINT `Member_serverId_fkey` FOREIGN KEY (`serverId`) REFERENCES `Server`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
