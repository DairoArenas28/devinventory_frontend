import { useQuery } from "@tanstack/react-query"
import { getUser } from "../api/DevInventoryAPI"
import { Navigate } from "react-router-dom"
import AdminView from "../components/Admin.View"


export default function AppLayout() {
  const { data, isLoading, isError } = useQuery({
    queryFn: getUser,
    queryKey: ['user'],
    retry: 1,
    refetchOnWindowFocus: false
  })

  if(isLoading) return 'Cargando...'

  if(isError) {
    return <Navigate to={'/auth/login'}/>
  }

  if(data) return <AdminView />
}
