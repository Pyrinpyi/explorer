import { faDiagramProject } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";
import { getBlockdagInfo } from '../pyipad-api-client';


const BlockDAGBox = () => {

    const [data, setData] = useState({});
    const [isConnected, setIsConnected] = useState(false);

    const [blockCount, setBlockCount] = useState();
    const [headerCount, setHeaderCount] = useState("");
    const [virtualDaaScore, setVirtualDaaScore] = useState("");
    const [hashrate, setHashrate] = useState("");

    const initBox = async () => {
        const dag_info = await getBlockdagInfo()

        console.log('DAG Info ', dag_info)

        setBlockCount(dag_info.blockCount)
        setHeaderCount(dag_info.headerCount)
        setVirtualDaaScore(dag_info.virtualDaaScore)
        setHashrate((dag_info.difficulty * 2 / 1000000000000).toFixed(2))
    }

    useEffect(() => {
        initBox();
        const updateInterval = setInterval(async () => {
            const dag_info = await getBlockdagInfo()
            setBlockCount(dag_info.blockCount)
            setHeaderCount(dag_info.headerCount)
            setVirtualDaaScore(dag_info.virtualDaaScore)
            setHashrate((dag_info.difficulty * 2 / 1000000000000).toFixed(2))
        }, 60000)
        return (async () => {
            clearInterval(updateInterval)
        })
    }, [])

    useEffect((e) => {
        document.getElementById('blockCount').animate([
            // keyframes
            { opacity: '1' },
            { opacity: '0.6' },
            { opacity: '1' },
        ], {
            // timing options
            duration: 300
        });
    }, [blockCount])

    useEffect((e) => {
        document.getElementById('headerCount').animate([
            // keyframes
            { opacity: '1' },
            { opacity: '0.6' },
            { opacity: '1' },
        ], {
            // timing options
            duration: 300
        });
    }, [headerCount])

    useEffect((e) => {
        document.getElementById('virtualDaaScore').animate([
            // keyframes
            { opacity: '1' },
            { opacity: '0.6' },
            { opacity: '1' },
        ], {
            // timing options
            duration: 300
        });
    }, [virtualDaaScore])

    useEffect((e) => {
        document.getElementById('hashrate').animate([
            // keyframes
            { opacity: '1' },
            { opacity: '0.6' },
            { opacity: '1' },
        ], {
            // timing options
            duration: 300
        });
    }, [hashrate])


    return <>
        <div className="cardBox mx-0">
            <table style={{ fontSize: "1rem" }}>
                <tr>
                    <td className="cardBoxElement">
                        Network name
                    </td>
                    <td id="networkName" className="pt-1 text-nowrap" style="text-transform: none">
                        Pyrin Mainnet
                    </td>
                    <script>if (location.hostname.includes("testnet")) { networkName.innerText = "Pyrin Testnet" }</script>
                </tr>
                <tr>
                    <td className="cardBoxElement">
                        Block count
                    </td>
                    <td className="pt-1" id="blockCount">
                        {blockCount}
                    </td>
                </tr>
                <tr>
                    <td className="cardBoxElement">
                        Header count
                    </td>
                    <td className="pt-1" id="headerCount">
                        {headerCount}
                    </td>
                </tr>
                <tr>
                    <td className="cardBoxElement">
                        Virtual DAA Score
                    </td>
                    <td className="pt-1 align-top" id="virtualDaaScore">
                        {virtualDaaScore}
                    </td>
                </tr>
                <tr>
                    <td className="cardBoxElement">
                        Hashrate
                    </td>
                    <td className="pt-1" id="hashrate">
                        {(hashrate / 1000).toFixed(3)} PH/s
                    </td>
                </tr>
            </table>
        </div>
    </>
}


export default BlockDAGBox;
