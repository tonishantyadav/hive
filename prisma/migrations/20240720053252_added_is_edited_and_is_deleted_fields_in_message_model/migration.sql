-- AlterTable
ALTER TABLE `message` ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isEdited` BOOLEAN NOT NULL DEFAULT false;
