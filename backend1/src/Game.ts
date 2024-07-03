import WebSocket from "ws";
import { Chess } from "chess.js";
import { GAME_OVER, MOVE, INIT_GAME} from "./messages";

export class Game{
    player1:WebSocket;
    player2:WebSocket;
    private board: Chess;
    private startTime: Date;
    private moveCount = 0;

    constructor(player1: WebSocket, player2: WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();

        this.player1.send(JSON.stringify({
            type : INIT_GAME,
            payload : {
                color: 'white',
            }
        }));
        this.player2.send(JSON.stringify({
            type : INIT_GAME,
            payload : {
                color: 'black',
            }
        }));
    }
    makeMove(socket:WebSocket, move:{
        from:string,
        to:string
    }){
        console.log("inside make move");
        if(this.moveCount %2  === 0 && socket !== this.player1){
            console.log("issue1");
            return;
        }
        else if(this.moveCount % 2 === 1 && socket !== this.player2){
            console.log("issue2");
            return;
        }
        try{
            console.log("move made");
            this.board.move(move);
        }
        catch(e){
            console.log(e);
            return;
        }
        if(this.board.isGameOver()){
            console.log("game over");
            this.player1.emit(JSON.stringify({
                type: GAME_OVER,
                payload:{
                    winner : this.board.turn() === "w" ? "black" : "white"
                }
            }));
            this.player2.emit(JSON.stringify({
                type: GAME_OVER,
                payload:{
                    winner : this.board.turn() === "w" ? "black" : "white"
                }
            }));
        }
        
        if(this.moveCount %2 === 0){
            console.log("player-1-moved");
            this.player2.send(JSON.stringify({
                type : MOVE,
                payload : move
            }))
        }
        else{
            console.log("player-2-moved");
            this.player1.send(JSON.stringify({
                type : MOVE,
                payload : move
            }))
        }
        this.moveCount++;
    }
}