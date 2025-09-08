const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function addTestUsers() {
  try {
    console.log('🔐 Adicionando usuários de teste...');

    // Hash das senhas
    const hashedPassword = await bcrypt.hash('123456', 10);

    // Verificar se já existem usuários
    const existingUsers = await prisma.usuarioSIS.findMany();
    console.log(`📊 Usuários existentes: ${existingUsers.length}`);

    // Criar usuários de teste (apenas se não existirem)
    const users = [
      {
        id: 1,
        E_mail: 'admin@fishnet.com',
        Usuario: 'admin',
        Senha: hashedPassword,
        Cooperativa_Id: 1,
      },
      {
        id: 2,
        E_mail: 'usuario@fishnet.com',
        Usuario: 'usuario',
        Senha: hashedPassword,
        Cooperativa_Id: 1,
      },
      {
        id: 3,
        E_mail: 'teste@fishnet.com',
        Usuario: 'teste',
        Senha: hashedPassword,
        Cooperativa_Id: 1,
      },
    ];

    for (const userData of users) {
      try {
        // Verificar se o usuário já existe
        const existingUser = await prisma.usuarioSIS.findFirst({
          where: {
            OR: [
              { E_mail: userData.E_mail },
              { Usuario: userData.Usuario }
            ]
          }
        });

        if (existingUser) {
          console.log(`⚠️  Usuário já existe: ${userData.Usuario} (${userData.E_mail})`);
        } else {
          const user = await prisma.usuarioSIS.create({
            data: userData,
          });
          console.log('✅ Usuário criado:', user.Usuario, '-', user.E_mail);
        }
      } catch (error) {
        console.log(`❌ Erro ao criar usuário ${userData.Usuario}:`, error.message);
      }
    }

    console.log('\n🎉 Processo concluído!');
    console.log('\n📧 Emails para teste:');
    console.log('   admin@fishnet.com (senha: 123456)');
    console.log('   usuario@fishnet.com (senha: 123456)');
    console.log('   teste@fishnet.com (senha: 123456)');
    console.log('\n🔑 Todos usam a mesma senha: 123456');

  } catch (error) {
    console.error('❌ Erro geral:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addTestUsers();
ão era para ass