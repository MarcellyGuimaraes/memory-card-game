import './styles.css'

export interface CardProps {
    id: string;
    flipped?: boolean;
    back: string;
    handleClick?: (id: string) => void;
}

export function Card({ flipped = false, back, handleClick, id }: CardProps) {
    const cardClassnames = ['card_content relative w-full']
    flipped && cardClassnames.push('card_content-flipped')

    const handleClickFn = (id: string) => {
        if (handleClick) {
            handleClick(id)
        }
    }

    return (
        <div className="card" onClick={() => handleClickFn(id)}>
            <div className={cardClassnames.join(' ')}>
                <div className="card_face card_face-front">?</div>
                <div className="card_face card_face-back">{back}</div>
            </div>
        </div>
    )
}