import { Given, When, Then } from "@cucumber/cucumber"
import { expect } from "@playwright/test"
import type { ICustomWorld } from "../support/custom-world"

Given("eu estou na página de avaliações", async function (this: ICustomWorld) {
  await this.page!.goto("http://localhost:3000/avaliations")
})

When("eu seleciono {int} estrelas", async function (this: ICustomWorld, estrelas: number) {
    console.log(`Tentando selecionar ${estrelas} estrelas`);
  
    // Aguarda os botões de estrela ficarem visíveis
    await this.page!.waitForSelector("button svg", { timeout: 10000 });
  
    // Seleciona os botões corretamente
    const starButtons = await this.page!.locator("div.flex button svg").elementHandles();
  
    console.log(`Número de estrelas encontradas: ${starButtons.length}`);


  
    if (estrelas > 0 && estrelas <= starButtons.length) {
      await starButtons[estrelas - 1].click();
    } else {
      throw new Error(`Não encontrou ${estrelas} estrelas. Total disponível: ${starButtons.length}`);
    }
  });

When("eu insiro o comentário {string}", async function (this: ICustomWorld, comentario: string) {
  await this.page!.fill("input#comment", comentario)
})

When("eu clico no botão {string}", async function (this: ICustomWorld, botao: string) {
  await this.page!.click(`button:text("${botao}")`)
})

Then("a mensagem de sucesso {string} deve ser exibida", async function (this: ICustomWorld, mensagem: string) {
    // Localiza o pop-up de sucesso baseado no título "Avaliação enviada"
    const successPopup = this.page!.getByText("Avaliação enviada").locator(".."); // Sobe um nível no DOM
    await successPopup.waitFor({ state: "visible", timeout: 5000 });
  
    // Verifica se o pop-up está visível
    await expect(successPopup).toBeVisible();
  
    // Verifica se a mensagem correta está no pop-up
    const messageElement = successPopup.locator("p");
    await expect(messageElement).toContainText(mensagem);
  });

Then("a mensagem de erro {string} deve ser exibida", async function (this: ICustomWorld, mensagem: string) {
    // Localiza o pop-up de erro baseado no título "Avaliação necessária"
    const errorPopup = this.page!.getByText("Avaliação necessária").locator(".."); // Sobe um nível no DOM
    await errorPopup.waitFor({ state: "visible", timeout: 5000 });
  
    // Verifica se o pop-up está visível
    await expect(errorPopup).toBeVisible();
  
    // Verifica se a mensagem correta está no pop-up
    const messageElement = errorPopup.locator("p");
    await expect(messageElement).toContainText(mensagem);
  });

When("o servidor retorna um erro", async function (this: ICustomWorld) {
  // Simulate a server error by intercepting the network request
  await this.page!.route("**/api/avaliacoes**", (route) => {
    route.fulfill({
      status: 500,
      body: JSON.stringify({ error: "Server error" }),
    })
  })
})

Then("a página deve ser recarregada", async function (this: ICustomWorld) {
  await this.page!.reload()
  await this.page!.waitForLoadState("networkidle")
})

