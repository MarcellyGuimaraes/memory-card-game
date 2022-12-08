import { useEffect, useRef, useState } from "react";
import { duplicateRegenerateSortArray } from "../../utils/card-utils";
import { Card, CardProps } from "../Card";
import './styles.css'

export interface GridProps {
    cards: CardProps[];
}

export function Grid({ cards }: GridProps) {
    const first = useRef<CardProps | null>(null);
    const second = useRef<CardProps | null>(null);
    const unflip = useRef(false);
    const [matches, setMatches] = useState(0);
    const [moves, setMoves] = useState(0);
    const [stCard, setStCard] = useState(() => {
        return duplicateRegenerateSortArray(cards)
    })

    //FIM DE JOGO
    useEffect(() => {
        const finished = stCard.every((c) => c.flipped === true);

        if (finished) {
            const reset = confirm(
                `You won with ${moves} moves and ${matches} matches. Click 'Ok' to start again!`,
            );

            if (reset) {
                handleReset();
            }
        }
    }, [stCard]);

    // RESET JOGO
    const handleReset = () => {
        setStCard(duplicateRegenerateSortArray(cards))
        first.current = null;
        second.current = null;
        unflip.current = false;
        setMatches(0)
        setMoves(0)
    }

    // LÓGICA DO JOGO
    const handleClick = (id: string) => {
        const newStCard = stCard.map((card) => {
            // Id do cartão diferente do que foi clicado
            if (card.id !== id) return card;

            //Cartão já foi virado
            if (card.flipped) return card;

            if (unflip.current && first.current && second.current) {
                first.current.flipped = false;
                second.current.flipped = false;
                first.current = null;
                second.current = null;
                unflip.current = false;
            }

            card.flipped = true;

            if (first.current === null) {
                first.current = card;
            } else if (second.current === null) {
                second.current = card;
            }

            if (first.current && second.current) {
                if (first.current.back === second.current.back) {
                    // A pessoa acertou
                    first.current = null;
                    second.current = null;
                    setMatches((m) => m + 1);
                } else {
                    // A pessoa errou
                    unflip.current = true;
                }

            }

            setMoves((moves) => moves + 1);

            return card;
        });

        setStCard(newStCard)
    }

    return (
        <>
            <div className="text">
                <h1>Jogo da memória <button onClick={handleReset}>Reiniciar</button></h1>
            </div>
            <p>Movimentos: {moves} || Combinações: {matches}</p>
            <div className="grid">
                {stCard.map(card => (
                    <Card {...card} key={card.id} handleClick={handleClick} />
                ))}
            </div>
        </>
    )
}
