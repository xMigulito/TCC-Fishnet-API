-- AlterTable
CREATE SEQUENCE tanque_id_seq;
ALTER TABLE "Tanque" ALTER COLUMN "ID" SET DEFAULT nextval('tanque_id_seq');
ALTER SEQUENCE tanque_id_seq OWNED BY "Tanque"."ID";

-- AlterTable
CREATE SEQUENCE tanquealojamento_id_seq;
ALTER TABLE "TanqueAlojamento" ALTER COLUMN "ID" SET DEFAULT nextval('tanquealojamento_id_seq');
ALTER SEQUENCE tanquealojamento_id_seq OWNED BY "TanqueAlojamento"."ID";
