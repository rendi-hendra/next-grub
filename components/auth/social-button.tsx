import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import useStore from "@/store/store";

export const Alert = ({
  className,
  name,
  click,
}: {
  className?: string;
  name: string;
  click?: () => void;
}) => {
  return (
    <span className={className}>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>{name}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={click}
              className="bg-red-400 hover:bg-red-600 hover:text-white"
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </span>
  );
};

export const CreateGrubButton = ({ name }: { name: string }) => {
  const { data: session } = useSession();
  const { fetchGrub } = useStore();

  const createGrubSchema = z.object({
    name: z.string().min(4),
  });

  type CreateGrubSchema = z.infer<typeof createGrubSchema>;

  const form = useForm<CreateGrubSchema>({
    resolver: zodResolver(createGrubSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CreateGrubSchema) => {
    try {
      await api.post(
        "/grubs",
        {
          name: data.name,
        },
        {
          headers: { Authorization: session.user.token },
        }
      );

      toast.success("Grub created successfully", {
        position: "top-center",
        duration: 3000,
      });

      fetchGrub();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{name}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right">Name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} className="col-span-3" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export const JoinGrubButton = ({ name }: { name: string }) => {
  const { data: session } = useSession();
  const { fetchGrub } = useStore();

  const createGrubSchema = z.object({
    name: z.string().min(4),
  });

  type CreateGrubSchema = z.infer<typeof createGrubSchema>;

  const form = useForm<CreateGrubSchema>({
    resolver: zodResolver(createGrubSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CreateGrubSchema) => {
    try {
      await api.post(
        "/grubs",
        {
          name: data.name,
        },
        {
          headers: { Authorization: session.user.token },
        }
      );

      toast.success("Grub created successfully", {
        position: "top-center",
        duration: 3000,
      });

      fetchGrub();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{name}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right">Name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} className="col-span-3" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
