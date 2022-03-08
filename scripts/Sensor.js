class Sensor
{
	constructor(name, type, location)
	{
		this.name = name;
		this.type = type;
		this.location = location;
		this.data = new Array();

		let sensors = document.getElementById("sensors");

        this.htmlDiv       = document.createElement("div");
        this.htmlP         = document.createElement("p");
        this.htmlUl        = document.createElement("ul");
        this.htmlType      = document.createElement("li");
        this.htmlLocation  = document.createElement("li");
        this.htmlTimestamp = document.createElement("li");
        this.htmlValue     = document.createElement("li");

        sensors.appendChild(this.htmlDiv);
        this.htmlDiv.appendChild(this.htmlP);
        this.htmlDiv.appendChild(this.htmlUl);
        this.htmlUl.appendChild(this.htmlType); 
        this.htmlUl.appendChild(this.htmlLocation);
        this.htmlUl.appendChild(this.htmlTimestamp);
        this.htmlUl.appendChild(this.htmlValue);
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

	getTodayMinValue()
	{
		let todayData = this.getTodayData();
		let todayValues = new Array();

		for(let i = 0; i < todayData.length; i++)
			todayValues.push(todayData[i][1]);

		let minValue = Math.min.apply(null, todayValues);
		let minValueIndex = -1;

		for(let i = 0; i < todayValues.length; i++)
		{
			if(todayValues[i] == minValue)
			{
				minValueIndex = i;
				break;
			}
		}

		return todayValues[minValueIndex];
	}
	getTodayMaxValue()
	{
		let todayData = this.getTodayData();
		let todayValues = new Array();

		for(let i = 0; i < todayData.length; i++)
			todayValues.push(todayData[i][1]);

		let maxValue = Math.max.apply(null, todayValues);
		let maxValueIndex = -1;

		for(let i = 0; i < todayValues.length; i++)
		{
			if(todayValues[i] == maxValue)
			{
				maxValueIndex = i;
				break;
			}
		}

		return todayValues[maxValueIndex];
	}

	display()
	{
		/*let sensors = document.getElementById("sensors");

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
        }*/

        this.htmlP.innerHTML        = this.name;
        this.htmlType.innerHTML      = this.type;
        this.htmlLocation.innerHTML = this.location;

        if(this.data[this.data.length-1] !== undefined)
        {
        	this.htmlTimestamp.innerHTML = new Date(this.data[this.data.length-1][0]).toDateString();
        	this.htmlValue.innerHTML     = this.data[this.data.length-1][1];
        }
	}
};