/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `MyServer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `MyServer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `myserver` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `MyServer_userId_key` ON `MyServer`(`userId`);

-- AddForeignKey
ALTER TABLE `MyServer` ADD CONSTRAINT `MyServer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
