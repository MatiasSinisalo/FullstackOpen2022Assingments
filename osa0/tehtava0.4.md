

![0 4](https://user-images.githubusercontent.com/50097749/189145655-24535b8f-8eee-45f6-a72f-9d95e92ec427.png)




--------------  

Muistiinpanot tekstimuodossa:


title 0.4

selain->palvelin: GET https://studies.cs.helsinki.fi/exampleapp/notes
palvelin->selain: Html koodi

selain->palvelin: GET https://studies.cs.helsinki.fi/exampleapp/main.css
palvelin->selain: main.css

selain->palvelin: GET https://studies.cs.helsinki.fi/exampleapp/main.js
palvelin->selain: main.js

note left of selain:
Palvelimenta saapunut JavaSript koodi pyytää xhttp:llä palvelimelta JSON tiedoston.
end note


selain->palvelin: GET https://studies.cs.helsinki.fi/exampleapp/data.json

palvelin->selain: JSON tiedosto

note left of selain:
Javascript havaitsee että JSON tiedosto on saapunut ja purkaa sen sisällön.
Purettuaan sisällön javascript näyttää tiedoston
end note

note left of selain:
selain pyytää vielä faviconin eli pienen kuvan joka näkyy selaimen yläpalkissa joillakin selaimilla.
end note

selain->palvelin: GET https://studies.cs.helsinki.fi/exampleapp/favicon.ico

palvelin->selain: Html koodi



