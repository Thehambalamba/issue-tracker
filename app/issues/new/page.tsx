"use client";

import { TextField, Button } from "@radix-ui/themes";
import React from "react";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import SimpleMDE from "react-simplemde-editor";

type IssueForm = {
  title: string;
  description: string;
};

function NewIssuePage() {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);

        router.push("/issues");
      })}
    >
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => {
          return <SimpleMDE placeholder="Description" {...field} ref={null} />;
        }}
      />
      <Button>Submit New Issue</Button>
    </form>
  );
}

export default NewIssuePage;
