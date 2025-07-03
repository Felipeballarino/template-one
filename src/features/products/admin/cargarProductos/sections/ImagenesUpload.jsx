
const ImagenesUpload = () => {
    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className='font-bold text-2xl mb-2'>Fotos y Videos</h2>
            <div
                className='border-2 border-dashed border-blue-600 rounded w-full h-24 flex justify-center items-center  '>
                <label
                    htmlFor="fileInput"
                    className='cursor-pointer rounded flex flex-col items-center justify-center text-center w-full h-full bg-blue-50 '
                >
                    <div className='text-sm text-blue-600 font-medium '>
                        Haz clic aquí para subir archivos<br />
                        <span style={{ fontSize: "12px" }}>(Formatos permitidos: .png, .pdf, .jpg, .jpeg)</span>
                    </div>
                </label>
                <input
                    id="fileInput"
                    type="file"
                    name="documentosParaAdjuntar"
                    accept=".png,.pdf,.jpg,.jpeg"
                    style={{ display: "none" }}
                    onChange={(e) => console.log(e)}
                />
            </div>
        </div>
    )
}

export default ImagenesUpload
