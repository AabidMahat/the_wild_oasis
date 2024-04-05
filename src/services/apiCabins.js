import { toast } from "react-toastify";
import supabase, { supabaseUrl } from "./supabase";
import "react-toastify/dist/ReactToastify.css";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    toast.error("Cabins could not be loaded");
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    toast.error("Cabins could not be deleted");
    throw new Error("Cabins could not be deleted");
  }
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // https://wwrjpeselhicsjvdtjyz.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2024-03-02T12%3A33%3A11.367Z
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  // * Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //* Edit
  console.log(id);
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    toast.error(error);
    // throw new Error("Cabins could not be created");
  }

  // @ upload image

  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. Delete ther cabin if there is error while uploading image
  if (storageError) {
    console.log(data);
    await supabase.from("cabins").delete().eq("id", data[0].id);
    toast.error("Cabin image could not be uploaded");
    throw new Error("Cabin is not created");
  }

  return data;
}
