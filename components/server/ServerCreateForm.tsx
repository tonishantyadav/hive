'use client'

import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ServerCreatedFormData } from '@/schemas/server'
import { SetStateAction } from 'react'
import { UseFormReturn } from 'react-hook-form'

interface Props {
  fileUrl: string | null
  form: UseFormReturn<ServerCreatedFormData>
  setIsSubmit: (isSubmit: SetStateAction<boolean>) => void
}

export const ServerCreateForm = ({ fileUrl, form, setIsSubmit }: Props) => {
  const onSubmit = (data: ServerCreatedFormData) => {
    try {
      if (fileUrl && data) {
        console.log({ fileUrl, data })
      }
    } catch (error) {
      setIsSubmit(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2.5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Your server name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="mt-2">
            <Button
              className="w-full rounded-full bg-violet-700 hover:bg-violet-700/80"
              type="submit"
              onClick={() => setIsSubmit(true)}
            >
              Create
            </Button>
          </DialogFooter>
        </div>
      </form>
    </Form>
  )
}
