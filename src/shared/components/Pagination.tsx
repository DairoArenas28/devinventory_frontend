import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { newPage } from "../../features/pagination/pageSlice";

interface PaginationProps {
    total: number;
}

export const Pagination: React.FC<PaginationProps> = ({ total}) => {
    const currentPage = useAppSelector(state => state.page.value)
    const currentLimit = useAppSelector(state => state.page.value)
    console.log(currentPage)
    console.log("Limit", currentLimit)
    console.log("Total ", total)
    const totalPages = Math.ceil(total / currentLimit);
    console.log("Paginas " , totalPages)
    const dispatch = useAppDispatch()

    const handleClick = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            dispatch(newPage(pageNumber))
        }
    };

    return (
        <div className="flex justify-center mt-4 space-x-2">
            <button
                className="px-3 py-1 border rounded disabled:opacity-50"
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Anterior
            </button>

            {[...Array(totalPages)].map((_, i) => (
                <button
                    key={i + 1}
                    className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-cyan-400 text-white' : ''}`}
                    onClick={() => handleClick(i + 1)}
                >
                    {i + 1}
                </button>
            ))}

            <button
                className="px-3 py-1 border rounded disabled:opacity-50"
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Siguiente
            </button>
        </div>
    );
};
