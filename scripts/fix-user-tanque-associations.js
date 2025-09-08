const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function fixAssociations() {
  try {
    console.log('🔧 Corrigindo associações usuário-tanque...');

    // 1. Verificar se o usuário admin existe
    let admin = await prisma.usuarioSIS.findFirst({ 
      where: { E_mail: 'admin@fishnet.com' } 
    });

    if (!admin) {
      console.log('👤 Criando usuário admin...');
      const hashedPassword = await bcrypt.hash('123456', 10);
      admin = await prisma.usuarioSIS.create({
        data: {
          id: 1,
          E_mail: 'admin@fishnet.com',
          Usuario: 'admin',
          Senha: hashedPassword,
          Cooperativa_Id: 1,
        },
      });
      console.log('✅ Usuário admin criado');
    } else {
      console.log('✅ Usuário admin já existe');
    }

    // 2. Buscar todos os usuários
    const users = await prisma.usuarioSIS.findMany();
    console.log('👥 Usuários encontrados:', users.length);

    // 3. Buscar todos os tanques
    const tanques = await prisma.tanque.findMany();
    console.log('🐟 Tanques encontrados:', tanques.length);

    // 4. Criar associações usuário-tanque
    const associations = [
      // Admin tem acesso aos tanques 1, 2, 3
      { Usuario_Sis_Id: 1, Tanque_Id: 1 },
      { Usuario_Sis_Id: 1, Tanque_Id: 2 },
      { Usuario_Sis_Id: 1, Tanque_Id: 3 },
      
      // Usuario tem acesso aos tanques 4, 5
      { Usuario_Sis_Id: 2, Tanque_Id: 4 },
      { Usuario_Sis_Id: 2, Tanque_Id: 5 },
      
      // Teste tem acesso aos tanques 6, 7, 8
      { Usuario_Sis_Id: 3, Tanque_Id: 6 },
      { Usuario_Sis_Id: 3, Tanque_Id: 7 },
      { Usuario_Sis_Id: 3, Tanque_Id: 8 },
    ];

    console.log('🔗 Criando associações...');
    for (const assoc of associations) {
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
        console.log(`✅ Usuário ${assoc.Usuario_Sis_Id} -> Tanque ${assoc.Tanque_Id}`);
      } catch (error) {
        console.log(`⚠️  Associação já existe: Usuário ${assoc.Usuario_Sis_Id} -> Tanque ${assoc.Tanque_Id}`);
      }
    }

    // 5. Verificar resultado
    const finalAssociations = await prisma.tanqueUser.findMany();
    console.log('\n📊 Resultado final:');
    console.log('🔗 Total de associações:', finalAssociations.length);
    
    finalAssociations.forEach(assoc => {
      console.log(`  - Usuário ${assoc.Usuario_Sis_Id} -> Tanque ${assoc.Tanque_Id}`);
    });

    console.log('\n🎉 Associações criadas com sucesso!');
    console.log('\n📧 Emails para teste:');
    console.log('   admin@fishnet.com (tanques: 1, 2, 3)');
    console.log('   usuario@fishnet.com (tanques: 4, 5)');
    console.log('   teste@fishnet.com (tanques: 6, 7, 8)');
    console.log('   Senha para todos: 123456');

  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixAssociations();
