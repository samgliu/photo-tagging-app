import React from 'react';

const RankItem = ({ name, score }) => {
    return (
        <div className="rankitem">
            Name:&nbsp;{name}&nbsp; Score:&nbsp;{score}&nbsp;(seconds)
        </div>
    );
};

export default RankItem;
