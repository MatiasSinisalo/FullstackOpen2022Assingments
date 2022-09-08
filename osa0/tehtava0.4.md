
![0 4 (2)](https://user-images.githubusercontent.com/50097749/189154933-c53dc171-1c26-4ad6-8f31-72fa32c26d61.png)


--------------  

Muistiinpanot tekstimuodossa:


title 0.4

note left of selain:
Kayttaja painaa "Save" nappulaa
end notes
selain->palvelin: GET https://studies.cs.helsinki.fi/exampleapp/new_note
palvelin->selain: 302 selaimen uudelleen päivitys

selain->palvelin: GET https://studies.cs.helsinki.fi/exampleapp/main.css
palvelin->selain: main.css

selain->palvelin: GET https://studies.cs.helsinki.fi/exampleapp/main.js
palvelin->selain: main.js

note left of selain:
Javascript pyytää JSON tiedoston sisällön
end notes

selain->palvelin: GET https://studies.cs.helsinki.fi/exampleapp/spa/data.json
palvelin->selain: JSON tiedosto

note left of selain:
Javascript piirtää JSON tiedoston sisällön
end notes

selain->palvelin: GET https://studies.cs.helsinki.fi/exampleapp/favicon.ico

palvelin->selain: favicon.ico
