import type {
  Cabin,
  CreateCabinFormData,
  UpdateCabinData,
} from "@/types/cabin";
import supabase from "./supabase.service";

const supabaseUrl = import.meta.env.VITE_API_URL;

export const cabinsService = {
  getAllCabins: async function (): Promise<Cabin[]> {
    const { data, error } = await supabase.from("cabins").select("*");
    if (error) {
      console.error(error);
      throw new Error("Cabins could not be loaded");
    }
    return data;
  },

  _createEditCabin: async function (
    formData: CreateCabinFormData,
    id?: number,
    existingImagePath?: string | null
  ): Promise<Cabin> {
    let imagePath = existingImagePath || null;
    let imageName: string | null = null;

    // Handle new image upload
    if (formData.image instanceof File) {
      imageName = `${Date.now()}-${formData.image.name.replaceAll("/", "")}`;
      imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    }

    // Prepare cabin data
    const cabinData = {
      ...formData,
      image: imagePath,
    };

    let query;
    if (id) {
      query = supabase
        .from("cabins")
        .update(cabinData)
        .eq("id", id)
        .select()
        .single();
    } else {
      query = supabase.from("cabins").insert([cabinData]).select().single();
    }

    const { data, error } = await query;
    if (error) {
      console.error(error);
      throw new Error(`Cabin could not be ${id ? "updated" : "created"}`);
    }

    // image provided ?
    if (imageName && formData.image instanceof File) {
      // upload it
      const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, formData.image);

      // ON CREATION && FAILED ? Rollback
      if (storageError && !id) {
        await supabase.from("cabins").delete().eq("id", data.id);
        console.error(storageError);
        throw new Error(
          `Cabin image could not be uploaded and the cabin was not created`
        );
      }

      // ON EDITING && SUCCESS ? try to delete old
      if (existingImagePath) {
        const oldImageName = existingImagePath.split("/cabin-images/")[1];
        if (oldImageName) {
          await supabase.storage.from("cabin-images").remove([oldImageName]);
        }
      }
    }

    return data;
  },

  createCabin: async function (formData: CreateCabinFormData): Promise<Cabin> {
    return this._createEditCabin(formData);
  },

  updateCabin: async function (
    formData: UpdateCabinData,
    id: number,
    hasImagePath: string | null
  ): Promise<Cabin> {
    return this._createEditCabin(
      formData as CreateCabinFormData,
      id,
      hasImagePath
    );
  },

  getCabinById: async function (id: number): Promise<Cabin> {
    const { data, error } = await supabase
      .from("cabins")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      throw new Error("Cabin could not be loaded");
    }
    return data;
  },

  deleteCabin: async function (
    id: number,
    hasImagePath?: string
  ): Promise<void> {
    const { error } = await supabase.from("cabins").delete().eq("id", id);
    if (error) {
      console.error(error);
      throw new Error("Cabin could not be deleted");
    }

    // Delete image from storage if exists
    if (hasImagePath) {
      const imagePath = hasImagePath.split("/cabin-images/")[1];
      if (imagePath) {
        const { error: storageError } = await supabase.storage
          .from("cabin-images")
          .remove([imagePath]);

        if (storageError) {
          console.error("Image could not be deleted:", storageError);
        }
      }
    }
  },

  duplicateCabin: async function (cabin: Cabin): Promise<Cabin> {
    let newImagePath: string | null = null;
    if (cabin.image) {
      const oldImageName = cabin.image.split("/cabin-images/")[1];
      if (oldImageName) {
        const timestamp = Date.now();
        const newImageName = `${timestamp}-copy-${oldImageName}`;
        const { error: copyError } = await supabase.storage
          .from("cabin-images")
          .copy(oldImageName, newImageName);

        if (copyError) {
          console.error("Failed to copy image:", copyError);
        } else {
          newImagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${newImageName}`;
        }
      }
    }

    const cabinData: Partial<Cabin> = {
      name: `Copy of ${cabin.name}`,
      description: cabin.description,
      capacity: cabin.capacity,
      price: cabin.price,
      discount: cabin.discount,
      image: newImagePath || cabin.image,
      created_at: cabin.created_at,
      updated_at: cabin.updated_at,
    } as const;

    const { data, error } = await supabase
      .from("cabins")
      .insert([cabinData])
      .select()
      .single();

    if (error) {
      console.error(error);
      throw new Error("Cabin could not be duplicated");
    }

    return data;
  },
};
