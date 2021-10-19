import React from 'react';
import 'firebase/compat/firestore';
import RankItem from './RankItem';

function Rank(props) {
    const { isRankOpen, setIsRankOpen, arr } = props;

    function onCloseClick(e) {
        e.preventDefault();
        setIsRankOpen(!isRankOpen);
    }
    /*            <button onClick={(e) => saveRank('test', e)}>save</button>
            <button onClick={(e) => getRank(e)}>get</button>*/
    return (
        <div className="rank">
            <div>
                <h2>Ranking</h2>
            </div>
            {arr.map((item) => (
                <RankItem name={item.name} score={item.score} />
            ))}

            <button
                type="button"
                onClick={(e) => onCloseClick(e)}
                className="closebtn"
            >
                Close
            </button>
        </div>
    );
}

export default Rank;
