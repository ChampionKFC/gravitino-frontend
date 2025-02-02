import { Dispatch, ReactNode, SetStateAction } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import PlusButton from '../plus-button/plus-button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from '../ui/dialog'
import CloseRounded from '@/assets/icons/close_rounded.svg'
import { cn } from '@/lib/utils'

const dialogVariants = cva('', {
    variants: {
        size: {
            default: 'sm:max-w-[600px] px-8 pt-0 pb-8',
            md: 'sm:max-w-[1100px]',
        },
    },
    defaultVariants: {
        size: 'default',
    },
})

interface FormDialogProps extends VariantProps<typeof dialogVariants> {
    headerContent?: ReactNode
    actionButton?: ReactNode
    addItemForm: ReactNode
    open?: boolean
    setOpen?: Dispatch<SetStateAction<boolean>>
}

const FormDialog = ({
    headerContent,
    actionButton = <PlusButton onClick={() => {}} />,
    addItemForm,
    open,
    setOpen,
    size,
}: FormDialogProps) => (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{actionButton}</DialogTrigger>
        <DialogContent
            className={cn(dialogVariants({ size }))}
            onOpenAutoFocus={(e) => e.preventDefault}
            closeIcon={<CloseRounded />}
        >
            <DialogHeader>{headerContent}</DialogHeader>
            {addItemForm}
        </DialogContent>
    </Dialog>
)

FormDialog.displayName = 'FormDialog'

export default FormDialog
