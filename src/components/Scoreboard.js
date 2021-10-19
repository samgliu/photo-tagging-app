import icon1 from '../images/pikachu.png';
import icon2 from '../images/Keroro.png';
import icon3 from '../images/umbrella.png';
function Scoreboard(props) {
    const {
        marks,
        setIsRankOpen,
        isRankOpen,
        isSubmitOpen,
        setIsSubmitOpen,
        getRank,
    } = props;

    function onClicked(e) {
        e.preventDefault();
        if (!isRankOpen) {
            getRank();
        }
        setIsRankOpen(!isRankOpen);
    }
    function onSubmitClicked(e) {
        e.preventDefault();
        setIsSubmitOpen(!isSubmitOpen);
    }

    return (
        <div className="scoreboard">
            <div className="scoreimgcontainer">
                <div
                    className={
                        marks[0] === 0 ? 'scoreimg' : 'scoreimg scoreimgred'
                    }
                >
                    <img src={icon1} alt="" />
                </div>
                <div
                    className={
                        marks[1] === 0 ? 'scoreimg' : 'scoreimg scoreimgred'
                    }
                >
                    <img src={icon2} alt="" />
                </div>
                <div
                    className={
                        marks[2] === 0 ? 'scoreimg' : 'scoreimg scoreimgred'
                    }
                >
                    <img src={icon3} alt="" />
                </div>
            </div>
            <div>
                <button onClick={(e) => onSubmitClicked(e)}>
                    Submit Score
                </button>{' '}
            </div>
            <div>
                <button onClick={(e) => onClicked(e)}>Score Ranking</button>{' '}
            </div>
        </div>
    );
}

export default Scoreboard;
