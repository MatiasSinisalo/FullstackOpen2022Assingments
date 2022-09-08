

![0 5](https://user-images.githubusercontent.com/50097749/189155568-77031782-8413-4e4d-ba4c-f6bdf18b18c4.png)

----------------------------  

title 0.5

selain->palvelin: GET https://studies.cs.helsinki.fi/exampleapp/spa

palvelin->selain: Html koodi

selain->palvelin: GET https://studies.cs.helsinki.fi/exampleapp/spa/main.css 

palvelin->selain: main.css

selain->palvelin: GET https://studies.cs.helsinki.fi/exampleapp/spa/main.js 

palvelin->selain: main.js

note left of selain:
Javascript pyytää data.json tiedoston
end notes

selain->palvelin: GET https://studies.cs.helsinki.fi/exampleapp/spa/data.json

palvelin->selain: JSON tiedosto
note left of selain:
Selaimen Javascript havaitsee JSON tiedoston saapuneen ja piirtää muistiinpanot.
end notes

selain->palvelin: GET https://studies.cs.helsinki.fi/exampleapp/favicon.ico

palvelin->selain: favicon.ico
