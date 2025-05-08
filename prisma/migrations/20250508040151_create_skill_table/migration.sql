-- CreateTable
CREATE TABLE `SkillsCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mainCategory` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `SkillsCategory_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Skill` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `skillsCategoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Skill` ADD CONSTRAINT `Skill_skillsCategoryId_fkey` FOREIGN KEY (`skillsCategoryId`) REFERENCES `SkillsCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
