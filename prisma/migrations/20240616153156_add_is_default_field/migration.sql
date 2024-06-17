/*
  Warnings:

  - You are about to drop the `mychannel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `myserver` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `mychannel` DROP FOREIGN KEY `MyChannel_myServerId_fkey`;

-- DropForeignKey
ALTER TABLE `myserver` DROP FOREIGN KEY `MyServer_userId_fkey`;

-- AlterTable
ALTER TABLE `server` ADD COLUMN `isDefault` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `mychannel`;

-- DropTable
DROP TABLE `myserver`;
