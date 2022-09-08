
![0 5](https://user-images.githubusercontent.com/50097749/189153476-2a7e7122-920b-49fe-a7f2-90167a3c662a.png)


----------------------------  

title 0.5

selain->palvelin: GET https://studies.cs.helsinki.fi/exampleapp/spa

palvelin->selain: Html koodi

selain->palvelin: GET https://studies.cs.helsinki.fi/exampleapp/spa/main.css 

palvelin->selain: main.css

selain->palvelin: GET https://studies.cs.helsinki.fi/exampleapp/spa/main.js 

palvelin->selain: main.js

note left of selain:
Javascript pyytää data.json tiedoston, mutta ilman POST käskyä formissa
end notes

selain->palvelin: GET https://studies.cs.helsinki.fi/exampleapp/spa/data.json

palvelin->selain: JSON tiedosto
note left of selain:
Palvelin ei käske sivustoa piirtymään uudestaan, koska formissa ei ollut POST käskyä.
Selaimen Javascript havaitsee JSON tiedoston saapuneen ja piirtää muistiinpanot.
end notes

selain->palvelin: GET https://studies.cs.helsinki.fi/exampleapp/favicon.ico

palvelin->selain: favicon.ico
