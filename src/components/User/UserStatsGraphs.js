import React from 'react';
import styled from 'styled-components';
import { VictoryBar, VictoryPie, VictoryChart } from 'victory';

const SectionGraph = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;

    .graphItem {
        box-shadow: 0  10px 20px rgba(0, 0, 0, .1);
        border-radius: .2rem;
        display: grid;
        align-items: center;
    }

    .total {
        grid-column: 1/3;
        padding: 2rem;
        font-size: 2rem;
        text-align: center;
    }

    .VictoryContainer {
        height: initial !important;
    }

    @media (max-width: 40rem) {
        grid-template-columns: 1fr;

        .total {
            grid-column: 1;
        }
    }
`;

const UserStatsGraphs = ({ data }) => {
    const [graph, setGraph] = React.useState([]);
    const [total, setTotal] = React.useState(0);

    React.useEffect(() => {
        const graphData = data.map(item => {
            return {
                x: item.title,
                y: Number(item.acessos)
            };
        });
        setGraph(graphData);

        setTotal(
            data.map(({ acessos }) => Number(acessos)).reduce((a, b) => a + b, 0)
        );
    }, [data]);

    return (
        <SectionGraph className="animeLeft">
            <div className="total graphItem">
                <p>Acessos: {total}</p>
            </div>
            <div className="graphItem">
                <VictoryPie
                    data={graph}
                    innerRadius={50}
                    padding={{top: 20, bottom: 20, left: 80, right: 80}}
                    style={{
                        data: {
                            fillOpacity: .9,
                            stroke: '#fff',
                            strokeWidth: 2,
                        },
                        labels: {
                            fontSize: 14,
                            fill: "#333",
                        }
                    }}
                />
            </div>
            <div className="graphItem">
                <VictoryChart>
                    <VictoryBar alignment="start" data={graph} />
                </VictoryChart>
            </div>
        </SectionGraph>
    );
};

export default UserStatsGraphs;
