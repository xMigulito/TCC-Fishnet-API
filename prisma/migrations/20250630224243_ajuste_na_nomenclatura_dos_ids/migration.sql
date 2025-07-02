/*
  Warnings:

  - The primary key for the `BiometriaDiaria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID` on the `BiometriaDiaria` table. All the data in the column will be lost.
  - The primary key for the `BiometriaSemanal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID` on the `BiometriaSemanal` table. All the data in the column will be lost.
  - The primary key for the `Cooperativa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID` on the `Cooperativa` table. All the data in the column will be lost.
  - The primary key for the `Tanque` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID` on the `Tanque` table. All the data in the column will be lost.
  - The primary key for the `TanqueAlojamento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID` on the `TanqueAlojamento` table. All the data in the column will be lost.
  - The primary key for the `UsuarioSIS` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID` on the `UsuarioSIS` table. All the data in the column will be lost.
  - Added the required column `id` to the `Cooperativa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `UsuarioSIS` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BiometriaDiaria" DROP CONSTRAINT "BiometriaDiaria_pkey",
DROP COLUMN "ID",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "BiometriaDiaria_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "BiometriaSemanal" DROP CONSTRAINT "BiometriaSemanal_pkey",
DROP COLUMN "ID",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "BiometriaSemanal_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Cooperativa" DROP CONSTRAINT "Cooperativa_pkey",
DROP COLUMN "ID",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "Cooperativa_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Tanque" DROP CONSTRAINT "Tanque_pkey",
DROP COLUMN "ID",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Tanque_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TanqueAlojamento" DROP CONSTRAINT "TanqueAlojamento_pkey",
DROP COLUMN "ID",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "TanqueAlojamento_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UsuarioSIS" DROP CONSTRAINT "UsuarioSIS_pkey",
DROP COLUMN "ID",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "UsuarioSIS_pkey" PRIMARY KEY ("id");
