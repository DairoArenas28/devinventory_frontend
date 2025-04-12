
export const NavBar = () => {
    return(
        <div className="flex items-center justify-evenly p-5  text-black">
            <div className="">
                <p className="">Image</p>
            </div>
            <div className="flex items-center gap-8">
                <p className="">Inicio</p>
                <p>Categorías</p>
                <input className="rounded-full px-4 py-2 outline-none border" type="text" name="" id="" placeholder="Buscar...."/>
                <p>Carrito</p>
            </div>
            <div>
                <p>Iniciar Sesión <span className="rounded-md bg-emerald-500 text-white p-2">Registrarse</span></p>
            </div>
        </div>
    )
}