import { useNavigate } from "react-router-dom";

export const Landing = ()=>{
    const navigate = useNavigate();

    return(
        <div className="flex justify-center">
            <div className="pt-8 max-w-screen-lg">
                <div className="grid gird-cols-2 gap-4 md:grid-cols-2">
                    <div className="flex justify-center">
                        <img src="./chessboard.jpg" className="max-w-96" alt="chessbaord" />
                    </div>
                    <div className="pt-16">
                        <div className="flex justify-center">
                            <h1 className="text-4xl font-bold text-white">Play Chess online on the #3 Site!</h1>
                        </div>
                            <div className="mt-8 flex justify-center">
                                <button onClick={
                                        ()=> {navigate("/game")
                                        }} className="py-4 px-16 text-2xl bg-green-500 hover:bg-green-700 text-white font-bold rounded">
                                    Play Online
                                </button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}