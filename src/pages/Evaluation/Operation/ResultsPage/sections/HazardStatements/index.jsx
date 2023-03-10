// From old project

import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';

const HTable = function ({ results, className }) {
    const columns = [
        'Name',
        'H-Number',
        'H-Statement',
    ];

    if (!results || !results.hNums) {
        return (<h2 className={`text-muted ${className}`}>No hazard numbers or statements.</h2>);
    }

    const { hNums } = results;

    return (
        <div className={className}>
            <h2>Hazard Statements</h2>

            <Table bordered align="center">
                <thead className="bg-danger text-white">
                    <tr>
                        {columns.map((column, i) => (
                            <th key={i}>{column}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {Object.keys(hNums).map((row, i) => (
                        <tr key={i}>
                            <td>{row}</td>

                            <td>
                                <div className="d-flex flex-column">
                                    {hNums[row].hNumbers && hNums[row].hNumbers.split(', ').map((hNum, j) => (
                                        <span key={j}>{hNum}</span>
                                    ))}
                                </div>
                            </td>

                            <td>
                                <div className="d-flex flex-column">
                                    {hNums[row].hStatements && hNums[row].hStatements.split('\n').map((hStatement, j) => (
                                        <span key={j}>{hStatement}</span>
                                    ))}
                                </div>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </Table>
        </div>
    );
};

const mapStateToProps = (state) => ({
    results: state.results,
});

export default connect(mapStateToProps)(HTable);
