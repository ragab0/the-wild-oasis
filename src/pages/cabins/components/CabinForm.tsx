import type {
  Cabin,
  CreateCabinFormData,
  UpdateCabinData,
} from "@/types/cabin";
import OurFormField from "@/components/OurFormField";
import { Form } from "@/components/ui/form";
import { useForm, type Control, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCabinSchema } from "@/validations/cabin.validation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCreateCabin, useUpdateCabin } from "@/hooks/useCabins";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

interface props {
  cabinToEdit?: Cabin | undefined;
  hideEditForm?: () => void;
}

export default function CabinForm({ cabinToEdit, hideEditForm }: props) {
  const { mutate: create, isPending: isPendingC } = useCreateCabin();
  const { mutate: update, isPending: isPendingU } = useUpdateCabin();
  const form = useForm({
    resolver: zodResolver(createCabinSchema),
    mode: "onChange",
    defaultValues: cabinToEdit
      ? { ...cabinToEdit, image: null }
      : {
          name: "",
          description: "",
          image: null,
          capacity: 1,
          discount: 0,
          price: 0,
        },
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    watch,
    trigger,
    reset,
  } = form;
  const price = watch("price");
  const discount = watch("discount");

  useEffect(() => {
    trigger(["price", "discount"]);
  }, [price, discount, trigger]);

  function resetHandler() {
    reset();
    const img = document.getElementById("image") as HTMLInputElement | null;
    if (img) img.value = "";
  }

  function submitHandler(data: CreateCabinFormData | UpdateCabinData) {
    if (cabinToEdit) {
      update(
        {
          id: cabinToEdit.id,
          data: data,
          hasImagePath: cabinToEdit.image,
        },
        { onSuccess: () => hideEditForm?.() }
      );
    } else {
      create(data, { onSuccess: () => resetHandler() });
    }
  }

  const image = watch("image");
  console.log("image is:", image);

  const isLoading = isPendingC || isPendingU;

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className={`space-y-8 ${
          isLoading ? "pointer-events-none opacity-60" : ""
        }`}
      >
        <OurFormField
          control={control as Control<Partial<Cabin>>}
          type="text"
          name="name"
          error={errors.name}
          label="cabin name"
        />
        <OurFormField
          control={control as Control<Partial<Cabin>>}
          type="number"
          name="capacity"
          error={errors.capacity as FieldError}
          label="maximum capacity"
        />
        <OurFormField
          control={control as Control<Partial<Cabin>>}
          type="number"
          name="price"
          error={errors.price as FieldError}
          label="regualr price"
        />
        <OurFormField
          control={control as Control<Partial<Cabin>>}
          type="number"
          name="discount"
          error={errors.discount as FieldError}
          label="cabin discount"
        />
        <OurFormField
          control={control as Control<Partial<Cabin>>}
          type="textarea"
          name="description"
          error={errors.description}
          label="the description of website"
        />
        <OurFormField
          control={control as Control<Partial<Cabin>>}
          type="file"
          name="image"
          error={errors.image}
          label="cabin photo"
        />

        {cabinToEdit?.image && (
          <div className="relative flex justify-center items-center gap-2 p-2">
            <img
              src={cabinToEdit.image}
              alt="Cabin"
              className="w-16 h-16 object-cover"
            />
            <Button type="button" variant="destructive" size="sm">
              Remove
            </Button>
          </div>
        )}

        <div className="mt-4 flex flex-row-reverse gap-2">
          <Button
            type="submit"
            size={"lg"}
            className="capitalize"
            disabled={!isDirty || !isValid}
          >
            {isLoading && <Spinner />}
            {cabinToEdit ? "save changes" : "add new cabine"}
          </Button>
          <Button
            type="button"
            size={"lg"}
            onClick={resetHandler}
            variant={"outline"}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
