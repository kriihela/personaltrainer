import lodash, { sumBy } from "lodash";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function Charts() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchTrainings(), []);

    function fetchTrainings() {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(lodash(data)
                .groupBy(trainings => trainings.activity)
                .map((value, key) => (
                    {
                        activity: key,
                        total: sumBy(value, 'duration')
                    }
                ))
                .value())
                .catch(err => console.log(err))
            )
    }

    return (
        <BarChart
            width={1000}
            height={500}
            data={trainings}
            margin={{ top: 50, left: 30 }}>
            <XAxis dataKey="activity" />
            <YAxis label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft' }} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Bar dataKey="total" fill="#63afaf" />
        </BarChart>
    );

}
