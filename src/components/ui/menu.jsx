import { Calculator } from "lucide-react"
import { Button } from "./button"
import Image from "next/image"
import Link from "next/link"

export default function Menu() {
    return (
        <section className="p-10 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
              
                <div>
    
                    <div className="flex items-center gap-2 bg-green-100 p-3 rounded-md">
                        <Calculator className="text-green-600 w-5 h-5" />
                        <h3 className="text-blue-900 font-semibold">
                            Calcule seu IMC gratuitamente
                        </h3>
                    </div>

                    
                    <h1 className="mt-6 text-3xl font-bold text-blue-900">
                        Descubra seu Índice de Massa Corporal
                    </h1>

                    
                    <h2 className="mt-2 text-lg text-gray-700 max-w-2xl">
                        Avalie sua saúde de forma rápida e prática. Calcule seu IMC e descubra se você está no peso ideal.
                    </h2>

                    
                    <div className="mt-6 flex gap-4">
                        <Button className="bg-green-600 text-white hover:bg-green-700">
                            <Link href="/cadastro">Entrar</Link>
                        </Button>
                        <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                            Saiba Mais
                        </Button>
                    </div>

                    
                    <div className="mt-10 flex justify-around text-center">
                        <div>
                            <h2 className="text-2xl font-bold text-green-600">100%</h2>
                            <p className="text-blue-900">Gratuito</p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-green-600">5 seg</h2>
                            <p className="text-blue-900">Resultado</p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-green-600">24/7</h2>
                            <p className="text-blue-900">Disponível</p>
                        </div>
                    </div>
                </div>

                
                <div className="flex justify-center">
                    <Image
                        src="/a-importancia-do-personal-trainer-no-treino-de-musculacao-scaled.jpg" 
                        alt="Ilustração IMC"
                        width={500}
                        height={400}
                        className="rounded-lg shadow-md object-cover"
                    />
                </div>
            </div>
        </section>
    )
}
