import type { Cabin } from "@/types/cabine";
import { Form } from "@/components/ui/form";
import { useForm, type Control, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCabinSchema } from "@/validations/cabin.validation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import OurFormField from "@/components/OurFormField";

interface props {
  cabinToEdit?: Cabin | undefined;
}

export default function CabinForm({ cabinToEdit }: props) {
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

  function submitHandler(data: unknown) {
    console.log("submited data is:", data);
  }

  const image = watch("image");
  console.log("image is:", image);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-8">
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
            {cabinToEdit ? "save changes" : "add new cabine"}
          </Button>
          <Button
            type="button"
            size={"lg"}
            onClick={() => {
              reset();
              const img = document.getElementById(
                "image"
              ) as HTMLInputElement | null;
              if (img) img.value = "";
            }}
            variant={"outline"}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
