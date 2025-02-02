import { Fragment, useCallback, useMemo, useState } from 'react'
import { MoreVertical } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { checkpointsFormTab } from './checkpoint-form-tab'
import CustomTabs from '@/components/custom-tabs/custom-tabs'
import FormDialog from '@/components/form-dialog/form-dialog'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useErrorToast } from '@/hooks/use-error-toast.tsx'
import { useSuccessToast } from '@/hooks/use-success-toast.tsx'
import { useDeleteCheckpointMutation } from '@/redux/api/checkpoints'
import { CheckpointInterface } from '@/types/interface/checkpoint'

export const ActionButtons = ({
    checkpoint,
}: {
    checkpoint: CheckpointInterface
}) => {
    const [deleteCheckpoint, { isError, isSuccess, isLoading }] =
        useDeleteCheckpointMutation()
    const { t } = useTranslation()
    const [formOpen, setFormOpen] = useState(false)

    const deleteSuccessMsg = useMemo(() => t('toast.success.description.delete.m', {
        entityType: t('checkpoint'),
        entityName: checkpoint.checkpoint_name,
    }), [])

    const handleCheckpointDelete = useCallback(() => {
        deleteCheckpoint(checkpoint.checkpoint_id)
    }, [checkpoint.checkpoint_id, deleteCheckpoint])

    useErrorToast(isError, handleCheckpointDelete)
    useSuccessToast(deleteSuccessMsg, isSuccess)

    return (
        <Fragment>
            <FormDialog
                open={formOpen}
                setOpen={setFormOpen}
                actionButton={<Fragment />}
                addItemForm={
                    <CustomTabs
                        tabs={checkpointsFormTab(checkpoint)}
                        setDialogOpen={setFormOpen}
                    />
                }
            />
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 text-[#8A9099]"
                    >
                        <span className="sr-only">{t('action.dropdown.menu.open')}</span>
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onClick={() => {
                            setFormOpen(true)
                        }}
                    >
                        {t('action.dropdown.edit')}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-[#FF6B6B]"
                        onClick={handleCheckpointDelete}
                        disabled={isLoading}
                    >
                        {t('action.dropdown.delete')}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </Fragment>
    )
}
