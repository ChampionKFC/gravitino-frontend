import { format } from 'date-fns'
import { FILE_SIZE_UNITS } from '@/constants/constants.ts'

export const getJWTtokens = () => {
    const accessToken = getCookieValue('accessToken')
    const refreshToken = getCookieValue('refreshToken')

    return {
        accessToken,
        refreshToken,
    }
}

// для форматирования даты с бэкенда в привычный формат. 2024-01-11T10:36:59.321Z ---> 11.01.2024
export const formatDate = (date?: Date | null) => {
    if (!date) {
        return ''
    }
    const newDate = new Date(date)
    return format(newDate, 'dd.MM.yyyy')
}

export const formatInitials = (
    firstName: string,
    lastName: string,
    patronymic: string,
) => {
    const str = `${lastName} ${firstName} ${patronymic}`

    return str.split(/\s+/).map((w, i) => (i ? w.substring(0, 1).toUpperCase() + '.' : w)).join(' ')
}

export const formatFileSize = (sizeInBytes: number) => {
    let i = 0
    let formattedSize = sizeInBytes

    const byteUnits = Object.values(FILE_SIZE_UNITS)

    while (formattedSize > 1024 && i < 3) {
        formattedSize /= 1024
        i++
    }

    return `${formattedSize.toFixed(i !== 0 ? 2 : 0)} ${byteUnits[i]}`
}

export const getCookieValue = (key: string) => {
    const cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${key}=`))
        ?.split('=')[1]

    return cookieValue
}

export const removeCookieValue = (key: string) => {
    document.cookie = `${key}=; Max-Age=-1`
}
