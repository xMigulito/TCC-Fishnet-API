-- CreateTable
CREATE TABLE "TanqueUser" (
    "Usuario_Sis_Id" INTEGER NOT NULL,
    "Tanque_Id" INTEGER NOT NULL,
    "Alterado_Em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TanqueUser_pkey" PRIMARY KEY ("Usuario_Sis_Id","Tanque_Id")
);

-- CreateTable
CREATE TABLE "UsuarioSIS" (
    "ID" INTEGER NOT NULL,
    "E_mail" TEXT NOT NULL,
    "Usuario" TEXT NOT NULL,
    "Senha" TEXT NOT NULL,
    "Cooperativa_Id" INTEGER NOT NULL,

    CONSTRAINT "UsuarioSIS_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Cooperativa" (
    "ID" INTEGER NOT NULL,
    "Nome" TEXT NOT NULL,

    CONSTRAINT "Cooperativa_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Tanque" (
    "ID" INTEGER NOT NULL,
    "Largura" DOUBLE PRECISION NOT NULL,
    "Area" DOUBLE PRECISION NOT NULL,
    "Local" TEXT NOT NULL,
    "Comprimento" DOUBLE PRECISION NOT NULL,
    "Capacidade" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Tanque_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "TanqueAlojamento" (
    "ID" INTEGER NOT NULL,
    "Tanque_Id" INTEGER NOT NULL,
    "Data_Alojamento" TIMESTAMP(3) NOT NULL,
    "Data_Saida" TIMESTAMP(3),
    "Custo" DOUBLE PRECISION NOT NULL,
    "Lucro" DOUBLE PRECISION NOT NULL,
    "Valor_Venda_Final" DOUBLE PRECISION NOT NULL,
    "Total_Peixes" INTEGER NOT NULL,
    "Peso_Medio_Inicial" DOUBLE PRECISION NOT NULL,
    "Biomassa_Inicial" INTEGER NOT NULL,
    "Cooperativa_Id" INTEGER,

    CONSTRAINT "TanqueAlojamento_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "BiometriaDiaria" (
    "Data" TIMESTAMP(3) NOT NULL,
    "Racao" DOUBLE PRECISION NOT NULL,
    "Tanque_Alojamento_Id" INTEGER NOT NULL,
    "Temperatura_Agua" DOUBLE PRECISION NOT NULL,
    "Ph" DOUBLE PRECISION NOT NULL,
    "Temperatura_Ambiente" TEXT NOT NULL,
    "Oxigenacao" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BiometriaDiaria_pkey" PRIMARY KEY ("Data","Tanque_Alojamento_Id")
);

-- CreateTable
CREATE TABLE "BiometriaSemanal" (
    "Tanque_Alojamento_Id" INTEGER NOT NULL,
    "Data_Alojamento" TIMESTAMP(3) NOT NULL,
    "Peixes_Mortos" INTEGER NOT NULL,
    "Peixes_Capturados" DOUBLE PRECISION NOT NULL,
    "Peso" DOUBLE PRECISION NOT NULL,
    "Biomassa_Total" INTEGER NOT NULL,
    "Data_Abertura" TIMESTAMP(3) NOT NULL,
    "Data_Fechamento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BiometriaSemanal_pkey" PRIMARY KEY ("Tanque_Alojamento_Id","Data_Alojamento")
);
