/*
	La fonction getRandomArbitrary a été utilisée pour simuler des valeurs pour les capteurs, elle a été récupérée sur internet, lien ci-dessous
	Source : http://www.java2s.com/ref/javascript/javascript-math-getrandomarbitrary-min-max.html
*/
function getRandomArbitrary(min, max)
{
    return Math.random() * (max - min) + min;
}

function generateSensorData(sensors)
{
    let data = '{"HotHotHot":"Api v1.0","capteurs":[';

    for(let i = 0; i < sensors.length; i++)
    {
        let value1 = -1;
        let value2 = parseInt(getRandomArbitrary(0, 10));
        let location = -1;

        if(sensors[i].type == "Thermique")
        {
            switch(sensors[i].location)
            {
                case "Interieur":
                    value1 = parseInt(getRandomArbitrary(12, 29));
                    location = "interieur";
                break;
                case "Exterieur":
                    value1 = parseInt(getRandomArbitrary(-5, 38));
                    location = "exterieur";
                break;
                default:
                break;
            }

            data += '{"type":"Thermique","Nom":"' + location + '","Valeur":"' + value1 + '.' + value2 + '","Timestamp":' + Date.now() + '}';

            if(i != sensors.length-1)
                data += ',';
        }
    }

    data += ']}';

    return data;
}

function updateSensors(sensors, simulate)
{
    var data;

    if(simulate)
    {
        data = generateSensorData(sensors);
    }
    else
    {
        var socket = new WebSocket("wss://ws.hothothot.dog:9502");
        socket.onopen = function(event)
        {
            console.log("Connecté au serveur WSS");

            socket.send("message");
    
            socket.onmessage = function(event)
            {   
                data = event.data;
                var sensorsData = JSON.parse(data).capteurs;

                for(let i = 0; i < sensorsData.length; i++)
                {
                    sensors[i].addData(sensorsData[i].Timestamp, sensorsData[i].Valeur);
                    sensors[i].display();
                }

                console.log(sensors[0].getTodayMinValue() + ' ' + sensors[0].getTodayMaxValue());
            }
        }
        socket.onerror = function(event)
        {
            console.log("Echec de la connexion au serveur WSS, utilisation de fetch");

            fetch('https://hothothot.dog/api/capteurs').then(function (response)
            {
                return response.json();
            }).then(function (data)
            {
                displaySensors(JSON.parse(data).capteurs);
            }).catch(function (err)
            {
                console.warn('Echec de fetch', err);
            });
        }
    }

    var sensorsData = JSON.parse(data).capteurs;

    for(let i = 0; i < sensorsData.length; i++)
    {
        sensors[i].addData(sensorsData[i].Timestamp, sensorsData[i].Valeur);
        sensors[i].display();
    }
    return sensorsData;

}





