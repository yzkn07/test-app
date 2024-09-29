"use client"
import { useEffect, useState } from "react"
import { randevuyuGoruntule, SaveRandevu } from "./action"
import { formatRandevuData } from "@/utils/functions/functions";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function Randevu({ params }) {
    const router = useRouter()

    const { randevuId } = params || ""
    const [randevu, setRandevu] = useState([])
    const [userId, setUserId] = useState(null)


    useEffect(() => {
        async function fetchRandevu(){
          const randevuData = await randevuyuGoruntule(randevuId); 
          setRandevu(randevuData.randevu_slotlari)


    }
    fetchRandevu();
}, [randevuId]);  

useEffect(() => {

    async function fetchUserId() {
        const supabase = createClient();
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (!userError && userData) {
            setUserId(userData.user.id);
        }
    }
    fetchUserId();
}, []);

const formattedRandevu =  formatRandevuData(randevu)

const handleAra = () => {
    router.push("/")
}
  
const handleRandevuAl =  () => {
    if (userId) {
        SaveRandevu(randevuId, userId);
    } else {
        console.error("User ID not found.");
    }
}

    return(
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
    <h1 className="text-2xl font-bold text-gray-800 border-b pb-4">Seçilen Randevu</h1>

    <ul className="space-y-4">
        {formattedRandevu.map((e) => (
            <li key={e.id} className="bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition duration-300">
                <p className="text-lg font-semibold text-blue-600">Şube: {e.sube}</p>
                <p className="text-md font-medium text-green-600">Bölüm: {e.bolum}</p>
                <p className="text-md font-medium text-indigo-600">Doktor: {e.doktor}</p>
                <p className="text-sm text-gray-700">Randevu Zamanı: {e.randevu_zamani}</p>

                <div className="flex justify-between items-center mt-2">
                    <button onClick={() => handleAra()} className="bg-slate-400 text-white p-2 rounded-lg hover:bg-slate-500 active:bg-slate-700 active:text-white">randevu ara</button>
                    <button 
                        onClick={()=> handleRandevuAl()}
                        className="bg-blue-400 p-2 text-white rounded-lg active:bg-black hover:bg-blue-600 active:text-white">
                        randevu al
                    </button>
                </div>
            </li>
        ))}
        
    </ul>
</div>

    )
}
