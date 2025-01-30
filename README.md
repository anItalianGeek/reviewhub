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
0. Copia il contenuto della cartella `dist/[nome-progetto]` sul server.
Ecco le istruzioni per configurare i file del web server per Angular:


### **Apache**  
1. Copia i file dalla cartella `dist/[nome-progetto]` in `/var/www/html/`.

2. Abilita il modulo `rewrite` se non lo hai già fatto:  
   ```bash
   sudo a2enmod rewrite
   ```

3. Modifica il file di configurazione predefinito:  
   ```bash
   sudo nano /etc/apache2/sites-available/000-default.conf
   ```
   Aggiungi o modifica le seguenti righe nella sezione `<VirtualHost>`:
   ```xml
   <Directory /var/www/html>
     AllowOverride All
     Require all granted
   </Directory>

   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

4. Riavvia Apache:
   ```bash
   sudo systemctl restart apache2
   ```

---

### **Nginx**  
1. Copia i file dalla cartella `dist/[nome-progetto]` in `/var/www/html/`.

2. Modifica il file di configurazione:  
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```

3. Inserisci questa configurazione:
   ```nginx
   server {
     listen 80;
     server_name tuo-dominio.com;

     root /var/www/html;
     index index.html;

     location / {
       try_files $uri $uri/ /index.html;
     }
   }
   ```

4. Riavvia Nginx:
   ```bash
   sudo systemctl restart nginx
   ```