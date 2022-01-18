import csl from "console";

// feito importação do console pois quero printar no terminal,
// caso contrário iria printar no console da aplicação

function printInTerminal(): void {
  csl.log("Bem vindo ao meu teste com electron! \\0/");
}

function send2Terminal(msg: string): void {
  csl.log("\nMensagem enviada do front:", msg);
}

export { printInTerminal, send2Terminal };
