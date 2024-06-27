import WebSocket from "ws";
import { Chess } from "chess.js";
import { GAME_OVER } from "./messages";

export class Game{
    player1:WebSocket;
    player2:WebSocket;
    private board: Chess;
    private startTime: Date;
    
    constructor(player1: WebSocket, player2: WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
    }
    makeMove(socket:WebSocket, move:{
        from:string,
        to:string
    }){
        if(this.board.move.length %2  === 0 && socket !== this.player1){
            return;
        }
        else if(this.board.move.length %2 === 1 && socket !== this.player2){
            return;
        }
        try{
            this.board.move(move);
        }
        catch(e){
            console.log(e);
            return;
        }
        if(this.board.isGameOver()){
            this.player1.emit(JSON.stringify({
                type: GAME_OVER
                
            }));
        }
    }
}