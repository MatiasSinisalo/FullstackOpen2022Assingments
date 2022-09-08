

![0 4](https://user-images.githubusercontent.com/50097749/189148695-14901d21-6a9d-405a-84a5-a69224f25366.png)


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
Verkkosivu on jo nyt piirtynyt kerran, mutta ilman muistiinpanoja.
Javascript koodi pyytää palvelimelta muistiinpanot
end note


selain->palvelin: GET https://studies.cs.helsinki.fi/exampleapp/data.json

palvelin->selain: JSON tiedosto

note left of selain:
Palvelin pyytää uudelleenohjauksella selainta piirtämään muistiinpanot uudelleen.
end note

note left of selain:
selain pyytää vielä faviconin eli pienen kuvan joka näkyy selaimen yläpalkissa joillakin selaimilla.
end note

selain->palvelin: GET https://studies.cs.helsinki.fi/exampleapp/favicon.ico

palvelin->selain: Html koodi



