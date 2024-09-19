/*
  Warnings:

  - The values [UNKNOWN] on the enum `LoginSource` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LoginSource_new" AS ENUM ('PASSWORD', 'GOOGLE');
ALTER TABLE "Session" ALTER COLUMN "loginSource" TYPE "LoginSource_new" USING ("loginSource"::text::"LoginSource_new");
ALTER TYPE "LoginSource" RENAME TO "LoginSource_old";
ALTER TYPE "LoginSource_new" RENAME TO "LoginSource";
DROP TYPE "LoginSource_old";
COMMIT;

-- AlterEnum
ALTER TYPE "Scope" ADD VALUE 'EMAIL';
