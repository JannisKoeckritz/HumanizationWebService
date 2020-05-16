import React from 'react';

const TableItem = (props) => {
    return(
        <table className="tableItem">
            <tc>
                <th>
                    Amino acid
                </th>
                <th>
                    Position
                </th>
                <th>
                    Frequency
                </th>
            </tc>
            <tc>
                <td>
                    {props.amino_acid}
                </td>
                <td>
                    {props.pos}
                </td>
                <td>
                    {props.frequency}
                </td>
            </tc>

        </table>
    )
}

export default TableItem;