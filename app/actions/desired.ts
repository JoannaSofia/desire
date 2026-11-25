'use server';

import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export async function createDesired(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('You must be logged in.');
  }

  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const tags = formData.getAll('tags') as string[];

  const { error } = await supabase
    .from('desiredList')
    .insert({
      user_id: user.id,
      title: title as string,
      category: category as string,
      tags: tags as string[],
    })


  if (error) {
    throw new Error(error.message);
  }
}