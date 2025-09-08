const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function removeMiguelTanques() {
  try {
    console.log('🔍 Removendo associações de tanques do usuário Miguel...');

    // Buscar o usuário Miguel
    const miguel = await prisma.usuarioSIS.findFirst({
      where: { Usuario: 'miguel' }
    });

    if (!miguel) {
      console.log('❌ Usuário Miguel não encontrado!');
      return;
    }

    console.log(`👤 Usuário Miguel encontrado (ID: ${miguel.id})`);

    // Remover todas as associações de tanques do Miguel
    const deletedAssociations = await prisma.tanqueUser.deleteMany({
      where: { Usuario_Sis_Id: miguel.id }
    });

    console.log(`✅ Removidas ${deletedAssociations.count} associações de tanques do Miguel`);

    // Verificar se ainda há associações
    const remainingAssociations = await prisma.tanqueUser.findMany({
      where: { Usuario_Sis_Id: miguel.id }
    });

    if (remainingAssociations.length === 0) {
      console.log('✅ Miguel agora não tem associação com nenhum tanque');
    } else {
      console.log(`⚠️  Ainda restam ${remainingAssociations.length} associações`);
    }

    console.log('\n🎉 Usuário Miguel configurado sem tanques!');
    console.log('\n📧 Credenciais:');
    console.log('   Email: miguel@fishnet.com');
    console.log('   Senha: 123456');
    console.log('   Tanques: Nenhum');

  } catch (error) {
    console.error('❌ Erro ao remover associações:', error);
  } finally {
    await prisma.$disconnect();
  }
}

removeMiguelTanques();
