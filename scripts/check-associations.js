const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkAssociations() {
  try {
    console.log('🔍 Verificando associações usuário-tanque...');
    
    const associations = await prisma.tanqueUser.findMany();
    console.log('📊 Total de associações:', associations.length);
    
    associations.forEach(a => {
      console.log(`  - Usuário ${a.Usuario_Sis_Id} -> Tanque ${a.Tanque_Id}`);
    });

    // Verificar por usuário
    const users = await prisma.usuarioSIS.findMany();
    console.log('\n👥 Tanques por usuário:');
    
    for (const user of users) {
      const userAssociations = await prisma.tanqueUser.findMany({
        where: { Usuario_Sis_Id: user.id }
      });
      
      const tanqueIds = userAssociations.map(a => a.Tanque_Id);
      console.log(`  ${user.Usuario} (ID: ${user.id}): tanques [${tanqueIds.join(', ')}]`);
    }

  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAssociations();
