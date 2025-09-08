const axios = require('axios');

const API_BASE = 'http://localhost:3001';

async function testUserIsolation() {
  try {
    console.log('🔍 Testando isolamento de dados por usuário...\n');

    // 1. Login com diferentes usuários
    console.log('1️⃣ Fazendo login com diferentes usuários...');
    
    const adminLogin = await axios.post(`${API_BASE}/auth/login`, {
      email: 'admin@fishnet.com',
      password: '123456'
    });
    const adminToken = adminLogin.data.access_token;
    console.log('✅ Admin logado - Token obtido');

    const usuarioLogin = await axios.post(`${API_BASE}/auth/login`, {
      email: 'usuario@fishnet.com',
      password: '123456'
    });
    const usuarioToken = usuarioLogin.data.access_token;
    console.log('✅ Usuario logado - Token obtido');

    const testeLogin = await axios.post(`${API_BASE}/auth/login`, {
      email: 'teste@fishnet.com',
      password: '123456'
    });
    const testeToken = testeLogin.data.access_token;
    console.log('✅ Teste logado - Token obtido\n');

    // 2. Testar dashboard com cada usuário
    console.log('2️⃣ Testando dashboard com cada usuário...');
    
    const adminDashboard = await axios.get(`${API_BASE}/dashboard`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log('📊 Admin vê tanques:', adminDashboard.data.map(t => `${t.id}(${t.nome})`).join(', '));

    const usuarioDashboard = await axios.get(`${API_BASE}/dashboard`, {
      headers: { Authorization: `Bearer ${usuarioToken}` }
    });
    console.log('📊 Usuario vê tanques:', usuarioDashboard.data.map(t => `${t.id}(${t.nome})`).join(', '));

    const testeDashboard = await axios.get(`${API_BASE}/dashboard`, {
      headers: { Authorization: `Bearer ${testeToken}` }
    });
    console.log('📊 Teste vê tanques:', testeDashboard.data.map(t => `${t.id}(${t.nome})`).join(', '));

    // 3. Testar endpoints sem autenticação (devem falhar)
    console.log('\n3️⃣ Testando endpoints sem autenticação...');
    
    try {
      await axios.get(`${API_BASE}/dashboard`);
      console.log('❌ Dashboard sem auth deveria falhar!');
    } catch (error) {
      console.log('✅ Dashboard sem auth falha corretamente:', error.response?.status);
    }

    try {
      await axios.get(`${API_BASE}/tanque`);
      console.log('❌ Tanques sem auth deveria falhar!');
    } catch (error) {
      console.log('✅ Tanques sem auth falha corretamente:', error.response?.status);
    }

    // 4. Testar tanques com autenticação
    console.log('\n4️⃣ Testando endpoint de tanques com autenticação...');
    
    const adminTanques = await axios.get(`${API_BASE}/tanque`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log('🐟 Admin vê tanques (endpoint):', adminTanques.data.length, 'tanques');

    const usuarioTanques = await axios.get(`${API_BASE}/tanque`, {
      headers: { Authorization: `Bearer ${usuarioToken}` }
    });
    console.log('🐟 Usuario vê tanques (endpoint):', usuarioTanques.data.length, 'tanques');

    // 5. Verificar se os dados estão isolados
    console.log('\n5️⃣ Verificando isolamento de dados...');
    
    const adminTanqueIds = adminDashboard.data.map(t => t.id).sort();
    const usuarioTanqueIds = usuarioDashboard.data.map(t => t.id).sort();
    const testeTanqueIds = testeDashboard.data.map(t => t.id).sort();

    console.log('Admin tanques:', adminTanqueIds);
    console.log('Usuario tanques:', usuarioTanqueIds);
    console.log('Teste tanques:', testeTanqueIds);

    // Verificar se não há sobreposição
    const hasOverlap = adminTanqueIds.some(id => usuarioTanqueIds.includes(id)) ||
                      adminTanqueIds.some(id => testeTanqueIds.includes(id)) ||
                      usuarioTanqueIds.some(id => testeTanqueIds.includes(id));

    if (hasOverlap) {
      console.log('❌ PROBLEMA: Há sobreposição de tanques entre usuários!');
    } else {
      console.log('✅ Isolamento funcionando: cada usuário vê tanques únicos');
    }

    console.log('\n🎉 Teste de isolamento concluído!');

  } catch (error) {
    console.error('❌ Erro no teste:', error.response?.data || error.message);
  }
}

testUserIsolation();
