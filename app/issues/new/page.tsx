"use client";

import { TextField, Button, Callout, Text } from "@radix-ui/themes";
import React from "react";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import SimpleMDE from "react-simplemde-editor";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validation-schemas";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;

function NewIssuePage() {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
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
        {errors.title ? (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        ) : null}
        <Controller
          name="description"
          control={control}
          render={({ field }) => {
            return (
              <SimpleMDE placeholder="Description" {...field} ref={null} />
            );
          }}
        />
        {errors.description ? (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        ) : null}
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
}

export default NewIssuePage;
