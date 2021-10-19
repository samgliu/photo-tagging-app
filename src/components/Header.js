import Scoreboard from './Scoreboard';

function Header({
    marks,
    setIsRankOpen,
    isRankOpen,
    isSubmitOpen,
    setIsSubmitOpen,
    getRank,
}) {
    return (
        <div className="header">
            <div>Find Them</div>
            <Scoreboard
                marks={marks}
                setIsRankOpen={setIsRankOpen}
                isRankOpen={isRankOpen}
                isSubmitOpen={isSubmitOpen}
                setIsSubmitOpen={setIsSubmitOpen}
                getRank={getRank}
            />
        </div>
    );
}

export default Header;
