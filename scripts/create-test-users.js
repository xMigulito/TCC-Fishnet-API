const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createTestUsers() {
  try {
    console.log('🔐 Criando usuários de teste...');

    // Criar cooperativa de teste
    const cooperativa = await prisma.cooperativa.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        Nome: 'Cooperativa FishNet Teste',
        Ativo: true,
      },
    });

    console.log('✅ Cooperativa criada:', cooperativa.Nome);

    // Hash das senhas
    const hashedPassword = await bcrypt.hash('123456', 10);

    // Criar usuários de teste
    const users = [
      {
        id: 1,
        E_mail: 'admin@fishnet.com',
        Usuario: 'admin',
        Senha: hashedPassword,
        Cooperativa_Id: 1,
        Ativo: true,
      },
      {
        id: 2,
        E_mail: 'usuario@fishnet.com',
        Usuario: 'usuario',
        Senha: hashedPassword,
        Cooperativa_Id: 1,
        Ativo: true,
      },
      {
        id: 3,
        E_mail: 'teste@fishnet.com',
        Usuario: 'teste',
        Senha: hashedPassword,
        Cooperativa_Id: 1,
        Ativo: true,
      },
    ];

    for (const userData of users) {
      const user = await prisma.usuarioSIS.upsert({
        where: { id: userData.id },
        update: {},
        create: userData,
      });
      console.log('✅ Usuário criado:', user.Usuario, '-', user.E_mail);
    }

    // Criar alguns tanques de teste
    const tanques = [
      {
        id: 1,
        Local: 'Tanque A1',
        Largura: 10.0,
        Comprimento: 20.0,
        Area: 200.0,
        Capacidade: 1000.0,
        Ativo: true,
      },
      {
        id: 2,
        Local: 'Tanque B1',
        Largura: 15.0,
        Comprimento: 25.0,
        Area: 375.0,
        Capacidade: 1500.0,
        Ativo: true,
      },
    ];

    for (const tanqueData of tanques) {
      const tanque = await prisma.tanque.upsert({
        where: { id: tanqueData.id },
        update: {},
        create: tanqueData,
      });
      console.log('✅ Tanque criado:', tanque.Local);
    }

    // Associar usuários aos tanques
    const tanqueUsers = [
      { Usuario_Sis_Id: 1, Tanque_Id: 1 },
      { Usuario_Sis_Id: 1, Tanque_Id: 2 },
      { Usuario_Sis_Id: 2, Tanque_Id: 1 },
      { Usuario_Sis_Id: 3, Tanque_Id: 2 },
    ];

    for (const tanqueUser of tanqueUsers) {
      await prisma.tanqueUser.upsert({
        where: {
          Usuario_Sis_Id_Tanque_Id: {
            Usuario_Sis_Id: tanqueUser.Usuario_Sis_Id,
            Tanque_Id: tanqueUser.Tanque_Id,
          },
        },
        update: {},
        create: tanqueUser,
      });
    }

    console.log('✅ Associações usuário-tanque criadas');

    console.log('\n🎉 Usuários de teste criados com sucesso!');
    console.log('\n📧 Emails para teste:');
    console.log('   admin@fishnet.com (senha: 123456)');
    console.log('   usuario@fishnet.com (senha: 123456)');
    console.log('   teste@fishnet.com (senha: 123456)');
    console.log('\n🔑 Todos usam a mesma senha: 123456');

  } catch (error) {
    console.error('❌ Erro ao criar usuários de teste:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUsers();
