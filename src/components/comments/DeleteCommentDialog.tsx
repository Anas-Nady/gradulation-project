import { CommentData } from "./../../lib/types";
import LoadingButton from "../LoadingButton";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useDeleteCommentMutation } from "./mutations";

interface DeleteCommentDialogProps {
  comment: CommentData;
  open: boolean;
  onClose: () => void;
}

export default function DeleteCommentDialog({
  comment,
  open,
  onClose,
}: DeleteCommentDialogProps) {
  const mutation = useDeleteCommentMutation();

  function handleOpenChange(open: boolean) {
    if (!open || !mutation.isPending) {
      onClose();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle dir="rtl" className="mx-4 text-right">
            حذف التعليق
          </DialogTitle>
          <DialogDescription dir="rtl" className="mx-4 text-right">
            هل أنت متأكد أنك تريد حذف هذا التعليق لا يمكن التراجع عن هذا
            الإجراء.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingButton
            variant="destructive"
            onClick={() => mutation.mutate(comment.id, { onSuccess: onClose })}
            loading={mutation.isPending}
            className="mx-3"
          >
            حذف
          </LoadingButton>
          <Button
            variant="outline"
            onClick={onClose}
            className="mx-3"
            disabled={mutation.isPending}
          >
            الغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
