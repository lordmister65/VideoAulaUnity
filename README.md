# Professor Gabriel Games — Pixel Adventure

Projeto educativo React + TypeScript + Remotion, publicado no Render como Static Site.

## Modos

- **Modo prática**: editor inspirado no Unity 6 com Hierarchy, Scene, Game, Inspector, Project e Console. Os objetos compartilham um único estado e podem ser alterados pelo Inspector e arrastados na Scene.
- **Assistir Aula 1**: 29 falas sequenciadas em 225 segundos (3m45s), com personagens vetoriais, animações e demonstrações guiadas no editor. As falas e ações ficam em `src/lessonScript.ts`.

**Limites atuais**: o áudio definitivo ainda não foi produzido; os textos são legendas da animação, não transcrição de áudio; o editor é simulado, não é o motor real da Unity; o modo Play e a física não simulam a engine. Os tempos são estimados e serão ajustados quando a narração for gerada.

## Desenvolvimento

```bash
npm install
npm run dev
npm run build
```

## Render

- Tipo: Static Site
- Branch: main
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

## Estrutura

- `src/PracticeEditor.tsx`: editor de prática
- `src/practice.css`: estilo do editor
- `src/scene.tsx`: composição Remotion
- `src/lessonScript.ts`: falas, duração e ações por cena
- `src/main.tsx`: player e alternância dos modos

## Próximas etapas

Gerar narrações portuguesas para Professor Gabriel e Cauã; medir as durações reais; sincronizar fonemas/legendas, criar MP4 final e testes de render.
