interface PaginationProps {
    total: number;
    limit: number;
    page: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ total, limit, page, onPageChange }) => {
    const totalPages = Math.ceil(total / limit);

    const handleClick = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    return (
        <div className="flex justify-center mt-4 space-x-2">
            <button
                className="px-3 py-1 border rounded disabled:opacity-50"
                onClick={() => handleClick(page - 1)}
                disabled={page === 1}
            >
                Anterior
            </button>

            {[...Array(totalPages)].map((_, i) => (
                <button
                    key={i + 1}
                    className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-cyan-400 text-white' : ''}`}
                    onClick={() => handleClick(i + 1)}
                >
                    {i + 1}
                </button>
            ))}

            <button
                className="px-3 py-1 border rounded disabled:opacity-50"
                onClick={() => handleClick(page + 1)}
                disabled={page === totalPages}
            >
                Siguiente
            </button>
        </div>
    );
};
