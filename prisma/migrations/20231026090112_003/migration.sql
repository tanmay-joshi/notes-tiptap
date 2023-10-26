-- DropForeignKey
ALTER TABLE `note` DROP FOREIGN KEY `note_spaceId_fkey`;

-- AlterTable
ALTER TABLE `note` MODIFY `spaceId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `note` ADD CONSTRAINT `note_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `space`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
