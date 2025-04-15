

const HomeView = () => {

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Imagen del producto */}
            <div className="flex flex-1 items-center justify-end">
                <img
                    className="max-h-full scale-75"
                    src="https://img.freepik.com/foto-gratis/disparo-alto-angulo-pastelitos-queso-mermelada-frutas-frutas-placa-madera_181624-28381.jpg?t=st=1744499857~exp=1744503457~hmac=6e4ff4db57127f91e8ca50937d0ce1a296806a8116f82019bcf9f8ed421d609a&w=740"
                    alt="Mini cheesecake con frutas"
                />
            </div>

            {/* Presentación del negocio */}
            <div className="flex flex-1 items-center justify-center bg-red-600 text-white px-8">
                <div className="max-w-md text-center space-y-6">
                    <h1 className="text-4xl font-bold">Bienvenidos a <span className="italic">Dulce Encanto</span></h1>
                    <p className="text-lg">
                        Delicias artesanales hechas con amor 💕. Nuestra especialidad: mini cheesecakes, postres únicos y momentos inolvidables.
                    </p>
                    <p className="text-md">
                        📍 Envíos en Medellín y área metropolitana
                        <br />
                        📦 Listos para disfrutar en menos de 2 horas
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button className="bg-white text-red-600 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-gray-100 transition">
                            Ver productos
                        </button>
                        <button className="bg-red-800 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:bg-red-700 transition">
                            Contáctanos
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeView