/*
  Warnings:

  - The primary key for the `BiometriaDiaria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `BiometriaSemanal` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "BiometriaDiaria" DROP CONSTRAINT "BiometriaDiaria_pkey",
ADD CONSTRAINT "BiometriaDiaria_pkey" PRIMARY KEY ("Tanque_Alojamento_Id");

-- AlterTable
ALTER TABLE "BiometriaSemanal" DROP CONSTRAINT "BiometriaSemanal_pkey",
ADD CONSTRAINT "BiometriaSemanal_pkey" PRIMARY KEY ("Tanque_Alojamento_Id");
