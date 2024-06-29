import { WebSocket } from "ws";
import { Game } from "./Game";
import {INIT_GAME, MOVE} from "./messages"

export class GameManager{
    private games :Game[];
    private pendingUser: WebSocket | null;
    private users:WebSocket[];

    constructor(){
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }

    addUser(socket: WebSocket){
        this.users.push(socket);
        this.addHandler(socket);
    }

    removeUser(socket:WebSocket){
        this.users = this.users.filter(user => user!= socket);
        //stop the game here
    }
    private addHandler(socket: WebSocket){
        console.log("addHandler");
        socket.on("message", (data)=>{
            console.log("message received");
            const message = JSON.parse(data.toString());

            if(message.type === INIT_GAME){
                if(this.pendingUser){
                    console.log("user-2-joined");
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else{
                    console.log("user-1-joined");
                    this.pendingUser = socket;
                }
            }
            else if(message.type === MOVE){    
                console.log("type was move");            
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if(game){
                    console.log("game exists");            
                    game.makeMove(socket, message.payload.move);
                }
            }
            
        })
    }
}