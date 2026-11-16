export type Cue = {title:string;focus:string;speaker:'professor'|'caua';text:string;seconds:number;action:string};
export const cues: Cue[] = [
  {
    "title": "Abertura",
    "focus": "",
    "speaker": "professor",
    "text": "Fala, turma! Eu sou o Professor Gabriel Games, e hoje vamos aprender Unity 2D do zero!",
    "seconds": 7,
    "action": "title"
  },
  {
    "title": "O desafio do Cauã",
    "focus": "",
    "speaker": "professor",
    "text": "O Cauã abriu o editor pela primeira vez e ficou perdido com tantos botões.",
    "seconds": 7,
    "action": ""
  },
  {
    "title": "O desafio do Cauã",
    "focus": "",
    "speaker": "caua",
    "text": "Professor, parece uma cabine de avião! Onde eu começo?",
    "seconds": 6,
    "action": ""
  },
  {
    "title": "O desafio do Cauã",
    "focus": "",
    "speaker": "professor",
    "text": "Calma! Vamos conhecer cada janela e depois montar o primeiro cenário.",
    "seconds": 7,
    "action": ""
  },
  {
    "title": "O que é a Unity?",
    "focus": "",
    "speaker": "professor",
    "text": "A Unity é uma ferramenta para criar jogos com personagens, cenários, sons e regras.",
    "seconds": 9,
    "action": ""
  },
  {
    "title": "O que é a Unity?",
    "focus": "",
    "speaker": "caua",
    "text": "Então é como montar um brinquedo peça por peça?",
    "seconds": 5,
    "action": ""
  },
  {
    "title": "O que é a Unity?",
    "focus": "",
    "speaker": "professor",
    "text": "Exatamente. Hoje vamos aprender a interface antes de programar.",
    "seconds": 6,
    "action": ""
  },
  {
    "title": "Objetivos da aula",
    "focus": "",
    "speaker": "professor",
    "text": "Nossa missão é entender a interface, criar objetos simples e salvar a cena Fase01.",
    "seconds": 9,
    "action": ""
  },
  {
    "title": "Conhecendo o editor",
    "focus": "Hierarchy",
    "speaker": "professor",
    "text": "Estas são as cinco janelas principais: Hierarchy, Scene, Game, Inspector e Project.",
    "seconds": 9,
    "action": "overview"
  },
  {
    "title": "Hierarchy",
    "focus": "Hierarchy",
    "speaker": "professor",
    "text": "A Hierarchy mostra todos os objetos presentes na cena.",
    "seconds": 7,
    "action": "select"
  },
  {
    "title": "Hierarchy",
    "focus": "Hierarchy",
    "speaker": "professor",
    "text": "Vou selecionar Personagem. Repare que o objeto fica destacado na lista e na Scene.",
    "seconds": 9,
    "action": "select"
  },
  {
    "title": "Hierarchy",
    "focus": "Hierarchy",
    "speaker": "caua",
    "text": "E para fazer uma cópia do personagem?",
    "seconds": 5,
    "action": "select"
  },
  {
    "title": "Hierarchy",
    "focus": "Hierarchy",
    "speaker": "professor",
    "text": "Use Ctrl mais D para duplicar o objeto selecionado.",
    "seconds": 6,
    "action": "duplicate"
  },
  {
    "title": "Scene e Game",
    "focus": "Scene",
    "speaker": "professor",
    "text": "Na Scene, nós montamos a fase: posicionamos, giramos e mudamos o tamanho dos objetos.",
    "seconds": 10,
    "action": "move"
  },
  {
    "title": "Scene e Game",
    "focus": "Game",
    "speaker": "professor",
    "text": "A janela Game mostra o resultado pela câmera do jogo.",
    "seconds": 7,
    "action": "game"
  },
  {
    "title": "Scene e Game",
    "focus": "Game",
    "speaker": "caua",
    "text": "Entendi! Na Scene eu construo, e na Game eu vejo o que o jogador verá.",
    "seconds": 9,
    "action": "game"
  },
  {
    "title": "Inspector",
    "focus": "Inspector",
    "speaker": "professor",
    "text": "Selecionando Personagem, o Inspector exibe o componente Transform.",
    "seconds": 7,
    "action": "inspector"
  },
  {
    "title": "Inspector",
    "focus": "Inspector",
    "speaker": "professor",
    "text": "Vou modificar Position X e observar o quadrado azul se mover na Scene.",
    "seconds": 10,
    "action": "move"
  },
  {
    "title": "Inspector",
    "focus": "Inspector",
    "speaker": "professor",
    "text": "Rotation gira o objeto; Scale aumenta ou diminui seu tamanho.",
    "seconds": 8,
    "action": "scale"
  },
  {
    "title": "Project",
    "focus": "Project",
    "speaker": "professor",
    "text": "O Project guarda os arquivos do projeto dentro da pasta Assets.",
    "seconds": 8,
    "action": "folders"
  },
  {
    "title": "Project",
    "focus": "Project",
    "speaker": "professor",
    "text": "Vamos organizar Scenes, Sprites e Scripts, para encontrar tudo facilmente.",
    "seconds": 8,
    "action": "folders"
  },
  {
    "title": "Project",
    "focus": "Project",
    "speaker": "caua",
    "text": "Assim eu não vou perder meus arquivos!",
    "seconds": 5,
    "action": "folders"
  },
  {
    "title": "Revisão rápida",
    "focus": "Hierarchy",
    "speaker": "professor",
    "text": "Hierarchy lista, Scene monta, Game mostra, Inspector edita e Project organiza.",
    "seconds": 10,
    "action": "overview"
  },
  {
    "title": "Montando nossa primeira cena",
    "focus": "Hierarchy",
    "speaker": "professor",
    "text": "Agora criamos um quadrado chamado Personagem.",
    "seconds": 7,
    "action": "create"
  },
  {
    "title": "Montando nossa primeira cena",
    "focus": "Scene",
    "speaker": "professor",
    "text": "Adicionamos um chão verde e um obstáculo vermelho na Scene.",
    "seconds": 8,
    "action": "ground"
  },
  {
    "title": "Montando nossa primeira cena",
    "focus": "Inspector",
    "speaker": "professor",
    "text": "Ajustamos posição e tamanho no Inspector e salvamos a cena como Fase01.",
    "seconds": 10,
    "action": "save"
  },
  {
    "title": "Desafio prático",
    "focus": "Scene",
    "speaker": "professor",
    "text": "Sua missão: crie um personagem, um chão e um obstáculo. Depois salve sua cena!",
    "seconds": 10,
    "action": "ground"
  },
  {
    "title": "Desafio prático",
    "focus": "Scene",
    "speaker": "caua",
    "text": "Consegui, professor! Meu primeiro cenário está pronto!",
    "seconds": 7,
    "action": "ground"
  },
  {
    "title": "Até a próxima aula!",
    "focus": "",
    "speaker": "professor",
    "text": "Na próxima aula veremos sprites, colisões e física 2D. Até lá, turma!",
    "seconds": 9,
    "action": "title"
  }
];
export const fps=30;
export const durationFrames=cues.reduce((sum,c)=>sum+c.seconds*fps,0);
export function cueAt(frame:number){let offset=0;for(let i=0;i<cues.length;i++){const frames=cues[i].seconds*fps;if(frame<offset+frames)return {cue:cues[i],local:frame-offset,frames,index:i};offset+=frames;}return {cue:cues[cues.length-1],local:0,frames:cues[cues.length-1].seconds*fps,index:cues.length-1};}
