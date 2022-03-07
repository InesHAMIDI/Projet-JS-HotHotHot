class Sensor
{
	constructor(name, type, location)
	{
		this.name = name;
		this.type = type;
		this.location = location;
		this.data = new Array();
	}

	getData()
	{
		return this.data;
	}
	addData(timestamp, value)
	{
		this.data.push([timestamp, value]);
	}

	getTodayData()
	{
		let todayData = new Array();
		let currentTimestamp = new Date(Date.now());

		for(let i = 0; i < this.data.length; i++)
		{
			let dataTimestamp = new Date(this.data[i][0]);

			if(dataTimestamp.getFullYear() == currentTimestamp.getFullYear() && dataTimestamp.getDate() == currentTimestamp.getDate() && dataTimestamp.getDay() == currentTimestamp.getDay())
				todayData.push(this.data[i]);
		}

		return todayData;
	}

	getMinValue(today)
	{
		let todayData = this.getTodayData();
		let todayValues = new Array();

		for(let i = 0; i < todayData.length; i++)
			todayValues.push(todayData[i][1]);

		let minValueIndex = todayValues.indexOf(Math.min.apply(null, todayValues));

		return todayData[minValueIndex];
	}
	getMaxValue(today)
	{
		return Math.max(this.data[1]);
	}

	display()
	{
		let sensors = document.getElementById("sensors");

        let div          = document.createElement("div");
        let p            = document.createElement("p");
        let ul           = document.createElement("ul");
        let type         = document.createElement("li");
        let location     = document.createElement("li");
        let timestamp    = document.createElement("li");
        let value        = document.createElement("li");

        sensors.appendChild(div);
        div.appendChild(p);
        div.appendChild(ul);
        ul.appendChild(type); 
        ul.appendChild(location);
        ul.appendChild(timestamp);
        ul.appendChild(value);

        p.innerHTML         = this.name;
        type.innerHTML      = this.type;
        location.innerHTML  = this.location;

        if(this.data[this.data.length-1] !== undefined)
        {
        	timestamp.innerHTML = new Date(this.data[this.data.length-1][0]).toDateString();
        	value.innerHTML     = this.data[this.data.length-1][1];
        }
	}
};