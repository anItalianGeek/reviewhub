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
Ecco una configurazione pronta per il file di spiegazione, completa di codice e spiegazione dettagliata:  

### **Configurazione Sicura per Apache con Angular**  

Per configurare il web server **Apache** e servire correttamente il frontend Angular in produzione, utilizza la seguente configurazione:  

```xml
<VirtualHost *:80>
    ServerAdmin admin@tuo-dominio.com
    DocumentRoot /var/www/html

    <Directory /var/www/html>
        # Blocca l'indicizzazione delle directory e consenti solo symlink sicuri
        Options -Indexes +FollowSymLinks
        # Disabilita file .htaccess per maggiore sicurezza
        AllowOverride None
        # Consenti accesso a tutti i client
        Require all granted

        # Headers di sicurezza
        <IfModule mod_headers.c>
            Header always set X-Content-Type-Options "nosniff"
            Header always set X-Frame-Options "DENY"
            Header always set X-XSS-Protection "1; mode=block"
        </IfModule>
    </Directory>

    # Configurazione del rewrite per gestire il routing di Angular
    <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </IfModule>

    # Logging per debug e analisi
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

---

### **Spiegazione:**  

**Blocco dei rischi di sicurezza:**  
   - `Options -Indexes`: evita che gli utenti vedano l'elenco dei file nelle directory.  
   - `AllowOverride None`: disabilita `.htaccess`, migliorando la sicurezza centralizzando le configurazioni.  
   - Headers HTTP per protezione:
     - `X-Content-Type-Options "nosniff"`: previene l'interpretazione errata dei tipi MIME.  
     - `X-Frame-Options "DENY"`: impedisce l'uso del sito in frame (clickjacking).  
     - `X-XSS-Protection "1; mode=block"`: abilita protezioni anti-XSS.  

**Rewrite per routing Angular:**  
   Il blocco di rewrite consente ad Angular di gestire correttamente tutte le rotte reindirizzando le richieste non corrispondenti a file fisici a `index.html`.  

**Log per il monitoraggio:**  
   - `ErrorLog`: registra gli errori del server.  
   - `CustomLog`: registra le richieste HTTP.  


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
   Ecco la configurazione pronta per **Nginx** completa di spiegazione, perfetta per il tuo file di documentazione:  


### **Configurazione Sicura per Nginx con Angular**  

Per configurare il web server **Nginx** e servire correttamente il frontend Angular in produzione, utilizza la seguente configurazione:  

```nginx
server {
    listen 80;
    server_name tuo-dominio.com;

    root /var/www/html;
    index index.html;

    # Configura il routing per Angular
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Blocca accesso a file sensibili
    location ~ /\.(?!well-known) {
        deny all;
    }

    # Headers di sicurezza
    add_header X-Content-Type-Options "nosniff";
    add_header X-Frame-Options "DENY";
    add_header X-XSS-Protection "1; mode=block";

    # Compressione per migliorare le prestazioni
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml+rss text/javascript;

    # Log per debug
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;
}
```


### **Spiegazione:**  

**Blocco dei rischi di sicurezza:**  
   - Blocca l'accesso ai file nascosti come `.git`, `.env`, ecc., eccetto `.well-known` per certificati (`location ~ /\.(?!well-known) { deny all; }`).  
   - Header di sicurezza:  
     - `X-Content-Type-Options "nosniff"`: previene interpretazioni errate dei tipi MIME.  
     - `X-Frame-Options "DENY"`: protegge contro attacchi di clickjacking.  
     - `X-XSS-Protection "1; mode=block"`: attiva protezioni anti-XSS.  

**Routing per Angular:**  
   - Il blocco `location /` con `try_files $uri $uri/ /index.html;` consente ad Angular di gestire correttamente tutte le rotte, anche quelle inesistenti sul file system.

**Compressione:**  
   - `gzip on;` attiva la compressione per migliorare le prestazioni del caricamento.

**Log per monitoraggio:**  
   - `access_log` e `error_log` mantengono traccia delle richieste e degli errori.


4. Riavvia Nginx:
   ```bash
   sudo systemctl restart nginx
   ```