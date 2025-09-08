const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function addMiguelUser() {
  try {
    console.log('👤 Criando usuário Miguel...');

    const hashedPassword = await bcrypt.hash('123456', 10);

    // Verificar se o usuário já existe
    const existingUser = await prisma.usuarioSIS.findFirst({
      where: {
        OR: [
          { E_mail: 'miguel@fishnet.com' },
          { Usuario: 'miguel' },
        ],
      },
    });

    if (existingUser) {
      console.log('⚠️  Usuário Miguel já existe!');
      console.log(`   Email: ${existingUser.E_mail}`);
      console.log(`   Usuário: ${existingUser.Usuario}`);
      console.log(`   ID: ${existingUser.id}`);
      return;
    }

    // Buscar o próximo ID disponível
    const lastUser = await prisma.usuarioSIS.findFirst({
      orderBy: { id: 'desc' },
    });
    
    const nextId = lastUser ? lastUser.id + 1 : 4;

    // Criar usuário Miguel
    const miguelUser = await prisma.usuarioSIS.create({
      data: {
        id: nextId,
        E_mail: 'miguel@fishnet.com',
        Usuario: 'miguel',
        Senha: hashedPassword,
        Cooperativa_Id: 1,
      },
    });

    console.log('✅ Usuário Miguel criado com sucesso!');
    console.log(`   ID: ${miguelUser.id}`);
    console.log(`   Email: ${miguelUser.E_mail}`);
    console.log(`   Usuário: ${miguelUser.Usuario}`);
    console.log(`   Cooperativa: ${miguelUser.Cooperativa_Id}`);

    // Agora vou associar alguns tanques ao Miguel
    console.log('\n🔗 Associando tanques ao usuário Miguel...');
    
    // Vou dar ao Miguel acesso aos tanques 1, 4 e 6 (um de cada grupo)
    const tanqueAssociations = [
      { Usuario_Sis_Id: nextId, Tanque_Id: 1 }, // Site A (do admin)
      { Usuario_Sis_Id: nextId, Tanque_Id: 4 }, // Site D (do usuario)
      { Usuario_Sis_Id: nextId, Tanque_Id: 6 }, // Site F (do teste)
    ];

    for (const assoc of tanqueAssociations) {
      try {
        await prisma.tanqueUser.upsert({
          where: {
            Usuario_Sis_Id_Tanque_Id: {
              Usuario_Sis_Id: assoc.Usuario_Sis_Id,
              Tanque_Id: assoc.Tanque_Id,
            },
          },
          update: {},
          create: {
            Usuario_Sis_Id: assoc.Usuario_Sis_Id,
            Tanque_Id: assoc.Tanque_Id,
            Alterado_Em: new Date(),
          },
        });
        console.log(`✅ Miguel associado ao Tanque ${assoc.Tanque_Id}`);
      } catch (error) {
        console.log(`⚠️  Erro ao associar tanque ${assoc.Tanque_Id}:`, error.message);
      }
    }

    console.log('\n🎉 Usuário Miguel criado e configurado!');
    console.log('\n📧 Credenciais:');
    console.log('   Email: miguel@fishnet.com');
    console.log('   Senha: 123456');
    console.log('   Tanques: 1 (Site A), 4 (Site D), 6 (Site F)');

  } catch (error) {
    console.error('❌ Erro ao criar usuário Miguel:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addMiguelUser();
