# Book Explorer

Book Explorer è un'applicazione web che consente agli utenti di cercare libri utilizzando l'API di Google Books. Gli utenti possono inserire il titolo di un libro per scoprire il loro prossimo libro preferito, visualizzare i dettagli del libro e ottenere maggiori informazioni sul libro da Google Books.

## Funzionalità

- Cerca libri per titolo.
- Visualizza i dettagli del libro, inclusi titolo, autori, descrizione e immagine di anteprima.
- Link per maggiori informazioni su Google Books.

## Installazione

Per iniziare con Book Explorer, segui questi passaggi:

1. Clona il repository:

   ```bash
   git clone https://github.com/<tuo-username>/book-explorer.git
   cd book-explorer
   ```

2. Installa le dipendenze necessarie tramite Bun:

   ```bash
   bun install
   ```

## Uso

Per avviare l'applicazione, esegui il seguente comando:

```bash
bun run start
```

Questo avvierà l'applicazione su `http://localhost:3000`.

## Struttura dei File

```markdown
book-explorer/
├── public/
│ └── index.html # Il file HTML principale dell'applicazione
├── src/
│ ├── index.ts # Il file TypeScript principale per il server backend
├── package.json
└── README.md
```

## Descrizione dei File Importanti

### index.html

Contiene il frontend dell'applicazione, dove l'utente può cercare libri e visualizzare i risultati.

### index.ts

Il file TypeScript principale del server che gestisce le richieste al backend, utilizza il framework Elysia e Bun per gestire i server.

## Come Contribuire

Se desideri contribuire al progetto, segui questi passaggi:

1. Fai un fork del progetto.
2. Crea un nuovo branch per la tua feature o bug fix:

   ```bash
   git checkout -b nome-feature
   ```

3. Apporta le tue modifiche e fai un commit:

   ```bash
   git commit -m "Descrizione delle modifiche"
   ```

4. Fai un push del tuo branch al repository forkato:

   ```bash
   git push origin nome-feature
   ```

5. Crea una Pull Request descrivendo in dettaglio le modifiche apportate.

## Licenza

Questo progetto è distribuito sotto la licenza MIT. Consulta il file [LICENSE](LICENSE) per maggiori dettagli.
