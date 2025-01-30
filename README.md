# Client - Frontend Angular

## Prerequisiti
- Node.js (consigliata versione 18+)
- Angular CLI (`npm install -g @angular/cli`)

---

## Installazione
1. Clona il repository:
   ```bash
   git clone [URL_DEL_REPO]
   cd [NOME_CARTELLA_CLIENT]
   ```

2. Installa le dipendenze:
   ```bash
   npm install
   ```

---

## Sviluppo Locale
1. Avvia il server di sviluppo:
   ```bash
   ng serve
   ```

2. Apri il browser su [http://localhost:4200](http://localhost:4200).

---

## Build per Produzione
1. Esegui il comando:
   ```bash
   ng build --configuration production
   ```

2. I file ottimizzati saranno generati nella directory `dist/`.

---

## Deploy su Server
1. Copia il contenuto della cartella `dist/[nome-progetto]` sul server.  
2. Configura Apache o Nginx per servire i file.