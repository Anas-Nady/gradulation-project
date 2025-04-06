import { PostData } from "./../../lib/types";
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
import { useDeletePostMutation } from "./mutations";

interface DeletePostDialogProps {
  post: PostData;
  open: boolean;
  onClose: () => void;
}

export default function DeletePostDialog({
  post,
  open,
  onClose,
}: DeletePostDialogProps) {
  const mutation = useDeletePostMutation();

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
            حذف المنشور
          </DialogTitle>
          <DialogDescription dir="rtl" className="mx-4 text-right">
            هل أنت متأكد أنك تريد حذف هذه المشاركة؟ لا يمكن التراجع عن هذا
            الإجراء.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingButton
            variant="destructive"
            onClick={() => mutation.mutate(post.id, { onSuccess: onClose })}
            loading={mutation.isPending}
            dir="rtl"
            className="mx-2"
          >
            حذف
          </LoadingButton>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={mutation.isPending}
            dir="rtl"
          >
            الغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
