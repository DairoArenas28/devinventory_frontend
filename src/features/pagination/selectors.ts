import { useAppSelector } from "../../app/hooks"



export const page = useAppSelector(state => state.page.value)
export const limit = useAppSelector(state => state.limit.value)