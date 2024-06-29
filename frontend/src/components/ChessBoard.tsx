import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";

export const ChessBoard = ({board ,socket}:{
    board : ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket : WebSocket;
})=>{
    const [from,setFrom] = useState<Square | null>(null);
    const [to,setTo] = useState<Square | null>(null);

    return <div className="text-white-200">
            {board.map((row,i)=>{
                return <div key={i} className="flex">
                    {row.map((square,j)=>{
                    const squareRepresentation = String.fromCharCode(65 + (j%8)) +""+ (8-i) as Square;
                       return <div onClick={()=>{
                            if(!from){
                                setFrom(squareRepresentation);
                            }else{
                                socket.send(JSON.stringify({
                                    type : "move",
                                    payload : {
                                        from,
                                        to : squareRepresentation
                                    }
                                }))
                                setFrom(null);

                            }
                        }} key={j} className={`w-16 h-16 ${(i+j)%2 === 0 ? 'bg-zinc-600' : 'bg-white'}`}>
                            <div className="w-full justify-center flex h-full">
                                <div className="h-full justify-center flex flex-col">
                                    {square ? square.type : ""}
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            })}
        </div>
}