/*
  Warnings:

  - You are about to alter the column `question` on the `questions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(60)`.
  - Added the required column `description` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "description" VARCHAR(255) NOT NULL,
ALTER COLUMN "question" SET DATA TYPE VARCHAR(60);
