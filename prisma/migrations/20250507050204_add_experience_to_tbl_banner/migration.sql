/*
  Warnings:

  - Added the required column `experience` to the `tbl_banner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tbl_banner` ADD COLUMN `experience` VARCHAR(191) NOT NULL;
