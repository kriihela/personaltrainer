import React, { useEffect, useRef, useState } from "react";
import FullCalender from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid'

export default function Calendar (props) {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchTrainings(), []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.log(err))
    };
    
	return (
		<div>
			<FullCalender
				defaultView="dayGridMonth"
				plugins={[dayGridPlugin, timeGridPlugin]}
                height={600}
                firstDay="1"
                headerToolbar={
                    {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }
                }
                eventTimeFormat= {
                    {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                    }
                }
				events={trainings.map((training) => {
					const calendar = {};
					const dateObject = new Date(training.date);
                    dateObject.setMinutes(dateObject.getMinutes() + training.duration);
                    calendar.start = training.date;
                    calendar.end = dateObject.toISOString();
					calendar.title = training.activity;
					return calendar;
				})}
			/>
		</div>
	);
};