export default function SelectedInfos({ selectedSube }) {

    return (
        <div className="p-4 bg-slate-300 -mt-2 rounded-xl outline outline-slate-200  -outline-offset-8">    
            {/* şeçimleri göster */}
            {selectedSube && (
                <div className="flex justify-start items-center">
                    <p>Şube:</p>
                    <p className="bg-slate-500 p-4 m-2 rounded-xl text-white">{selectedSube.sube_adi}</p>
                </div>
            )}
        </div>
    )
}