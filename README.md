# 🧪 Testes de Performance com K6 usando a API Digimon

Este repositório demonstra como executar diferentes tipos de **testes de performance com [K6](https://k6.io/)** utilizando uma API pública de Digimon:  
📡 [`https://digimon-api.vercel.app/api/digimon`](https://digimon-api.vercel.app/api/digimon)

---

## 📂 Estrutura do Projeto

```text
k6_digimon_testes/
├── 1_smoke_test/           # Teste de fumaça
├── 2_load_test/            # Teste de carga básica
├── 3_performance_test/     # Teste de performance sustentada
├── 4_stress_test/          # Teste de estresse progressivo
├── 5_spike_test/           # Teste de picos (spikes)
├── 6_soak_test/            # Teste de resistência
│   └── chart_example.js    # Script com validações e dados gráficos
