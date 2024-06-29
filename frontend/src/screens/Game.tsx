import { Button } from "../components/Button"
import { ChessBoard } from "../components/ChessBoard"
import { useSocket } from "../hooks/useSocket";
import { useEffect, useState } from 'react';
import { Chess } from "chess.js"

export const INIT_GAME = "init_game"
export const MOVE = "move"
export const GAME_OVER = "game_over"

export const Game = () =>{
    const socket = useSocket();
    const [chess,setChess] = useState(new Chess());
    const [board,setBoard] = useState(chess.board());   
    
    useEffect(() =>{
        if(!socket) return;
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);

            if(data.type === INIT_GAME){
                setChess(new Chess());
                setBoard(chess.board());
            }
            else if(data.type === MOVE){
                const move = data.payload;
                chess.move(move);
                setBoard(chess.board());
            }
            else if(data.type === GAME_OVER){
                console.log("game_over");
            }
        }
    },[socket]);
    
    if(!socket){
        return <>Connecting...</>;
    }

    return(
        <div className="flex justify-center">
            <div className="pt-8 max-w-screen-lg w-full">
                <div className="grid grid-cols-6 gap-4 w-full">
                    <div className="col-span-4 w-full flex justify-center">
                        <ChessBoard socket={socket} board={board}/>
                    </div>
                    <div className="col-span-2  w-full">
                    <Button onClick={()=>{
                        socket.send(JSON.stringify({
                            type : INIT_GAME
                        }))}}>
                        Play
                    </Button>   
                    </div>
                </div>
            </div>
        </div>
    )
}