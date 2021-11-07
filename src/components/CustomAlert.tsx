import React from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

interface CustomAlertProps {
  trigger: React.ReactNode | null
  title: string
  description: React.ReactNode
  action: React.ReactNode
}

export default function CustomAlert({
  trigger,
  title,
  description,
  action,
}: CustomAlertProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Overlay className="fixed bg-black bg-opacity-10 inset-0" />
      <AlertDialog.Content className="fixed w-11/12 p-4 bg-white top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 rounded-lg shadow-xl sm:w-9/12">
        <AlertDialog.Title className="text-lg">{title}</AlertDialog.Title>
        <AlertDialog.Description asChild className="my-2">
          {description}
        </AlertDialog.Description>
        <AlertDialog.Action asChild>{action}</AlertDialog.Action>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
