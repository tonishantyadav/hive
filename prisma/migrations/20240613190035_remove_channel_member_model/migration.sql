/*
  Warnings:

  - You are about to drop the `channelmember` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `channelmember` DROP FOREIGN KEY `ChannelMember_channelId_fkey`;

-- DropForeignKey
ALTER TABLE `channelmember` DROP FOREIGN KEY `ChannelMember_userId_fkey`;

-- DropTable
DROP TABLE `channelmember`;
