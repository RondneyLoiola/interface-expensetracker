import { useNavigate } from "react-router"

export default function NotFound(){
    const navigate = useNavigate();

    return (
        <section className="h-screen bg-white">
            <div className="h-full flex flex-col items-center justify-center gap-4">
                <h1 className="text-9xl font-bold text-gray-400">404</h1>
                <div className="text-center flex flex-col gap-4">
                    <h2 className="text-4xl text-gray-800 w-100 font-bold line-clamp">Ops! Não conseguimos encontrar essa página</h2>
                    <p>A página que você procurava não foi encontrada.</p>
                </div>
                <button type="button" onClick={() => navigate('/dashboard')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">Voltar ao ínicio</button>
            </div>
        </section>
    )
}