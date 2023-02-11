import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {RecordType} from "./Types/RecordType";


type GridProps = {
    source: any,
}

const Grid = ({source}: GridProps) => {
    const dispatch = useDispatch();
    useEffect(() => {
        var rows = document.getElementsByTagName("table")[0].rows;
        const allData: RecordType [] = [];

        for (let count = 0; count < rows.length; count++) {
            const newRecord: RecordType = {
                name: rows[count].cells[0].innerHTML,
                mailReceivedDate: rows[count].cells[1].innerHTML,
                solutionSentDate: rows[count].cells[2].innerHTML,
                isBackgroundColorRed: rows[count].style.backgroundColor === "red"
            };
            allData.push(newRecord)

        }

        dispatch({
            type: "SET_TABLE_DATA",
            payload: allData,
        });
    }, []);
    return (
        <div>
            <table cellSpacing={20}>
                {source.map((data: any) => {
                    return (
                        <tr style={{backgroundColor: data['isBackgroundColorRed'] ? "red" : "white"}}>
                            <td>{data['name']}</td>
                            <td>{data['mailReceivedDate']}</td>
                            <td>{data['solutionSentDate']}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    );
};

export default Grid;

