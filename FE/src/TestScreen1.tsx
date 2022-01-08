import React, {useEffect} from 'react';
import TextBase from './components/TextBase';
import ButtonBase from "./components/ButtonBase";
import {useCreateCartMutation, useGetCartListByPartnerQuery, useGetPartnerByCodeQuery} from "./app/selectors";
import Database from "./firebase/database";
import { Chart, VerticalAxis, HorizontalAxis, Line } from 'react-native-responsive-linechart'
const TestScreen1 = () => {
    // @ts-ignore

    const data1 = [
        { x: -2, y: 1 },
        { x: -1, y: 0 },
        { x: 8, y: 13 },
        { x: 9, y: 11.5 },
        { x: 10, y: 12 }
    ]

    const data2 = [
        { x: -2, y: 15 },
        { x: -1, y: 10 },
        { x: 0, y: 12 },
        { x: 1, y: 7 },
        { x: 8, y: 12 },
        { x: 9, y: 13.5 },
        { x: 10, y: 18 }
    ]
    return (
        <Chart
            style={{ height: 200, width: '100%', backgroundColor: '#eee' }}
            padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
            xDomain={{ min: 0, max: 10 }}
            yDomain={{ min: 0, max: 20 }}
            viewport={{ size: { width: 5 } }}
        >
            <VerticalAxis tickValues={[0, 4, 8, 12, 16, 20]} />
            <HorizontalAxis tickCount={3} />
            <Line data={data1} smoothing="none" theme={{ stroke: { color: 'red', width: 1 } }} />
            <Line data={data2} smoothing="cubic-spline" theme={{ stroke: { color: 'blue', width: 1 } }} />
        </Chart>
    );
};

export default TestScreen1;
