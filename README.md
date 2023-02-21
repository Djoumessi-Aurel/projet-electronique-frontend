## Application web de monitoring du Système de Reconnaissance Vocale et d'Empreinte Digitale pour le Contrôle d'Accès (SRVEDCA) de l'ENSP

L'application est disponible à l'adresse: https://projet-electronique-frontend.vercel.app/



## Arborescence partielle du projet

|____ public  (The first page of the project)
 
|____ src
 
        |____ assets
                |____ css (external bootstrap or styling files)
                |____ Images (useful Images)
                |____ webfonts (external google fonts)
               
        |____ Components (Contains all reusable components)
                |____ Button (Default Component)
                        |____ Button.css (Button CSS Styles)
                        |____ Button.jsx (React Class Component)
                |____ NavBar (Navigation bar Component)
                        |____ NavBar.css (NavBar CSS Styles)
                        |____ NavBar.jsx (React Class Component)
                         
        |____ Routes (Contains all dashboard pages)
                |____ HomePage (Default Page)
                        |____ HomePage.jsx (React Class Component)
                        |____ HomePage.css (Home Page CSS Styles)
                         
        |____ App.css (Extra css styling)
         
        |____ App.js (Link all routing pages)
         
        |____ App.test.js (Where deployment tests are perform)
         
        |____ index.js (Links the App.js Component to the div with id "root")
         
        |____ index.css (First page css styles)    
|____ package-lock.json
 
|____ package.json
