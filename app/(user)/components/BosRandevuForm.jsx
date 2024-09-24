"use client";
// import { useRouter, useSearchParams,  } from "next/navigation";
import { useSearchParams,  } from "next/navigation";
import { useEffect } from "react";


export default function BosRandevuForm({
  subeler,
  selectedSubeId,setSelectedSubeId,
  bolumler,
  selectedBolumId,setSelectedBolumId,
  step,
  doktorlar,
  selectedDoktorId,setSelectedDoktorId,
  buttonIsActive ,setButtonIsActive
}) {
    const  searchParams = useSearchParams()
    // const router = useRouter()
    
  //url'de sube-id varsa ona göre sube id'yi set ediyor.
  useEffect(() => {
    const subeIdFromUrl = searchParams.get("sube-id");
    const bolumIdFromUrl = searchParams.get("bolum-id");
    const doktorIdFromUrl = searchParams.get("doktor-id");
    if (subeIdFromUrl) {
      setSelectedSubeId(parseInt(subeIdFromUrl));  
    }
    if (bolumIdFromUrl) {
      setSelectedBolumId(parseInt(bolumIdFromUrl));  
    }
    if (doktorIdFromUrl) {
      setSelectedDoktorId(parseInt(doktorIdFromUrl));  
    }
    
  }, [searchParams, setSelectedSubeId, setSelectedBolumId, setSelectedDoktorId]);

  const handleSube = (id) => {
    setSelectedSubeId(id);
    // router.push(`?sube-id=${id}`);
    setButtonIsActive(true)

  };

  if (!subeler || subeler.length === 0) {
    return <p>Şubeler yükleniyor...</p>;
  }

  const handleBolum = (bolumId) => {
    setSelectedBolumId(bolumId); 
    // router.push(`?sube-id=${selectedSubeId}&bolum-id=${bolumId}`)
    

  }

  const handleDoktor = (doktorId) => {
    setSelectedDoktorId(doktorId); 
    // router.push(`?sube-id=${selectedSubeId}&bolum-id=${selectedBolumId}&doktor-id=${doktorId}`)

  }

  return (

    <div className="bg-emerald-200 p-2 rounded-lg max-h-64 overflow-y-scroll">
        {step === 0 && (
            <ul>
            {subeler.map((e) => (
                <li
                key={e.id}  
                onClick={() => handleSube(e.id)}
                className={`m-2 p-4 rounded-lg hover:cursor-pointer active:bg-slate-700 active:text-white ${
                    selectedSubeId === e.id ? "bg-blue-500 text-white" : "bg-slate-100"
                }`}
                value={e.id}>
                    {e.sube_adi}
                </li>
            ))}
        </ul>
        ) }

        {step === 1 && (
            <ul>
            {bolumler.map((bolum) => (
                        <li
                        key={bolum.id}  
                        onClick={() => handleBolum(bolum.id)}  
                        className={`p-2 m-2 rounded-lg ${
                            selectedBolumId === bolum.id ? "bg-blue-500 text-white" : "bg-gray-200"
                        } hover:cursor-pointer`}
                        >
                        {bolum.bolum_adi}
                        </li>
                    ))}  
            </ul>
        )}

         {step === 2 && (
            <ul>
            {doktorlar.map((doktor) => (
                        <li
                        key={doktor.id}  
                        onClick={() => handleDoktor(doktor.id)}  
                        className={`p-2 m-2 rounded-lg ${
                            selectedDoktorId === doktor.id ? "bg-blue-500 text-white" : "bg-gray-200"
                        } hover:cursor-pointer`}
                        >
                        {doktor.doktor_unvani} {doktor.doktor_adi} {doktor.doktor_soyadi} 
                        </li>
                    ))}  
            </ul>
         )}


    </div>

  );
}
