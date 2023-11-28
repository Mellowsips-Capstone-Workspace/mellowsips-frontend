import useMediaQuery from "hooks/useMediaQuery"
import { nanoid } from "nanoid"
import { FC, memo } from "react"
import ReactPaginate from "react-paginate"


export class PaginationHelper {
    static calculateMaxPage(offset: number, total: number): number {
        if (offset <= 0 || total < 0) {
            return 0
        }

        return Math.max(Math.ceil(total / offset), 0)
    }
}

type PaginationProps = {
    page: number
    maxPage: number
    setPage: (page: number) => void
}

const Pagination: FC<PaginationProps> = ({ page, maxPage, setPage }) => {
    const currentPage = Math.max(page - 1, 0)
    const largeScreenMatch = useMediaQuery("(min-width: 640px)");

    const onPageChange = ({ selected = 1 }) => {
        const pageSelected = Math.max(selected + 1, 1)
        setPage(pageSelected)
    }

    return (
        <ReactPaginate
            key={nanoid()}
            forcePage={currentPage}
            onPageChange={onPageChange}
            containerClassName="flex text-sm space-x-4 w-fit"
            pageRangeDisplayed={0}
            marginPagesDisplayed={largeScreenMatch ? 3 : 1}
            pageCount={maxPage}
            renderOnZeroPageCount={null}
            nextLabel={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
            }
            previousLabel={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
            }
            nextLinkClassName="h-7 w-7 flex items-center justify-center rounded border hover:bg-main-primary hover:text-white transition-colors duration-300"
            previousLinkClassName="h-7 w-7 flex items-center justify-center rounded border hover:bg-main-primary hover:text-white transition-colors duration-300"
            pageClassName="w-fit h-fit rounded border hover:bg-main-primary hover:text-white transition-colors duration-300"
            pageLinkClassName="h-7 w-7 flex justify-center items-center"
            breakClassName=""
            activeClassName="border border-indigo-500 bg-indigo-500 text-white hover:bg-indigo-500 hover:text-white duration-300"
            breakLabel="..."
        />
    )
}

export default memo(Pagination)