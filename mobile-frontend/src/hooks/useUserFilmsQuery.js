import { useQuery } from '@tanstack/react-query'
import {fetchUserFilms } from "../service/fetchUserFilms"

export const useUserFilmsQuery = ({ username }) => {
    return useQuery({
        queryKey: ['userFilms'],
        queryFn: fetchUserFilms(username),
    });
};