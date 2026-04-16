import { Calculator, Activity, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";

export default function Cards() {
    return (
        <section className="flex flex-col md:flex-row justify-center gap-6 p-10 bg-gray-50">
            {/* Card 1 */}
            <Card className="w-full max-w-sm text-center shadow-md">
                <CardHeader className="flex flex-col items-center">
                    <div className="bg-blue-100 p-3 rounded-full mb-3">
                        <Calculator className="text-blue-600 w-6 h-6" />
                    </div>
                    <CardTitle className="text-blue-900 font-semibold">Cálculo Preciso</CardTitle>
                    <CardDescription className="text-gray-700 mt-2">
                        Resultado baseado em padrões da OMS para uma avaliação confiável da sua saúde.
                    </CardDescription>
                </CardHeader>
            </Card>

            {/* Card 2 */}
            <Card className="w-full max-w-sm text-center shadow-md">
                <CardHeader className="flex flex-col items-center">
                    <div className="bg-green-100 p-3 rounded-full mb-3">
                        <Activity className="text-green-600 w-6 h-6" />
                    </div>
                    <CardTitle className="text-green-900 font-semibold">Totalmente Gratuito</CardTitle>
                    <CardDescription className="text-gray-700 mt-2">
                        Acesse nossa calculadora sem custos, sem cadastro obrigatório e sem complicações.
                    </CardDescription>
                </CardHeader>
            </Card>

            {/* Card 3 */}
            <Card className="w-full max-w-sm text-center shadow-md">
                <CardHeader className="flex flex-col items-center">
                    <div className="bg-purple-100 p-3 rounded-full mb-3">
                        <Shield className="text-purple-600 w-6 h-6" />
                    </div>
                    <CardTitle className="text-purple-900 font-semibold">Privacidade Total</CardTitle>
                    <CardDescription className="text-gray-700 mt-2">
                        Seus dados são seguros e privados. Não armazenamos informações pessoais.
                    </CardDescription>
                </CardHeader>
            </Card>
        </section>
    );
}
