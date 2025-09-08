const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkData() {
  try {
    console.log('📊 Verificando dados...');
    
    const users = await prisma.usuarioSIS.findMany();
    console.log('👥 Usuários:', users.length);
    users.forEach(u => console.log('  -', u.Usuario, '(ID:', u.id + ')'));
    
    const tanques = await prisma.tanque.findMany();
    console.log('🐟 Tanques:', tanques.length);
    tanques.forEach(t => console.log('  -', t.Local || 'Tanque ' + t.id, '(ID:', t.id + ')'));
    
    const tanqueUsers = await prisma.tanqueUser.findMany();
    console.log('🔗 Associações usuário-tanque:', tanqueUsers.length);
    tanqueUsers.forEach(tu => console.log('  - Usuário', tu.Usuario_Sis_Id, '-> Tanque', tu.Tanque_Id));
    
    const alojamentos = await prisma.tanqueAlojamento.findMany();
    console.log('🏠 Alojamentos:', alojamentos.length);
    alojamentos.forEach(a => console.log('  - Tanque', a.Tanque_Id, '(ID:', a.id + ')'));
    
  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkData();
