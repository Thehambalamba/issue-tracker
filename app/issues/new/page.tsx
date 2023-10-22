"use client";

import { TextField, Button, Callout } from "@radix-ui/themes";
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
  const [error, setError] = React.useState("");

  return (
    <div className="max-w-xl">
      {error ? (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      ) : null}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An unexpected error occured.");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => {
            return (
              <SimpleMDE placeholder="Description" {...field} ref={null} />
            );
          }}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
}

export default NewIssuePage;
