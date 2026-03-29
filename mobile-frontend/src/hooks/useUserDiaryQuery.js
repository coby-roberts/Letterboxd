import { useQuery } from '@tanstack/react-query'
import {fetchUserDiary } from "../service/fetchUserDiary"

export const useUserDiaryQuery = ({username}) => {
    return useQuery({
        queryKey: ['diaryEntries'],
        queryFn: fetchUserDiary(username),
    });
}