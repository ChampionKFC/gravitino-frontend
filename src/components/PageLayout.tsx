import React from 'react'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import RefreshButton from './refresh-button/refresh-button'
import { Button } from './ui/button'

interface PageLayoutProps {
    title?: string
    backButtonEnabled?: boolean
    actionButton?: React.ReactNode
    rightBlock?: React.ReactNode
    onRefreshClick?: () => void
    children?: React.ReactNode
}

export const PageLayout = ({
    title,
    backButtonEnabled = false,
    actionButton,
    rightBlock,
    onRefreshClick,
    children,
}: PageLayoutProps) => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col p-7 gap-20 w-full">
            <div className="flex justify-between items-start">
                <div className="flex items-center justify-start font-[700] font-pop text-[28px] gap-3">
                    {backButtonEnabled && (
                        <Button
                            className="text-foreground"
                            variant={'link'}
                            onClick={() => navigate(-1)}
                        >
                            <ChevronLeft />
                        </Button>
                    )}
                    <p>{title}</p>
                    {actionButton}
                    {typeof onRefreshClick !== 'undefined' && (
                        <RefreshButton onClick={onRefreshClick} />
                    )}
                </div>
                {rightBlock}
            </div>
            {children}
        </div>
    )
}
