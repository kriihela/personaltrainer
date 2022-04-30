import React, { useEffect, useRef, useState } from "react";
import FullCalender from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid'
//import dayjs from "dayjs";

export default function Calendar (props) {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchTrainings(), []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.log(err))
    };

    //TODO training time = date HH:mm + duration

	return (
		<div>
			<FullCalender
				defaultView="dayGridMonth"
				plugins={[dayGridPlugin, timeGridPlugin]}
                firstDay="1"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                  }}
				height={600}
				events={trainings.map((training) => {
					const calendar = {};
					calendar.date = training.date;
					calendar.title = training.activity;
					return calendar;
				})}
			/>
		</div>
	);
};