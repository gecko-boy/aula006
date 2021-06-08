//IMPORTAR AS CENAS DO JOGO
import MainScene from "./mainscene.js"

// CONSTRUIR OBJETO DA JANELA DO PHASER
const config = {
    width: 640,
    height: 640,
    type: Phaser.auto,
    parent: "game-canvas",
    scene: [MainScene]
}

// CRIAR O JOGO E ATRIBUIR A SUA CONFIGURAÇÃO
new Phaser.Game(config);