"use client";

import { ticketSchema } from "@/app/validationSchemas/ticket";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type TicketFormData = z.infer<typeof ticketSchema>;

const TicketForm = () => {
  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });
  async function onSubmit(values: z.infer<typeof ticketSchema>) {
    console.log(values);
  }
  return (
    <div className="rounded-md border w-full p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticket Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Ticket Title..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
          </div>
          <Controller
            name="description"
            control={form.control}
            render={({ field }) => (
              <SimpleMDE placeholder="Decription" {...field} />
            )}
          />
          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Status..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="OPEN">Open</SelectItem>
                      <SelectItem value="STARTED">Started</SelectItem>
                      <SelectItem value="CLOSED">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Priority..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TicketForm;
