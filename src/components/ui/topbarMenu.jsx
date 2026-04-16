import Link from "next/link";
import { Button } from "./button";
import { Activity } from "lucide-react";

export default function TopbarMenu() {
    return (
        <header className="flex justify-between items-center p-6 shadow-md">

            <div className="flex items-center gap-3">
                <Activity className="text-green-600 w-6 h-6" />
                <h1 className="text-blue-900 font-bold text-lg">IMC Calculator</h1>
            </div>

            <Button variant="outline" className="bg-white text-blue-900 border-blue-900">
                <Link href="/login">Login</Link>
            </Button>
        </header>
    )
}
