import { useEffect, useRef, useState } from "react";
import { duplicateRegenerateSortArray } from "../../utils/card-utils";
import { Card, CardProps } from "../Card";

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
                `Você ganhou com ${moves} movimentos e ${matches} combinações. Clique em 'Ok' para começar de novo!`,
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
                <h1 className="mb-10">Jogo da memória</h1>
            </div>
            <p className="font-mono text-center text-2xl text-gray-800">Movimentos: {moves} || Combinações: {matches} ||  <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={handleReset}>Reiniciar</button></p>
            <div className="grid grid-cols-4 gap-2 mt-10">
                {stCard.map(card => (
                    <Card {...card} key={card.id} handleClick={handleClick} />
                ))}
            </div>
        </>
    )
}
