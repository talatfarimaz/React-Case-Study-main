import './App.css';
import dataList from './data.json';
import Grid from "./Grid";
import React, {useEffect, useState} from "react";
import store from "./state/store";
import {Provider} from "react-redux";
import {RecordType} from "./Types/RecordType";

function control(today: Date, limit: number) {
    const tableData: RecordType[] = store.getState().app.tableData;
    var wrongRecordCount: number = 0;
    if (tableData.length !== 0) {
        tableData.map((data) => {
            var receivedDate = new Date(data.mailReceivedDate);
            var sendDate = data.solutionSentDate === "" ? today : new Date(data.solutionSentDate);
            var controlState = !data.isBackgroundColorRed;
            // @ts-ignore
            const diffTime = Math.abs(sendDate - receivedDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays > limit) {
                if (controlState) {
                    wrongRecordCount++
                }
            } else {
                if (!controlState) {
                    wrongRecordCount++
                }
            }
        })
    }
    return wrongRecordCount;
}

export default function App() {
    let sourceProp = dataList;
    // @ts-ignore
    const records: RecordType[] = store.getState().app.tableData;
    const [number, setNumber] = useState<number>(0);
    const [showResult, setShowResult] = useState<boolean>(false);

    useEffect(() => {
        control(new Date(), 1)
    }, [records]);

    const onClickEvaluate = () => {
        setShowResult(true)
    }
    return (
        <Provider store={store}>
            <div id={"mainDiv"}>
                <h1>Dgpays Case Study </h1>
                <Grid source={sourceProp}/>
                <div style={{marginLeft: 20}}>
                    <input type="number" id="quantity" name="quantity" min="1" placeholder="Limit giriniz."
                           onChange={(evt) => {
                               setNumber(evt.target.valueAsNumber)
                               setShowResult(false)
                           }}/>
                </div>
                <div style={{marginLeft: 20, marginTop: 10}}>
                    <button onClick={onClickEvaluate}>Hesapla</button>
                </div>
                {showResult &&
                    <div style={{marginLeft: 20, marginTop: 20}}>Toplam{" " + control(new Date(), number) + " "} kayıt
                        hatalıdır.</div>}
            </div>
        </Provider>
    );
}
