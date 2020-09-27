export const Template = `
  <form>
    <main>
      <header>
        <h1>Simule sua Antecipação</h1>
      </header>
      <div class="form-control">
        <label>Informe o valor da venda *</label>
        <input type="text" name="amount" />
      </div>
      <div class="form-control">
        <label>Em quantas parcelas *</label>
        <input type="number" name="installments" />
        <div class="caption">Máximo de 12 parcelas</div>
      </div>
      <div class="form-control">
        <label>Informe o percentual de MDR *</label>
        <input type="text" name="mdr" />
      </div>
    </main>
    <aside>
      <h3>Você receberá:</h3>
      <p>Amanhã: <strong>R$ 0,00</strong></p>
      <p>Em 15 dias: <strong>R$ 0,00</strong></p>
      <p>Em 30 dias: <strong>R$ 0,00</strong></p>
      <p>Em 90 dias: <strong>R$ 0,00</strong></p>
    </aside>
  </form>
`
